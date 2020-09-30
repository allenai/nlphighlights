import sys

from scrape_episodes_from_drive import extract_transcript, convert_episode_to_markdown
from add_soundcloud_embeds import parse_urls_file, add_soundcloud_embed_to_file
from add_descriptions_from_soundcloud import parse_descriptions_file, replace_description


def add_one_episode(transcript_filename: str, url: str, description: str):
    episode_name = transcript_filename.split('/')[-1].replace('.docx', '')
    txt_filename = extract_transcript(transcript_filename)
    md_filename = convert_episode_to_markdown(episode_name, txt_filename)
    add_soundcloud_embed_to_file(url, md_filename)
    replace_description(description, md_filename)


if __name__ == '__main__':
    transcript_filename = sys.argv[1]
    episode_number = int(transcript_filename.split('/')[-1].split(' ')[0].replace('.', ''))
    urls = parse_urls_file("urls.txt")
    if episode_number not in urls:
        print(f"Did not find episode {episode_numbr} in urls.txt.")
        sys.exit(1)
    descriptions = parse_descriptions_file("descriptions.txt")
    if episode_number not in descriptions:
        print(f"Did not find episode {episode_numbr} in descriptions.txt.")
        sys.exit(1)

    add_one_episode(transcript_filename, urls[episode_number], descriptions[episode_number])
