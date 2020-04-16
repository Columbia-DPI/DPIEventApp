from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash, Response, jsonify

app = Flask(__name__, static_folder="./static/dist", template_folder="./static")
import logging
logging.basicConfig(level=logging.DEBUG)
app.config['TEMPLATES_AUTO_RELOAD'] = True

#database connection
import os
import psycopg2
import sys

DATABASE_URL = os.environ['DATABASE_URL']

conn = psycopg2.connect(DATABASE_URL, sslmode='require')

#database queries
def insert_event(event, organizer):
    event_info = tuple(event.values())
    event_str = "'" + "', '".join(event_info) + "', " + str(organizer)

    sql = 'insert into events (title, location, timestamp, description, link, organizer) values (%s)' % (event_str,)

    try:
        conn.cursor().execute(sql, (event_str,))
        conn.commit()
    except Exception as e:
	    print('failed to insert: ' + str(e))

def select_event(tags):

    res = []

    if (tags == None):
	    sql = "select distinct event_tag.eid from (event_tag join tags on event_tag.tid = tags.tid)"
    else:
        sql = "select distinct event_tag.eid from (event_tag join tags on event_tag.tid = tags.tid) where "
        for tag in tags:
            sql += "tags.tag = '" + tag + "' OR "

        sql = sql[:-4]

    cur = conn.cursor()

    try:
        cur.execute(sql)
        cur2 = conn.cursor()
        for row in cur:
            sql2 = "select * from events where eid = " + str(row[0])
            cur2.execute(sql2)
            res.append(cur2.fetchone())

        cur2.close()
        cur.close()

    except Exception as e:
        print("failed to select events: " + str(e))
        return None

    return res


#Begin page-serve routes

@app.route("/")
def index():
    event_info = {'title': 'April Fools Party' , 'location': 'Zoom' , 'timestamp': '2020-04-01 00:00:00', 'description': 'welcome to the party', 'link': 'www.youarefooled.com'}
    # insert_event(event_info, 1)
    # print(select_event(['sports', 'free food']))

    return render_template("index.html")
