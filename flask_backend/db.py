import os
import psycopg2

class Db:
    def __init__(self, conn):
        self.conn = conn

    @staticmethod
    def init_db():
        DATABASE_URL = os.environ['DATABASE_URL']
        conn = psycopg2.connect(DATABASE_URL, sslmode='require')
        print("----------------")
        print(DATABASE_URL)
        return Db(conn)


    # insert_event: insert event information
    # dictionary of event info, int uid
    # return eid of event added, return -1 on failure
    def insert_event(self, event, organizer):

        eid = -1
        event_info = tuple(event.values())
        event_str = "'" + "', '".join(event_info) + "', " + str(organizer)
        print(event_str)
        sql = 'insert into \"events\" (title, location, timestamp, description, link, organizer) values (%s)' % (event_str,)

        try:
            cur = self.conn.cursor()
            cur.execute(sql, (event_str,))
            self.conn.commit()
            sql2 = 'select max(eid) as latest_event from events' 
            cur2 = self.conn.cursor()
            cur2.execute(sql2)
            eid = int(cur2.fetchone()[0])
            cur.close()
            cur2.close()

        except Exception as e:
            print('failed to insert: ' + str(e))
            return -1

        return eid


    # select_event: select event by tag name
    # list of tag names
    # return list of event information
    def select_event(self, tags):

        res = []

        if (tags == None or len(tags) == 0):
            e_num = self.eid_by_likes()
            res = [self.get_event(e[0]) for e in e_num]

        else:
            sql = " select distinct event_tag.eid, count(*) as num from (event_tag join tags on event_tag.tid = tags.tid and ("

            # sql = "select distinct event_tag.eid from (event_tag join tags on event_tag.tid = tags.tid) where "
            for tag in tags:
                sql += "tags.tag = '" + tag + "' OR "

            sql = sql[:-4]
            sql += ")) left join likes on event_tag.eid = likes.eid group by event_tag.eid order by num desc"
            # print(sql)
            try:
                cur = self.conn.cursor()
                cur.execute(sql)    
                res = [self.get_event(int(row[0])) for row in cur]
                cur.close()

            except Exception as e:
                print("failed to select events by tags: " + str(e))
                return None

        return res

    # eid_by_likes: rank list of events by number of likes
    # return list of (eid, num)
    def eid_by_likes(self):

        res = []
        sql = """select events.eid, count(*) as num 
                from (events left join likes on events.eid = likes.eid) 
                group by events.eid order by num desc"""
        try:
            cur = self.conn.cursor()
            cur.execute(sql) 
            res = [row for row in cur]
            cur.close()
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
            cur.close()
        except Exception as e:
            print("failed to get event info" + str(eid) + ": " + str(e))
            return None  

        return res
        

    # tags_by_freq: show top 20 most frequently used tags
    # no input
    # return a list of [tid, tag_name, frequency]

    def tags_by_freq(self):

        res = []
        sql = """select distinct tid, tag, freq from ( 
            select distinct event_tag.tid, count(*) as freq from event_tag 
            group by event_tag.tid) as f 
            natural join tags 
            order by freq desc 
            limit 20"""

        try:
            cur = self.conn.cursor()
            cur.execute(sql)  
            res = [row for row in cur]
            cur.close()
        except Exception as e:
            print("failed to show tags by frequency: " + str(e))
            return None

        return res    


    # add_tags: add (eid, tags) into event_tag
    # list of tag names,  int eid
    # return number of tags added, return -1 on failure
    def add_tags(self, eid, tags):

        count = 0

        for t in tags:
            tid = self.get_tid(t)
            if (tid == -1):
                self.new_tag(t)
                tid = self.get_tid(t)
            et_str = str(eid) +", " + str(tid) 
            sql = 'insert into event_tag values (%s)' % (et_str,)

            try:
                self.conn.cursor().execute(sql, (et_str,))
                self.conn.commit()
                print(sql)
                count += 1

            except Exception as e:
                print('failed to insert into event_tag :' + str(e))
                return -1
        
        return count


    # new_tag: helper function to create one new tag
    # string tag_name
    # return int tid just added, return -1 on failure
    def new_tag(self, tag_name):

        tag_str = "'" + tag_name + "'"
        sql = 'insert into tags (tag) values (%s)' % (tag_str,)

        try:
            self.conn.cursor().execute(sql, (tag_str,))
            self.conn.commit()
        except Exception as e:
            print('failed to insert into tags: ' + str(e))   
            return -1
         
        return self.get_tid(tag_name)


    # get_tid: obtain tid
    # string tag_name
    # return int tid, returns -1 on failure
    def get_tid(self, tag_name):
        
        sql = "select tid from tags where tag = '" + tag_name + "'"

        try:
            cur = self.conn.cursor()
            cur.execute(sql)
            tid = cur.fetchone()
            # no existing tag
            if (tid == None):
                return -1
            cur.close()

        except Exception as e:
            print('failed to get tid of ' + tag_name +': '+ str(e))
            

        return int(tid[0])


    # insert_user: dictionary
    # need to check for valid class and school
    # return uid of user just added, returns -1 on failure
    def insert_user(self, bio):

        uid = -1
        user_bio = tuple(bio.values())
        user_str = "'" + "', '".join(user_bio) + "'"

        sql = 'insert into users (name, uni, school, email, year) values (%s)' % (user_str,)

        try:
            self.conn.cursor().execute(sql, (user_bio,))
            self.conn.commit()
            sql2 = 'select max(uid) as latest_user from users' 
            cur2 = self.conn.cursor()
            cur2.execute(sql2)
            uid = int(cur2.fetchone()[0])
            cur2.close()
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
            interest_str = str(uid) + ',' + str(tid)
            sql = 'insert into interests (uid, tid) values (%s)' % (interest_str,)

            try:
                self.conn.cursor().execute(sql, (interest_str,))
                self.conn.commit()
                count += 1

            except Exception as e:
                print('failed to mark tags as intersted: ' + str(e))
                return -1

        return count


    # like_event: a user likes an event
    # auto-generated uid, eid
    # returns (uid, eid) on success
    def like_event(self, uid, eid):
        
        # note the table has eid, uid but it does not affect the result
        like_str = str(uid) + ',' + str(eid)
        sql = 'insert into likes (uid, eid) values (%s)' % (like_str,)
        try:
            self.conn.cursor().execute(sql, (like_str,))
            self.conn.commit()
        except Exception as e:
            print('user ' + str(uid) +' failed to like event ' + str(eid) + ':' + str(e))
            return None

        return (uid,eid)



    # view_liked: show the events that a user likes
    # uid
    # returns list of event information
    def view_liked(self, uid):

        res = []
        sql = "select distinct eid from likes where uid = '" + str(uid) + "'"

        try:
            cur = self.conn.cursor()
            cur.execute(sql)    
            res=[self.get_event(int(row[0])) for row in cur]
            cur.close()

        except Exception as e:
            print("failed to view events liked by " + str(uid) + ": " + str(e))
            return None

        return res    



    # num_likes: show the number of likes of an event
    # eid
    # return int number of likes, return -1 on failure
    def num_likes(self, eid):

        num = 0
        sql = "select count(*) as num from likes where eid = '" + str(eid) + "'"

        try:
            cur = self.conn.cursor()
            cur.execute(sql)    
            num = int(cur.fetchone()[0])
            cur.close()

        except Exception as e:
            print("failed to view number of likes of event " + str(eid) + ": " + str(e))
            return -1

        return num

    # who_likes: who likes an event
    # eid
    # return list of ints uids
    def who_likes(self, eid):

        res = []
        sql = "select uid from likes where eid = '" + str(eid) + "'"

        try:
            cur = self.conn.cursor()
            cur.execute(sql)    
            res = [int(row[0]) for row in cur]
            cur.close()

        except Exception as e:
            print("failed to view who likes event " + str(eid) + ": " + str(e))
            return None

        return res


    # get_event_tags: get tags of an event
    # input eid
    # return list of tags
    def get_event_tags(self, eid):

        res = []
        sql = "select tag from tags join event_tag on event_tag.tid = tags.tid where eid = '" + str(eid) + "'"

        try:
            cur = self.conn.cursor()
            cur.execute(sql)    
            res = [row[0] for row in cur]
            cur.close()

        except Exception as e:
            print("failed to get tags of event " + str(eid) + ": " + str(e))
            return None

        return res



    # what_interest: tags that a user is interested in
    # input uid
    # return list of ints tids
    def what_interest(self, uid):

        res = []
        sql = "select tid from interests where uid = '" + str(uid) + "'"

        try:
            cur = self.conn.cursor()
            cur.execute(sql)    
            res = [int(row[0]) for row in cur]
            cur.close()

        except Exception as e:
            print("failed to view what user " + str(uid) + " likes: " + str(e))
            return None

        return res



    # recommend_for_user: recommend events for user based on number of tags matched
    # input uid
    # return tuple of event info
    def recommend_for_user(self, uid):

        res = []
        sql = "select eid, count(*) as match from interests join event_tag on interests.tid = event_tag.tid and uid = '"
        sql += str(uid)
        sql += "' group by eid order by match desc"

        print(self.what_interest(uid))

        try:
            cur = self.conn.cursor()
            cur.execute(sql)    
            res = [self.get_event(row[0]) for row in cur]
            cur.close()

        except Exception as e:
            print("failed to recommend events for user " + str(uid) + " : " + str(e))
            return None

        return res


