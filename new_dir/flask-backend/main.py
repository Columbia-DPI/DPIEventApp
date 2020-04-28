from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash, Response, jsonify

dpiapp = Flask("__main__")

# Begin page-serve routes
@dpiapp.route("/")
@dpiapp.route("/login")
@dpiapp.route("/allevents")
def index():
    return render_template("index.html", token="dumbedeedoo")

dpiapp.run(debug=True, use_reloader=False)
