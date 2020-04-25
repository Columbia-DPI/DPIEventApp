from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash, Response, jsonify

app = Flask("__main__")

# Begin page-serve routes
@app.route("/")
def index():
    return render_template("index.html", token="dumbedeedoo")

app.run(debug=True, use_reloader=False)
