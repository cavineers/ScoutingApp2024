import data_manage
from datetime import datetime, timezone
from flask import Flask, redirect, render_template, Response, request, send_file, url_for
import json
import os
import waitress #production quality WSGI server to host the flask app with. more: https://docs.pylonsproject.org/projects/waitress/en/stable/index.html
import traceback

DIR = os.path.dirname(__file__)
NAMES_FILE = os.path.join(DIR, "names.txt")

app = Flask("routes")
app.url_map.strict_slashes = False

#event handlers
@app.before_request
def before_request():
    print(f"[{datetime.now(timezone.utc).strftime('%m/%d/%y - %H:%M:%S.%f')}] Got request {request.method} from {request.remote_addr}: {request.url}")

@app.after_request
def after_request(response:Response):
    print(f"[{datetime.now(timezone.utc).strftime('%m/%d/%y - %H:%M:%S.%f')}] Got response {request.method} ({response.status}) from {request.remote_addr}: {request.url}")
    return response

#define routes
#for info on decorators, see https://realpython.com/primer-on-python-decorators/, or look up "python decorators"
@app.get("/")
def to_first_page():
    return redirect(url_for("home"))

#scouting routes
@app.route("/home.html")
def home():
    with open(NAMES_FILE) as f:
        return render_template("home.html", names=sorted([name.strip() for name in f.readlines()], key=lambda name: name.rsplit(" ",1)[-1]))

@app.route("/scout.html")
def scout():
    return render_template("scout.html")

@app.route("/prematch.html")
def auto():
    return render_template("prematch.html")

@app.route("/stage.html")
def stage():
    return render_template("stage.html")

@app.route("/result.html")
def result():
    return render_template("result.html")

@app.route("/names")
def names():
    with open(NAMES_FILE) as f:
        return json.dumps([name.strip() for name in f.readlines()])

#api routes
UPLOAD_DATA_KEY = "data"
@app.post("/upload")
def upload():
    try:
        if UPLOAD_DATA_KEY in request.form:
            data = json.loads(json.loads(request.form[UPLOAD_DATA_KEY]))
        else:
            return f"You must upload a JSON data under key '{UPLOAD_DATA_KEY}'.", 400
    except Exception as e:
        traceback.print_exception(e)
        return "Got error while reading uploaded data.", 500
    try:
        data_manage.handle_upload(data)
    except Exception as e:
        traceback.print_exception(e)
        return "Got error while storing uploaded data.", 500
    else:
        print(request.remote_addr, "uploaded data:", repr(data))
        return "Committed uploaded data.", 200


#functions

def serve(host:str="0.0.0.0", port:int=80):
    "Serve the webapp."
    print("Serving", host, f"on port {port}.")
    waitress.serve(app, host=host, port=int(port), threads=48)
