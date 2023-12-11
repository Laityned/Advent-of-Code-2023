import sys


def main(filename: str):
    sum: int = 0

    with open(input_file) as f:
        for line in f:
            numbers: list[str] = []

            for char in line:
                if char.isdigit():
                    numbers.append(char)

            sum += int(numbers[0] + numbers[-1])

    print(sum)


def get_textfile_name() -> str:
    if len(sys.argv) > 1:
        return str(sys.argv[1])
    else:
        return "test.txt"


if __name__ == "__main__":
    input_file = get_textfile_name()

    main(input_file)
