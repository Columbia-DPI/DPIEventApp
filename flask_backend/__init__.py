from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash, Response, jsonify

flask_backend = Flask(__name__)

import logging
logging.basicConfig(level=logging.DEBUG)
flask_backend.config['TEMPLATES_AUTO_RELOAD'] = True

# Begin page-serve routes
@flask_backend.route("/")
@flask_backend.route("/login")
@flask_backend.route("/allevents")
def index():
    #return "Hello World!"
    return render_template("index.html", token="dumbedeedoo")
flask_backend.run(debug=True, use_reloader=False)
