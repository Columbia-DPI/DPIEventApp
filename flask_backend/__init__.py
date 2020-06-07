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
    # zipcode = data['placeholder']
    
    #return jsonify({'Item 1':'chicken', 'Item 2':'steak', 'Item 3':'wegetarian for Raghav'})

    results = sess_db.select_event(None)

    final_res = []

    for res in results:
    	res_dict = {}
    	res_dict["eid"] = res[0][0]
    	res_dict["title"] = res[0][1]
    	res_dict["location"] = res[0][2]
    	res_dict["timestamp"] = res[0][3]
    	res_dict["description"] = res[0][4]
    	res_dict["link"] = res[0][5]
    	res_dict["organizer"] = res[0][6]

    	final_res.append(res_dict)

    print(results)
    print(final_res)
    #return jsonify(res_dict)
    return{"response": final_res}
    #return {"response": list(map(lambda x:x.serialize(), res_dict))}


@flask_backend.route("/api/storeUserData", methods=['POST'])
def store_data():
    data = request.get_json(force=True)
    #put data into database here
    print(data)
    return data

@flask_backend.route("/api/getUserBio/<int:uid>", methods=['POST'])
def get_bio(uid):
    # TO DO
    data = request.get_json(force=True)
    result = sess_db.get_user_bio(uid)
    # parse as dictionary
    final_result = []
    

    return{"response": final_result}





# Begin page-serve routes
@flask_backend.route("/")
@flask_backend.route("/login")
@flask_backend.route("/allevents")
@flask_backend.route("/home")
@flask_backend.route("/profile")
@flask_backend.route("/<path:path>")



def index():
    #return "Hello World!"
    
    return render_template("index.html", token="dumbedeedoo")
flask_backend.run(debug=True, use_reloader=False)
