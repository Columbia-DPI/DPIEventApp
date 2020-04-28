from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash, Response, jsonify

myapp = Flask(__name__)

import logging
logging.basicConfig(level=logging.DEBUG)
myapp.config['TEMPLATES_AUTO_RELOAD'] = True

# Begin page-serve routes
@myapp.route("/")
@myapp.route("/login")
@myapp.route("/allevents")
def index():
    return "Hello World!"
    # return render_template("index.html", token="dumbedeedoo")

myapp.run(debug=True, use_reloader=False)
