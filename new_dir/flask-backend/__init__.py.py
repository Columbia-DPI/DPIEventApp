from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash, Response, jsonify

myapp = Flask("__main__")

# Begin page-serve routes
@myapp.route("/")
@myapp.route("/login")
@myapp.route("/allevents")
def index():
    return render_template("index.html", token="dumbedeedoo")

myapp.run(debug=True, use_reloader=False)
