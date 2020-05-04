""" all functions
    insert_event(self, event, organizer) 1
    select_event(self, tags) 1
    eid_by_likes(self)
    get_event(self, eid) 1
    show_tags(self) 1
    add_tags(self, tags, event) 1
    new_tag(self, tag_name) 1
    get_tid(self, tag_name)
    insert_user(self, bio) 1
    interest_tag(self, uid, tids) 1
    like(self, uid, eid)
    view_liked(self, uid)
    num_likes(self, eid)
"""




# TEST insert_event
# sample event string input
# {"title":" ", "location": " ", "timestamp": "2020-04-01 00:00:00", "description":" ", "link":" "}
e1 = {"title":"April Fools' Party", "location": "Zoom", "timestamp": "2020-04-01 00:00:00", "description":"You are fooled!", "link":"https://aprilfools.com"}
e2 = {"title":"Escape the Zoom", "location": "Zoom", "timestamp": "2020-04-02 20:00:00", "description":"Escape the Zoom with your friends", "link":"https://bit.ly/zoom"}
e3 = {"title":"Event 3", "location": "333", "timestamp": "2020-04-03 03:00:00", "description":"third test event", "link":"https://event3.com"}
e4 = {"title":"Event 4", "location": "444", "timestamp": "2020-04-04 04:00:00", "description":"fourth test event", "link":"https://event4.com"}
e5 = {"title":"Event 5", "location": "555", "timestamp": "2020-04-05 05:00:00", "description":"fifth test event", "link":"https://event5.com"}
e6 = {"title":"Event 6", "location": "666", "timestamp": "2020-04-06 06:00:00", "description":"sixth test event", "link":"https://event6.com"}
e7 = {"title":"Event 7", "location": "777", "timestamp": "2020-04-07 07:00:00", "description":"seventh test event", "link":"https://event7.com"}
e8 = {"title":"Event 8", "location": "888", "timestamp": "2020-04-08 08:00:00", "description":"eighth test event", "link":"https://event8.com"}
e9 = {"title":"Event 9", "location": "999", "timestamp": "2020-04-09 09:00:00", "description":"ninth test event", "link":"https://event9.com"}
e10 = {"title":"Event 10", "location": "101010", "timestamp": "2020-04-10 10:00:00", "description":"tenth test event", "link":"https://event10.com"}
evs = [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10]
for ev in evs:
    insert_event(ev)


# TEST add_tags and new_tags
tev1 = ["party", "social", "free food", "online","stupid"]
tev2 = ["social", "online"]
tev3 = ["tech", "resume drop", "professional"]
tev4 = ["tech", "free food", "online"]
tev5 = ["free food", "professional", "finance", "social", "resume drop"]
tev6 = ["art", "concert", "choir", "free food", "social"]
tev7 = ["sports", "social", "varsity"]
tev8 = ["stupid", "useless"]
tev9 = ["online", "club meeting", "tech", "panel"]
tev10 =["club meeting", "social", "party", "free food", ]

tevs = [tev1, tev2, tev3, tev4, tev5, tev6, tev7, tev8, tev9, tev10]
num = 1
for tev in tevs:
    add_tags(tev,num)
    num += 1


# TEST show tags
# social x6, free food x5, online x4, party x2, tech x3, resume drop x2, panel x2, professional x2, club meeting x2, stupid x2,
# finance x1, art x1, concert x1, choir x1, sports x1, varsity x1, useless x1,
show_tags()

# TEST select_event and get_event
select_event()
select_event(tev1)
select_event("useless")
select_event("social")



# TEST insert_user
# sample user string input
# {"name": "", "UNI": , "class": , "school":}
u1 = {"name": "user1", "UNI":"u1", "class":"1111", "school":"CC"}
u2 = {"name": "user2", "UNI":"u2", "class":"2222", "school":"CC"}
u3 = {"name": "user3", "UNI":"u3", "class":"3333", "school":"SEAS"}
u4 = {"name": "user4", "UNI":"u4", "class":"4444", "school":"CC"}
u5 = {"name": "user5", "UNI":"u5", "class":"5555", "school":"GS"}
u6 = {"name": "user6", "UNI":"u6", "class":"6666", "school":"Barnard"}
u7 = {"name": "user7", "UNI":"u7", "class":"7777", "school":"SEAS"}

users = [u1,u2,u3,u4,u5,u6,u7]
for user in users:
    insert_user(user)


# TEST interest_tag
# online x4,  tech x4, social x3, free food x2, finance x2, party x2, sports x3, varsity x2, 
# resumedrop x1, art x1, panel x1, professional x1, club meeting x1,
# stupid x0, useless x0
"""
ut1 = ["social","online","tech"]
ut2 = ["free food", "tech", "online"]
ut3 = ["tech", "finance", "party", "social","resume drop"]
ut4 = ["art","online","choir","concert"]
ut5 = ["sports", "varsity"]
ut6 = ["sports, varsity"]
ut7 = ["online", "sports" "social", "free food", "party", "tech", "resume drop", "panel", "professional", "club meeting", "finance"]
"""
ut1 = [2,4,6]
ut2 = [3, 6, 4]
ut3 = [6,9, 1, 2, 7]
ut4 = [10,4,12,11]
ut5 = [13,14]
ut6 = [13,14]
ut7 = [4, 13, 2, 3, 1, 6, 7, 17, 8, 16, 9]

uts = [ut1,ut2,ut3,ut4,ut5,ut6,ut7]
num = 0
for ut in uts:
    interest_tag(num,ut)
    num += 1




# TEST eid_by_likes
eid_by_likes()