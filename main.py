# this script checks if it is the main module being executed. If so, it calls the 'serve' function from the 'app' module.
# the 'serve' function starts the web application, allowing it to handle incoming requests.
import app
import sys

def parse_args():
    args = {}
    i = 1
    while i < len(sys.argv):
        arg = sys.argv[i]
        if arg.lower() == "--port":
            i += 1
            args["port"] = sys.argv[i]
        i += 1
    return args


if __name__ == "__main__":
    app.serve(**parse_args()) # serves the app