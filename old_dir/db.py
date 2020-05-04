import os
import psycopg2

class Db:
    def __init__(self, conn):
        self.conn = conn

    @staticmethod
    def init_db():
        DATABASE_URL = os.environ['DATABASE_URL']
        conn = psycopg2.connect(DATABASE_URL, sslmode='require')
        return Db(conn)

    def insert_event(self, event, organizer):
        event_info = tuple(event.values())
        event_str = "'" + "', '".join(event_info) + "', " + str(organizer)

        sql = 'insert into events (title, location, timestamp, description, link, organizer) values (%s)' % (event_str,)

        try:
            self.conn.cursor().execute(sql, (event_str,))
            self.conn.commit()
        except Exception as e:
    	    print('failed to insert: ' + str(e))

    def select_event(self, tags):
        res = []

        if (tags == None):
    	    sql = "select distinct event_tag.eid from (event_tag join tags on event_tag.tid = tags.tid)"
        else:
            sql = "select distinct event_tag.eid from (event_tag join tags on event_tag.tid = tags.tid) where "
            for tag in tags:
                sql += "tags.tag = '" + tag + "' OR "

            sql = sql[:-4]

        cur = self.conn.cursor()

        try:
            cur.execute(sql)
            cur2 = self.conn.cursor()

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
