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

    final_res = []

    for res in results:
    	res_dict = {}
    	res_dict["some_number"] = res[0][0]
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


# Begin page-serve routes
@flask_backend.route("/")
@flask_backend.route("/login")
@flask_backend.route("/home")
@flask_backend.route("/profile")
@flask_backend.route("/<path:path>")
def index():
    #return "Hello World!"

    # TEST select_event, get_event and eid_by_likes
    # test1
    print("test1:")
    tev1 = ["party", "social", "free food", "online","stupid"]
    res = sess_db.select_event(tev1)
    for r in res:
        print(r)
    # test 3
    print("test3:")
    res = sess_db.select_event(["stupid"])
    for r in res:
        print(r)

    # test 5
    print("test5:")
    res = sess_db.select_event([])
    for r in res:
        print(r)
    
    return render_template("index.html", token="dumbedeedoo")
flask_backend.run(debug=True, use_reloader=False)
