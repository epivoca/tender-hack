import re
from collections import defaultdict, Counter
import random


class ProductNameNgram:
    def __init__(self, tokens_path: str):
        f = open(tokens_path, 'r')
        tokens = ''.join(f.readlines()[0]).split()
        f.close()
        self.model = self.train_variable_ngrams(tokens)

    def interactive_text_generation(self, input_sequence: str):
        start_sequence = tuple(input_sequence.split())
        generated_text = self.generate_text(start_sequence, 2)  # 2 - кол-во слов на выходе
        return generated_text

    @staticmethod
    def train_variable_ngrams(tokens, n=5):
        model = defaultdict(Counter)
        for i in range(1, n + 1):
            for j in range(len(tokens) - i):
                prefix = tuple(tokens[j:j + i])
                target = tokens[j + i]
                model[prefix][target] += 1
        return model

    def generate_text(self, start_sequence, length=50):
        if len(start_sequence) == 0 or len(start_sequence) > 5:
            raise ValueError("Длина начальной последовательности должна быть от 1 до 5 слов.")

        current_sequence = tuple(start_sequence)
        text = list(current_sequence)

        for _ in range(length - len(start_sequence)):
            possible_next_words = self.model.get(current_sequence)
            if not possible_next_words:
                break
            next_word = random.choices(
                population=list(possible_next_words.keys()),
                weights=list(possible_next_words.values()),
                k=1
            )[0]
            text.append(next_word)
            if len(text) >= 5:
                current_sequence = tuple(text[-5:])
            else:
                current_sequence = tuple(text)
        return [' '.join(text)]
