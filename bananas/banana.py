import sys
import time
import pygame

def play_music(file_path):
    pygame.mixer.init()
    pygame.mixer.music.load(file_path)
    pygame.mixer.music.play()

def print_lyrics_with_timing(file_name, immediate_word):
    with open(file_name, "r") as file:
        lines = file.readlines()
    for line in lines:
        words = line.split()
        for word in words:
            if word.lower() == immediate_word.lower():
                print(word, end=' ', flush=True)
            else:
                for character in word:
                    print(character, end='', flush=True)
                    if character in ['.', '?']:
                        time.sleep(1.75)
                    elif character == ',':
                        time.sleep(0.4)
                    elif character == '-':
                        time.sleep(0.8)
                    elif character == '`':
                        time.sleep(0.2)
                    else:
                        time.sleep(0.04)
                print(' ', end='')
        print()

def ascii_art(file_name):
    with open(file_name, 'r') as file:
        for line in file.readlines():
            print(line, end='')
            time.sleep(0.2)

def main():
    play_music("bananas/BananaMan.mp3")  #plays the music
    print_lyrics_with_timing('bananas/lyricalmasterpiece.txt', "test")  #prints lyrics with "synchronized" timing
    ascii_art('bananas/art.txt')  #displays ASCII art

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1].lower() == "bananaman":
        main()

# run using `python bananas/banana.py bananaman`