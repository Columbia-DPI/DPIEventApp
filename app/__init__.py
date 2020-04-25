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

# database queries
# insert_event: dictionary, int; no return value
def insert_event(event, organizer):

    event_info = tuple(event.values())
    event_str = "'" + "', '".join(event_info) + "', " + str(organizer)

    sql = 'insert into events (title, location, timestamp, description, link, organizer) values (%s)' % (event_str,)

    try:
        conn.cursor().execute(sql, (event_str,))
        conn.commit()
    except Exception as e:
	    print('failed to insert: ' + str(e))

# select_event: list; return list
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
        print("failed to select into events: " + str(e))
        return None

    return res

## TO TEST
# add_tags: list, int; no return value
def add_tags(tags, event):
    
    for t in tags:
        tid = get_tid(t)
        if (tid == -1):
            new_tag(t)
        sql = 'insert into event_tag values (%s)' % (event, t)
        try:
            conn.cursor().execute(sql, (event_str,))
            conn.commit()
        except Exception as e:
            print('failed to insert into event_tag: ' + str(e))

# new_tag: 
def new_tag(tag_name):

    sql = 'insert into tags (name) values (%s)' % (tag_name,)

    try:
        conn.cursor().execute(sql, (tag_name,))
        conn.commit()
    except Exception as e:
	    print('failed to insert into tags: ' + str(e))    


# get_tid: str; return int
def get_tid(tag_name):
    
    sql = "select tid from tags where name = '" + tag_name + "'"

    try:
        cur = conn.cursor()
        cur.execute(sql)
        tid = int(cur.fetchone())
        # no existing tag
        if (tid == None):
            tid = -1

    except Exception as e:
        print("failed to get tid: " + str(e))
        return None

    return tid



# insert_user: dictionary
# need to check for valid class and school
def insert_user(bio):
    user_bio = tuple(bio.values())
    user_str = "'" + "', '".join(user_bio) + "'"

    sql = 'insert into users (name, UNI, class, school) values (%s)' % (user_str,)

    try:
        conn.cursor().execute(sql, (user_bio,))
        conn.commit()
    except Exception as e:
	    print('failed to insert into users: ' + str(e))

# Begin page-serve routes

@app.route("/")
def index():
    event_info = {'title': 'April Fools Party' , 'location': 'Zoom' , 'timestamp': '2020-04-01 00:00:00', 'description': 'welcome to the party', 'link': 'www.youarefooled.com'}
    user_bio = {'name': 'DPI', 'UNI': 'dpi0123', 'class': '2022', 'school': 'CC'}
    # insert_event(event_info, 1)
    # print(select_event(['sports', 'free food']))

    return render_template("index.html")
