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
        res_dict["organizer"] = res[0][4]
        res_dict["description"] = res[0][5]
        res_dict["link"] = res[0][6]
        res_dict["tags"] = [pair[1] for pair in sess_db.get_event_tags(res_dict["eid"])]

        final_res.append(res_dict)

    #return jsonify(res_dict)
    return{"response": final_res}
    #return {"response": list(map(lambda x:x.serialize(), res_dict))}


@flask_backend.route("/api/storeUserData", methods=['POST'])
def store_data():
    data = request.get_json(force=True)
    interests = data.pop('interests', None)

    #put data into database here
    uid = sess_db.insert_user(data)
    sess_db.interest_tag(uid, interests)

    return data

@flask_backend.route("/api/getInterestTags", methods=['POST'])
def get_interests():
    tags = {}
    tag_list = sess_db.tags_by_freq()
    for tag in tag_list:
        tags[tag[1]] = tag[0]

    #tags["all"] = tuple(sess_db.tags_by_freq())
    return tags

@flask_backend.route("/api/getUserBio/<int:uid>", methods=['POST'])
def get_bio(uid):
    # TO DO
    data = request.get_json(force=True)
    result = sess_db.get_user_bio(uid)
    # parse as dictionary
    final_result = []


    return{"response": final_result}

@flask_backend.route("/api/searchEvents", methods=['GET','POST'])
def search_events():
    data = request.get_json(force=True)
    tags = data.pop('tags', None)
    results = sess_db.select_event(tags)
    final_res = []

    for res in results:
        res_dict = {}
        res_dict["eid"] = res[0][0]
        res_dict["title"] = res[0][1]
        res_dict["location"] = res[0][2]
        res_dict["timestamp"] = res[0][3]
        res_dict["organizer"] = res[0][4]
        res_dict["description"] = res[0][5]
        res_dict["link"] = res[0][6]
        res_dict["tags"] = [pair[1] for pair in sess_db.get_event_tags(res_dict["eid"])]

        final_res.append(res_dict)

    #return jsonify(res_dict)
    return{"response": final_res}

@flask_backend.route("/api/postEventInterest", methods=['POST'])
def mark_event_as_interested():
    data = request.get_json(force=True)
    uid = sess_db.get_uid(data.pop('email', 'null'))
    eid = data.pop('eid', 'null')
    if data.pop('interested', False):
        ret = sess_db.like_event(uid, eid)
    else:
        ret = sess_db.unlike_event(uid, eid)

    if not ret:
        return {"status": "failure"}

    return {"status": "success"}

@flask_backend.route("/api/checkUserInDB/<string:email>", methods=["GET"])
def check_user_in_db(email):
    ret = sess_db.get_uid(email)
    return {"userInDB": ret and ret != -1}

@flask_backend.route("/api/doILike", methods=["GET", "POST"])
def doILike():
    data = request.get_json(force=True)
    uid = sess_db.get_uid(data.pop('email', 'null'))
    ret = sess_db.do_i_like(uid, data.pop('eid', 'null'))
    if ret == None:
        return {}
    return {"doILike": ret}

@flask_backend.route("/api/insertEvent", methods=["GET", "POST"])
def insert_event():
    data = request.get_json(force=True)
    tags = data.pop('tags', None)

    # if no such user, return failure
    organizer = sess_db.get_uid(data.pop('organizer', None))
    if not organizer or organizer == -1:
        return {"status": "failure", "failure_cause": "user_not_exist"} 

    # if insertion failed, return failure
    eid = sess_db.insert_event(data, organizer)
    if eid == -1:
        return {"status": "failure", "failure_cause": "insert_failure"}

    # if there are tags, insert them into event_tag
    if tags:
        sess_db.add_tags(eid, tags, True)

    return {"status": "success"}

# Begin page-serve routes
@flask_backend.route("/", defaults={'path': ''})
@flask_backend.route("/<path:path>")
def index(path):
    #return "Hello World!"
    return render_template("index.html", token="dumbedeedoo")

flask_backend.run(debug=True, use_reloader=False)
