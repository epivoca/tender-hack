
class NameAutoCompleter:
    def __init__(self, path_to_dataset: str):
        self.sorted_words = self.read_lines_from_file(path_to_dataset)

    async def get_candidates_from_t9(self, last_user_word: str):
        suggestions = await self.suggest_words(last_user_word)

        top_k_candidates = []
        for i, word in enumerate(suggestions, start=1):
            top_k_candidates.append(word)

        if len(top_k_candidates) == 0:
            return None

        return top_k_candidates

    async def suggest_words(self, prefix, top_k=3):
        suggestions = []

        for word in self.sorted_words:
            if word.startswith(prefix):
                suggestions.append(word)
            if len(suggestions) >= top_k:
                break

        return suggestions

    @staticmethod
    def read_lines_from_file(file_path: str):
        lines = []
        with open(file_path, 'r', encoding='utf-8') as file:
            lines = file.readlines()

        return [line.strip() for line in lines]
