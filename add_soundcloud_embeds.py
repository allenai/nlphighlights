from typing import Dict
import json
import os
import subprocess

# NOTE: It's pretty easy to modify this code to get a list of urls from soundcloud:
# http://jsfiddle.net/iambnz/tehd02y6/.  I had that script get tracks from nlp-highlights and output
# titles and urls, which I then copied and pasted into a file.


def parse_urls_file(filename: str) -> Dict[int, str]:
    with open(filename) as urls_file:
        lines = urls_file.readlines()

    i = 0
    episode_num = None
    url = None
    urls = {}
    while i < len(lines):
        line = lines[i]
        if lines[i].startswith('Title:'):
            episode_num = int(line.split(' ')[1].replace('.', '').replace(':', ''))
        elif lines[i].startswith('URL'):
            url = line.strip().replace('URL: ', '')
        else:
            urls[episode_num] = url
            episode_num = None
            url = None
        i += 1
    return urls


def get_episode_filenames() -> Dict[int, str]:
    filenames = {}
    for filename in os.listdir('episodes/'):
        if '.swp' in filename: continue
        episode_num = int(filename[:3])
        filenames[episode_num] = 'episodes/' + filename
    return filenames

def get_soundcloud_embed(url: str) -> str:
    command = f"curl 'https://soundcloud.com/oembed' -d 'format=json' -d 'url={url}' -d 'show_comments=false'"
    result = subprocess.run(command, shell=True, capture_output=True)
    iframe_html = json.loads(result.stdout)['html']
    return iframe_html.replace('height="400"', 'height="166"').replace('visual=true', '')


def add_soundcloud_embed_to_file(url: str, filename: str) -> None:
    with open(filename) as episode_file:
        lines = episode_file.readlines()

    for i, line in enumerate(lines):
        if 'soundcloud.com/player' in line:
            # This file already has a soundcloud embed
            return
        if line.startswith('<turn'):
            first_turn = i
            break

    embed_line = get_soundcloud_embed(url) + '\n\n'

    lines = lines[:i] + [embed_line] + lines[i:]

    with open(filename, 'w') as episode_file:
        for line in lines:
            episode_file.write(line)


def add_all_embeds(urls_filename: str) -> None:
    urls = parse_urls_file(urls_filename)
    episodes = get_episode_filenames()
    for episode_num, episode_filename in episodes.items():
        url = urls[episode_num]
        add_soundcloud_embed_to_file(url, episode_filename)


if __name__ == '__main__':
    add_all_embeds('urls.txt')
