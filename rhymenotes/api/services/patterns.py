import re
import json
from typing import Callable

with open('api/services/accents.json', 'r', encoding='utf-8') as file:
    accents = json.load(file)


def tokenizer(text: str):
    cleaned = re.sub(r'[.,:;!?`\^]', '', text.lower())
    cleaned_dash = re.sub(r'-', ' ', cleaned)
    replace_n = re.sub(r'\n', ' $ ', cleaned_dash)
    return replace_n.split()

def apply_accents(text: str, accents: dict, tokenizer: Callable) -> str:
    words = tokenizer(text)
    accented_words = []
    for word in words:
        word = re.sub(r'ё', 'Ё', word)
        accented_word = accents.get(word, word)
        accented_words.append(accented_word)
    
    return ' '.join(accented_words)

def replaceVowels(text):
    accent_symbol = '▓'
    nonaccent_symbol = '░'
    vowels = 'ёуеэоаыяию'
    only_vowels = re.sub(rf'[^{vowels}{vowels.upper()}$]', '', text)
    change_accents = re.sub(rf'[{vowels.upper()}]', accent_symbol, only_vowels)
    change_nonaccents = re.sub(rf'[{vowels}]', nonaccent_symbol, change_accents).replace('$', '\n')
    
    return change_nonaccents
    

def getRythmicalPattern(text):
    accented_text = apply_accents(text, accents, tokenizer)
    pattern = replaceVowels(accented_text)
    return pattern
    
