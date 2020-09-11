from typing import List, Tuple
import io
import pickle
import os
import textwrap

from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import docx


# If modifying these scopes, delete the file token.pickle.
SCOPES = ["https://www.googleapis.com/auth/drive"]


def download_transcripts(transcript_dir):
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists("token.pickle"):
        with open("token.pickle", "rb") as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open("token.pickle", "wb") as token:
            pickle.dump(creds, token)

    service = build("drive", "v3", credentials=creds)

    # Call the Drive v3 API
    results = (
        service.files()
        .list(
            q="mimeType='application/vnd.google-apps.folder' and name contains 'nlphighlights podcast'",
            pageSize=10,
            fields="nextPageToken, files(id, name)",
        )
        .execute()
    )
    items = results.get("files", [])
    nlp_highlights_folder = items[0]
    print(nlp_highlights_folder)
    folder_id = nlp_highlights_folder["id"]

    results = (
        service.files()
        .list(
            q=f"mimeType='application/vnd.google-apps.folder' and '{folder_id}' in parents",
            fields="files(id, name, parents)",
            pageSize=1000,
        )
        .execute()
    )

    items = results.get("files", [])
    for item in items:
        if item["name"][0].isdigit():
            download_episode_transcript(service, item["id"], item["name"])


def download_episode_transcript(service, episode_folder_id, episode_folder_name):
    print(f"Files for episode {episode_folder_name}")
    episode_dir = f"tmp/{episode_folder_name}/"
    os.makedirs(episode_dir, exist_ok=True)
    results = (
        service.files()
        .list(
            q=f"'{episode_folder_id}' in parents",
            fields="files(id, name, parents)",
            pageSize=100,
        )
        .execute()
    )
    items = results.get("files", [])
    for item in items:
        if 'docx' in item["name"]:
            print("Downloading transcript")
            try:
                download_file(service, item["id"], episode_dir + "transcript.docx")
                print("Downloaded file")
            except:
                print("Error downloading file")


def download_file(service, file_id, file_path):
    request = service.files().get_media(fileId=file_id)
    file_bytes = io.BytesIO()
    downloader = MediaIoBaseDownload(file_bytes, request)
    done = False
    while done is False:
        status, done = downloader.next_chunk()
        print("Download %d%%." % int(status.progress() * 100))
    with open(file_path, "wb") as f:
        f.write(file_bytes.getbuffer())


def extract_transcripts(transcript_dir: str):
    for episode_dir in os.listdir(transcript_dir):
        print(f"Processing transcript for {episode_dir}")
        episode_filename = transcript_dir + "/" + episode_dir + "/transcript.docx"
        if not os.path.exists(episode_filename):
            print("Transcript not found")
            continue
        episode_doc = docx.Document(episode_filename)
        lines = []
        for paragraph in episode_doc.paragraphs:
            lines.append(paragraph.text)
        text = '\n'.join(lines)
        with open(transcript_dir + "/" + episode_dir + "/transcript.txt", "w") as outfile:
            outfile.write(text)


def convert_transcripts_to_markdown(transcript_dir: str):
    for episode_dir in os.listdir(transcript_dir):
        print(f"Converting transcript for {episode_dir}")
        episode_filename = transcript_dir + "/" + episode_dir + "/transcript.txt"
        if not os.path.exists(episode_filename):
            print("Transcript not found")
            continue

        convert_episode_to_markdown(episode_dir, episode_filename)


def convert_episode_to_markdown(episode_name, transcript_filename):
    episode_number, episode_name = split_episode_name(episode_name)
    episode_filename = episode_number + "_" + sanitize(episode_name) + ".md"

    with open(transcript_filename) as transcript_file:
        transcript_lines = transcript_file.readlines()

    turns = parse_transcript_lines(transcript_lines)
    speakers = set(t[0] for t in turns)

    hosts = []
    guests = []
    for speaker in speakers:
        if "Gardner" in speaker or "Pradeep" in speaker or "Waleed" in speaker:
            hosts.append(f'"{speaker}"')
        else:
            guests.append(f'"{speaker}"')

    with open("episodes/" + episode_filename, "w") as episode_file:
        episode_file.write("---\n")
        episode_file.write(f'title: "{episode_name}"\n')
        episode_file.write(f'hosts: [{",".join(hosts)}]\n')
        episode_file.write(f'guests: [{",".join(guests)}]\n')
        episode_file.write(f'number: {episode_number}\n')
        episode_file.write('tags: []\n')
        episode_file.write('description: TODO\n')
        episode_file.write('type: episode\n')
        episode_file.write("---")
        for speaker, timestamp, text in turns:
            episode_file.write(f'\n\n<Turn speaker="{speaker}" timestamp="{timestamp}">\n\n')
            episode_file.write(textwrap.fill(text, 100))
            episode_file.write('\n\n</Turn>\n')


def parse_transcript_lines(transcript_lines: List[str]) -> List[Tuple[str, str, str]]:
    if '\t' in transcript_lines[0]:
        return parse_tabbed_transcript(transcript_lines)
    else:
        return parse_two_line_transcript(transcript_lines)


def parse_tabbed_transcript(transcript_lines: List[str]) -> List[Tuple[str, str, str]]:
    turns = []
    for line in transcript_lines:
        parts = line.strip().split('\t')
        if len(parts) == 2:
            speaker, text = parts
            timestamp = None
        elif len(parts) == 3:
            speaker, timestamp, text = parts
        else:
            raise ValueError(f"unexpected line: {line}")
        if timestamp and timestamp[0] == "(":
            timestamp = timestamp[1:-1]
        if speaker.endswith(":"):
            speaker = speaker[:-1]
        turns.append((speaker, timestamp, text))
    return turns


def parse_two_line_transcript(transcript_lines: List[str]) -> List[Tuple[str, str, str]]:
    turns = []
    i = 0
    while i < len(transcript_lines):
        if '(' in transcript_lines[i]:
            speaker, timestamp = transcript_lines[i].strip().split(' (')
            timestamp = timestamp[:-2]
        else:
            speaker = line.strip()
            timestamp = None
        if speaker.endswith(":"):
            speaker = speaker[:-1]
        i += 1
        text = transcript_lines[i].strip()
        i += 1
        turns.append((speaker, timestamp, text))
    return turns


def split_episode_name(episode_name: str) -> Tuple[str, str]:
    if not episode_name[2].isdigit():
        # Episodes under 100 only have one leading zero in google drive, but we need two for the
        # podcast website.
        episode_name = "0" + episode_name

    if episode_name[3] == ".":
        return episode_name.split(". ", 1)
    elif episode_name[3:6] == " - ":
        return episode_name.split(" - ", 1)
    else:
        raise ValueError(f"unhandled episode name / number combo: {episode_name}")


def sanitize(filename: str) -> str:
    return filename.replace(" ", "_").replace(",", "").replace(":", "").lower()


if __name__ == "__main__":
    transcript_dir = "tmp/"
    # download_transcripts(transcript_dir)
    # extract_transcripts(transcript_dir)
    convert_transcripts_to_markdown(transcript_dir)
