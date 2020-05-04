from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash, Response, jsonify
"""
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from oauthlib.oauth2 import WebApplicationClient
from user import User
from dotenv import load_dotenv
"""
import requests
import os
import sys
import logging
from db import Db
#load_dotenv()

# database connection
sess_db = Db.init_db()


flask_backend = Flask(__name__)

import logging
logging.basicConfig(level=logging.DEBUG)
flask_backend.config['TEMPLATES_AUTO_RELOAD'] = True

@flask_backend.route("/api/getAllEvents", methods=['POST'])
def coalitionSearch():
    data = request.get_json(force=True)
    zipcode = data['placeholder']

    #return jsonify({'Item 1':'chicken', 'Item 2':'steak', 'Item 3':'wegetarian for Raghav'})

    results = sess_db.select_event(None)
    print(results)
    return {"response": list(map(lambda x:x.serialize(), results))}


# Begin page-serve routes
@flask_backend.route("/")
@flask_backend.route("/login")
@flask_backend.route("/allevents")
def index():
    #return "Hello World!"
    return render_template("index.html", token="dumbedeedoo")
flask_backend.run(debug=True, use_reloader=False)
