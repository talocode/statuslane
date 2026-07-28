import argparse
import json
from .client import StatusLaneClient
def main():
    parser = argparse.ArgumentParser(prog="statuslane")
    parser.add_argument("command", choices=["health", "pricing", "capabilities", "monitors"])
    args = parser.parse_args()
    client = StatusLaneClient()
    print(json.dumps(getattr(client, "list_monitors" if args.command == "monitors" else args.command)(), indent=2))
if __name__ == "__main__": main()
