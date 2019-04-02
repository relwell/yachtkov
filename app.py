"""Flask server."""


import os
from flask import Flask, send_from_directory
from flask_cors import CORS
from yachtkov import get_models

app = Flask(__name__, static_folder="react_app/build")
CORS(app)

(song_model, _) = get_models()


@app.route("/generate")
def generate():
    """Serve up a song."""
    return song_model.make_sentence(tries=500, max_overlap_ratio=0.80)


# Serve React App
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    """Serve react site."""
    if path != "" and os.path.exists("react_app/build/" + path):
        return send_from_directory("react_app/build", path)
    else:
        return send_from_directory("react_app/build", "index.html")
