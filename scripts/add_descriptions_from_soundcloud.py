from typing import Dict
import os

# NOTE: It's pretty easy to modify this code to get a list of descriptions from soundcloud:
# http://jsfiddle.net/iambnz/tehd02y6/.  I had that script get tracks from nlp-highlights and output
# titles and descriptions, which I then copied and pasted into a file.


def parse_descriptions_file(filename: str) -> Dict[int, str]:
    with open(filename) as descriptions_file:
        lines = descriptions_file.readlines()

    i = 0
    episode_num = None
    description = None
    descriptions = {}
    while i < len(lines):
        line = lines[i]
        if lines[i].startswith('Title:'):
            episode_num = int(line.split(' ')[1].replace('.', '').replace(':', ''))
        elif lines[i].startswith('Description'):
            description = line.strip().replace('Description: ', '').replace('"', '\\"')
        else:
            descriptions[episode_num] = description
            episode_num = None
            description = None
        i += 1
    return descriptions


def get_episode_filenames() -> Dict[int, str]:
    filenames = {}
    for filename in os.listdir('episodes/'):
        if '.swp' in filename: continue
        episode_num = int(filename[:3])
        filenames[episode_num] = 'episodes/' + filename
    return filenames


def replace_description(description: str, filename: str) -> None:
    with open(filename) as episode_file:
        lines = episode_file.readlines()

    for i, line in enumerate(lines):
        if line.startswith('description: '):
            lines[i] = f'description: "{description}"\n'
            break

    with open(filename, 'w') as episode_file:
        for line in lines:
            episode_file.write(line)


def replace_all_descriptions(descriptions_filename: str) -> None:
    descriptions = parse_descriptions_file(descriptions_filename)
    episodes = get_episode_filenames()
    for episode_num, episode_filename in episodes.items():
        description = descriptions[episode_num]
        replace_description(description, episode_filename)


if __name__ == '__main__':
    replace_all_descriptions('descriptions.txt')
