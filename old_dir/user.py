from flask_login import UserMixin

class User(UserMixin):
    def __init__(self, id, name, email, uni=None, year=None, school=None, club=None):
        self.id = id
        self.name = name
        self.uni = uni
        self.email = email
        self.year = year
        self.school = school
        self.club = club

    @staticmethod
    def get(sess_db, user_id):
        user = sess_db.conn.cursor().execute('select * from users where uid = %s', (user_id, )).fetchone()
        if not user:
            return None

        if (user['club']):
            return User(user_id, user['name'], user['email'], club = user['club'])
        return User(user_id, user['name'], user['email'], user['uni'], user['year'], user['class'], user['club'])

    @staticmethod
    def create(sess_db, user_id, name, email):
        sess_db.conn.cursor().execute("insert into users (uid, name, email) values (%s, '%s', '%s')", (user_id, name, email))
        sess_db.conn.commit()
