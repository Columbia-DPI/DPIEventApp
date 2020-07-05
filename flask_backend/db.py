"""
TO DO:
!! TEST search by key
    - Improve error handling, do not exit on all errors
    - How to store image files?
    - Add archive function based on timestamp, only show future events
    - Add time filter, filter event by date (tomorrow, this week, next week, etc)
"""



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


    # select_event: select event by tag/key name
    # list of tag/key names
    # return list of event information
    def select_event(self, tagkeys):

        res = []

        if (tagkeys == None or len(tagkeys) == 0):

            #print(self.eid_by_likes())
            e_num = self.eid_by_likes()
            res = [self.get_event(e[0]) for e in e_num]

        else:
            sql_tag = "select distinct event_tag.eid, count(*) as num from (event_tag join tags on event_tag.tid = tags.tid and ("

            keys = []
            for tk in tagkeys:
                if self.get_tid(tk) == -1: # not a tag
                    keys.append(tk)
                else: # is a tag
                    sql += "tags.tag = '" + tag + "' or "

            sql_tag = sql[:-4]
            sql_tag += ")) left join likes on event_tag.eid = likes.eid group by event_tag.eid order by num desc"
            # print(sql)

            sql_key_title = "select distinct eid from events where title like '%" + key + "%'"
            sql_key_desc = "select distinct eid from events where description like '%" + key + "%'"
            
            try:
                cur = self.conn.cursor()
                cur.execute(sql_tag)    
                # the result of this query should be a list of (eids, freq)
                eid_tag = [int(row[0]) for row in cur]
        
                cur2 = self.conn.cursor()
                cur2.execute(sql_key_title)
                eid_key = [int(row[0]) for row in cur2]
                if len(eid_tag)+len(eid_key) < 15:
                    cur3 = self.conn.cursor()
                    cur3.execute(sql_key_desc)
                    for row in cur3:
                        r = int(row[0])
                        if r not in eid_key:
                            eid_key.append(r)
                    cur3.close()

                eids = []
                for eid in eid_tag:
                    if eid in eid_key:
                        eids.append(eid)

                res = [self.get_event(i) for i in eids]

                cur.close()
                cur2.close()

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


    # get_event: get event info by eid
    # input int eid
    # return event info tuple
    def get_event(self, eid):

        res = []
        sql = """select eid, title, location, timestamp, users.first_name, description, link 
                from events join users on events.organizer = users.uid where eid = '%s'
                """ %str(eid)
        try:
            cur = self.conn.cursor()
            cur.execute(sql) 
            res.append(cur.fetchone())
            cur.close()
        except Exception as e:
            print("failed to get event info for eid = " + str(eid) + ": " + str(e))
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
        
        sql = "select distinct tid from tags where tag = '" + tag_name + "'"

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

