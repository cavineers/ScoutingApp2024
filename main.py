# this script checks if it is the main module being executed. If so, it calls the 'serve' function from the 'app' module.
# the 'serve' function starts the web application, allowing it to handle incoming requests.
import app

if __name__ == "__main__":
    app.serve() # serves the app