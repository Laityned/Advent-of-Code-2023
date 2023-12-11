import re
import sys


def main(filename: str):
    pattern = re.compile(
        r"(?=(one|two|three|four|five|six|seven|eight|nine))", re.IGNORECASE
    )
    word_to_number = {
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9",
    }

    sum: int = 0

    with open(input_file) as f:
        for line in f:
            numbers: list[tuple(int, str)] = []

            for location, char in enumerate(line):
                if char.isdigit():
                    numbers.append((location, char))

            for match_word in re.finditer(pattern, line):
                word_reg = match_word.regs[1]
                word = line[word_reg[0] : word_reg[1]]
                numbers.append((word_reg[0], word_to_number[word]))

            numbers.sort(key=lambda x: x[0])

            sum += int(numbers[0][1] + numbers[-1][1])

    print(sum)


def get_textfile_name() -> str:
    if len(sys.argv) > 1:
        return str(sys.argv[1])
    else:
        return "test.txt"


if __name__ == "__main__":
    input_file = get_textfile_name()

    main(input_file)
