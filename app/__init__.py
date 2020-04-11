from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash, Response, jsonify
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from oauthlib.oauth2 import WebApplicationClient
import requests
import os
import sys
import logging
from dotenv import load_dotenv
from user import User
from db import Db
load_dotenv()

# database connection
sess_db = Db.init_db()

# configuring app
app = Flask(__name__, static_folder="./static/dist", template_folder="./static")
app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)

logging.basicConfig(level=logging.DEBUG)
app.config['TEMPLATES_AUTO_RELOAD'] = True

# setting up login auth
client = WebApplicationClient(os.getenv("GOOGLE_CLIENT_ID"))

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id, sess_db)

def get_google_provider_cfg():
    return requests.get(os.getenv("GOOGLE_DISCOVERY_URL")).json()

# Begin page-serve routes
@app.route("/")
def index():
    if current_user.is_authenticated:
        print(current_user.name, current_user.email, current_user.year)
        return render_template("index.html")

    else:
        return '<a class="button" href="/login">Google Login</a>'

@app.route("/login")
def login():
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    # sending authorization request and getting basic info back
    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=request.base_url.replace("http", "https") + "/callback",
        scope=["openid", "email", "profile"],
    )
    return redirect(request_uri)

@app.route("/login/callback")
def callback():
    code = request.args.get("code")

    # find out where to get tokens
    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]

    # prepare and send request to get tokens
    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=request.base_url,
        code=code
    )
    print("point2")
    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(os.getenv("GOOGLE_CLIENT_ID"), os.getenv("GOOGLE_CLIENT_SECRET")),
    )
    print("point3")
    # parse the tokens
    client.parse_request_body_response(json.dumps(token_response.json()))

    # get info from user's google account
    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)
    print("point4")
    # parse user info
    if userinfo_response.json().get("email_verified"):
        unique_id = userinfo_response.json()["sub"]
        users_email = userinfo_response.json()["email"]
        picture = userinfo_response.json()["picture"]
        users_name = userinfo_response.json()["given_name"]
    else:
        return "User email not available or not verified by Google.", 400

    # log in and optionally add user into db
    user = User(
        id=unique_id, name=users_name, email=users_email
    )

    # Doesn't exist? Add it to the database.
    if not User.get(unique_id):
        User.create(unique_id, users_name, users_email)

    # Begin user session by logging the user in
    login_user(user)

    # Send user back to homepage
    return redirect(url_for("index"))
