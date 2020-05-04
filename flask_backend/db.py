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


    # insert_event: insert event information
    # dictionary of event info, int uid
    # return eid of event added, return -1 on failure
    def insert_event(self, event, organizer):
        eid = -1
        event_info = tuple(event.values())
        event_str = "'" + "', '".join(event_info) + "', " + str(organizer)

        sql = 'insert into events (title, location, timestamp, description, link, organizer) values (%s)' % (event_str,)

        try:
            conn.cursor().execute(sql, (event_str,))
            conn.commit()
            sql2 = 'select max(eid) as latest_event from events' 
            cur2 = conn.cursor()
            cur2.execute(sql2)
            eid = int(cur2.fetchone())

        except Exception as e:
            print('failed to insert: ' + str(e))
            return -1

        return eid


    # select_event: select event by tag name
    # list of tag names
    # return list of event information
    def select_event(self, tags):

        res = []

        # construct query message
        if (tags == None):
            sql = "select distinct events.eid from events"
        else:
            sql = "select distinct event_tag.eid from (event_tag join tags on event_tag.tid = tags.tid) where "
            for tag in tags:
                sql += "tags.tag = '" + tag + "' OR "

            sql = sql[:-4]

        try:
            cur = self.conn.cursor()
            cur.execute(sql)    
            for row in cur:
                # row is (eid, tid)
                #print(row)
                # INCORPORATE eid_by_likes
                res.append(self.get_event(int(row[0])))
            cur.close()

        except Exception as e:
            print("failed to select events by tags: " + str(e))
            return None

        return res


    # TO-DO
    # rank_by_like: rank list of events by number of likes
    # return list of int eids
    def eid_by_likes(self):
        res = []
        sql = "select eid, count(*) as num from likes group by eid order by num desc"
        try:
            cur = conn.cursor()
            cur.execute(sql) 
            for row in cur:
                # row is eid, num
                res.append(row[0])
        except Exception as e:
            print("failed to rank eid by likes: " + str(e))
            return None  

        return res


    # get_event: helper function to get event info by eid
    # input int eid
    # return event info tuple
    def get_event(self, eid):

        res = []
        sql = "select * from events where eid = '" + str(eid) + "'"
        try:
            cur = self.conn.cursor()
            cur.execute(sql) 
            res.append(cur.fetchone())
        except Exception as e:
            print("failed to get event info" + str(eid) + ": " + str(e))
            return None  

        return res
        

    # show_tags: show top 20 most frequently used tags
    # no input
    # return a list of [tid, tag_name, frequency]

    def show_tags(self):
        tag_freq = []
        res = []
        #sql = "select distinct name from tags limit 20"
        sql = """select distinct tid, name, freq from ( 
            select distinct event_tag.tid, count(*) as freq from event_tag 
            group by event_tag.tid) as f 
            natural join tags 
            order by freq desc 
            limit 20"""
        try:
            cur = conn.cursor()
            cur.execute(sql)  
            tag_freq.append(cur.fetchone())
            cur.close()
            for tf in tag_freq:
                # tf is tag_name, freq
                res.append(tf)
        except Exception as e:
            print("failed to select from tags: " + str(e))
            return None

        return res    


    # add_tags: add (eid, tid) into event_tag
    # list of tag names,  int eid
    # return number of tags added, return -1 on failure
    def add_tags(self, tags, event):

        count = 0

        for t in tags:
            tid = get_tid(t)
            if (tid == -1):
                new_tag(t)
                tid = self.get_tid(t)
            sql = 'insert into event_tag values (%s)' % (event, tid)
            try:
                conn.cursor().execute(sql, (event_str,))
                conn.commit()
                count += 1

            except Exception as e:
                print('failed to insert into event_tag :' + str(e))
                return -1
        
        return count


    # new_tag: helper function to create one new tag
    # string tag_name
    # return int tid just added, return -1 on failure
    def new_tag(self, tag_name):

        sql = 'insert into tags (name) values (%s)' % (tag_name,)

        try:
            conn.cursor().execute(sql, (tag_name,))
            conn.commit()
        except Exception as e:
            print('failed to insert into tags: ' + str(e))   
            return -1
         
        return self.get_tid(tag_name)


    # get_tid: obtain tid
    # string tag_name
    # return int tid, returns -1 on failure
    def get_tid(self, tag_name):
        
        sql = "select tid from tags where name = '" + tag_name + "'"

        try:
            cur = conn.cursor()
            cur.execute(sql)
            tid = int(cur.fetchone())
            # no existing tag
            if (tid == None):
                tid = -1

        except Exception as e:
            print('failed to get tid of' + tag_name +': '+ str(e))
            return -1

        return tid


    # insert_user: dictionary
    # need to check for valid class and school
    # return uid of user just added, returns -1 on failure
    def insert_user(self, bio):

        uid = -1
        user_bio = tuple(bio.values())
        user_str = "'" + "', '".join(user_bio) + "'"

        sql = 'insert into users (name, UNI, class, school) values (%s)' % (user_str,)

        try:
            conn.cursor().execute(sql, (user_bio,))
            conn.commit()
            sql2 = 'select max(uid) as latest_user from users' 
            cur2 = conn.cursor()
            cur2.execute(sql2)
            uid = int(cur2.fetchone())
        except Exception as e:
            print('failed to insert into users: ' + str(e))
            return -1

        return uid


    # interest_tag: mark tags as interested
    # auto-generated uid, list of ints tids
    # returns number of tags marked as interested, return -1 on failure
    def interest_tag(self, uid, tids):

        count = 0

        for tid in tids:
            interest_str = "'" + str(uid) + ',' + str(tid) +','
            sql = 'insert into interests (uid, tid) values (%s)' % (interest_str,) # double check the table

            try:
                conn.cursor().execute(sql, (interest_str,))
                conn.commit()
                count += 1

            except Exception as e:
                print('failed to mark tags as intersted: ' + str(e))
                return -1

        return count


    # like: user likes an event
    # auto-generated uid, eid
    # returns 1 on success and -1 on failure
    def like(self, uid, eid):

        like_str = "'" + str(uid) + ',' + str(eid) +','
        sql = 'insert into likes (uid, eid) values (%s)' % (like_str,)
        try:
            conn.cursor().execute(sql, (interest_str,))
            conn.commit()
        except Exception as e:
            print('user' + str(uid) +'failed to like event ' + str(eid) + ':' + str(e))
            return -1

        return 1



    # view_liked: show the events that a user likes
    # uid
    # returns list of event information
    def view_liked(self, uid):

        res = []

        sql = "select distinct eid from likes where uid = '" + str(uid) + "'"

        try:
            cur = conn.cursor()
            cur.execute(sql)    
            for row in cur:
                # row is (eid, tid)
                res.append(self.get_event(int(row[0])))
            cur.close()

        except Exception as e:
            print("failed to view events liked by " + str(uid) + ": " + str(e))
            return None

        return res    



    # num_likes: show the number of likes of an event
    # eid
    # return int
    def num_likes(self, eid):

        num = 0
        sql = "select count(*) as num from likes where eid = '" + str(eid) + "' group by eid "

        try:
            cur = conn.cursor()
            cur.execute(sql)    
            num = int(cur.fetchone())
            cur.close()

        except Exception as e:
            print("failed to view events liked by " + str(uid) + ": " + str(e))
            return None

