from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://joe:@localhost/flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


# example
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(120), unique=True)

    def __init__(self, username, email):
        self.username = username
        self.email = email

    def __repr__(self):
        return '<User %r>' % self.username


class Logbook(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_name = db.Column(db.String(8))
    wechat_id = db.Column(db.Text)

    def __init__(self, student_name, wechat_id):
        self.student_name = student_name
        self.wechat_id = wechat_id

    def __repr__(self):
        return self.student_name


def add(x):
    for _ in range(x):
        log = Logbook('joewqeqweqwe', 'ben0000')
        db.session.add(log)
        db.session.commit()


def de():
    Logbook.query.filter_by(student_name='joe').delete()
    db.session.commit()


def query():
    logs = Logbook.query.filter_by(student_name='joe').first()
    return logs

add(2)

sid = query().id
sname = query().student_name
wid = query().wechat_id