# EDIT
    # insert_user: dictionary
    # need to check for valid class and school
    # return uid of user just added, returns -1 on failure
    def insert_user(self, bio):

        uid = -1
        user_bio = tuple(bio.values())
        user_str = "'" + "', '".join(user_bio) + "'"

        sql = 'insert into users (first_name, last_name, uni, school, year, gender, email) values (%s)' % (user_str,)

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

    # show all tags
    # get from the database all tags with their tids
    # return a list of tid, tag
    def show_all_tags(self):
        res = []
        sql = "select distinct * from tags"

        try:
            cur = self.conn.cursor()
            cur.execute(sql)    
            res=[row[0] for row in cur]
            cur.close()

        except Exception as e:
            print("failed to show all tags" + str(e))
            return None

        return res



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



    # my_likes: show the events that a user likes
    # uid
    # returns list of event information
    def my_likes(self, uid):

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
        sql = "select distinct uid from likes where eid = '" + str(eid) + "'"

        try:
            cur = self.conn.cursor()
            cur.execute(sql)    
            res = [int(row[0]) for row in cur]
            cur.close()

        except Exception as e:
            print("failed to view who likes event " + str(eid) + ": " + str(e))
            return None

        return res

    # RETEST THIS  
    # get_event_tags: get tags of an event
    # input eid
    # return list of (tid, tag)
    def get_event_tags(self, eid):

        res = []
        sql = "select tags.tid, tag from tags join event_tag on event_tag.tid = tags.tid where eid = '" + str(eid) + "'"

        try:
            cur = self.conn.cursor()
            cur.execute(sql)    
            res = [row for row in cur]
            cur.close()

        except Exception as e:
            print("failed to get tags of event " + str(eid) + ": " + str(e))
            return None

        return res



    # my_interests: tags that a user is interested in
    # input uid
    # return list of ints tids
    def my_interests(self, uid):

        res = []
        sql = "select distinct tid from interests where uid = '" + str(uid) + "'"

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

        print(self.my_interests(uid))

        try:
            cur = self.conn.cursor()
            cur.execute(sql)    
            res = [self.get_event(row[0]) for row in cur]
            cur.close()

        except Exception as e:
            print("failed to recommend events for user " + str(uid) + " : " + str(e))
            return None

        return res



    # get_user_bio: show user bio
    # input uid
    # retunr user bio tuple
    def get_user_bio(self, uid):

        res = []
        sql = "select * from users where uid = '" + str(uid) + "'"
        try:
            cur = self.conn.cursor()
            cur.execute(sql) 
            res.append(cur.fetchone())
            cur.close()
        except Exception as e:
            print("failed to get user bio" + str(uid) + ": " + str(e))
            return None  

        return res



    # edit_event: only organizer can access this page
    # input eid, new event info
    # return eid on success and -1 on failure
    def edit_event(self, eid, event):

        event_info = tuple(event.values())
        title = event_info[0]
        location = event_info[1]
        timestamp = event_info[2]
        description = event_info[3]
        link = event_info[4]

        sql = "update events set title = '" + title + "', location = '" + location + "', "
        sql += "timestamp = '" + timestamp + "', " + "description = '" + description + "', "
        sql += "link = '" + link + "' "
        sql += "where eid = '" + str(eid) + "'"
        print(sql)
        
        try:
            cur = self.conn.cursor()
            cur.execute(sql) 
            self.conn.commit()
            print("Successfully modified event " + str(eid))
        except Exception as e:
            print("failed to edit event " + str(eid) + ": " + str(e))
            return -1

        return eid



    # edit_bio
    # input uid, new user bio
    # return tuple of fields modified
    def edit_bio(self, uid, bio):

        user_bio = tuple(bio.values())
        name = user_bio[0]
        UNI = user_bio[1]
        school = user_bio[2]
        email = user_bio[3]
        year = user_bio[4]


        sql = "update users set name = '" + name + "', uni = '" + UNI + "', "
        sql += "school = '" + school + "', " + "email = '" + email + "', "
        sql += "year = '" + year + "' "
        sql += "where uid = '" + str(uid) + "'"
        print(sql)

        try:
            cur = self.conn.cursor()
            cur.execute(sql) 
            self.conn.commit()
            print("Successfully edited bio of user" + str(uid))
            cur.close()
        except Exception as e:
            print("failed to edit bio of user " + str(uid) + ": " + str(e))
            return -1

        return uid



    # my_events: show events I created
    # input uid
    # return list of ints eids
    def my_events(self, uid):
        
        res = []
        sql = "select eid from events where organizer  = '" + str(uid) + "'"

        try:
            cur = self.conn.cursor()
            cur.execute(sql)  
            res = [row[0] for row in cur]
            cur.close()
        except Exception as e:
            print("failed to get events organized by user " + str(uid) + ": " + str(e))
            return None

        return res



    # unlike_event: undo like event
    # input uid, eid
    # return 1 on success and -1 on failure
    def unlike_event(self, uid, eid):

        sql = "delete from likes where uid = '" + str(uid) + "' and eid = '" + str(eid) + "'"

        try:
            cur = self.conn.cursor()
            cur.execute(sql) 
            self.conn.commit()
            print("User " + str(uid) + " has successfully unliked event "+ str(eid))
            cur.close()
        except Exception as e:
            print("failed to unliked event "+ str(eid) + " :" + str(uid))
            return -1

        return 1



    # uninterest_tag: remove tag from user's list of interests
    # input uid, tid
    # return 1 on success and -1 on failure
    def uninterest_tags(self, uid, tids):

        sql = "delete from interests where uid = '" + str(uid) + "' and ("

        for t in tids:
            sql += "tid = '" + str(t) + "' or "
        
        sql = sql[:-4]
        sql += ")"
        print(sql)

        try:
            cur = self.conn.cursor()
            cur.execute(sql) 
            self.conn.commit()
            cur.close()
        except Exception as e:
            print("failed to mark no interest in tags " + tids + " for user " + str(uid) + " :" + str(e))
            return -1

        return 1
    


    # remove_tag: remove tag from event
    # input eid, list of ints tids
    # return 1  on success and -1 on failure
    def remove_tags(self, eid, tids):

        sql = "delete from event_tag where eid = '" + str(eid) + "' and ("

        for t in tids:
            sql += "tid = '" + str(t) + "' or "
        
        sql = sql[:-4]
        sql += ")"

        try:
            cur = self.conn.cursor()
            cur.execute(sql) 
            self.conn.commit()
            print(sql)
            cur.close()
        except Exception as e:
            print("failed to remove tags from event "+ str(eid) + " :" + str(e))
            return -1

        return 1



    # delete_tag_all
    # remove tag from all fields
    # return 1 on success and -1 on failure
    def delete_tag_all(self, tid, tag_name):

        sql = "delete from tags where tid = '" + str(tid) + "' and tag = '" + tag_name + "'"
        # on delete cascade
        # affected tables: tags, event_tag, interests
        try:
            cur = self.conn.cursor()
            cur.execute(sql) 
            self.conn.commit()
            print(sql)
            cur.close()
        except Exception as e:
            print("failed to permanently delete tag "+ str(tid) + "-" + tag_name + " :" + str(e))
            return -1

        return 1



    # delete_event
    # input uid, eid
    # return 1 on success and -1 on failure
    def delete_event(self, eid):

        sql = "delete from events where eid = '" + str(eid) + "'"
        # on delete cascade
        # affected tables: events, event_tag, likes
        try:
            cur = self.conn.cursor()
            cur.execute(sql) 
            self.conn.commit()
            print(sql)
            cur.close()
        except Exception as e:
            print("failed to delete event "+ str(eid) + " :" + str(e))
            return -1

        return 1
