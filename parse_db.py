import sys
import json


def main(path):
    with open(path, "r") as f:
        data = json.load(f)
    print(data)


if __name__ == "__main__":
    main(sys.argv[1])
