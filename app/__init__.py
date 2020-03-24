from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash, Response, jsonify
 
app = Flask(__name__, static_folder="./static/dist", template_folder="./static")
import logging
logging.basicConfig(level=logging.DEBUG)
app.config['TEMPLATES_AUTO_RELOAD'] = True
  
#Begin page-serve routes
   
@app.route("/")
def index():
    return render_template("index.html")
