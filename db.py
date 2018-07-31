from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:@178.62.90.172/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Room(db.Model):
    room_id = db.Column(db.Integer, primary_key=True)
    house_name = db.Column(db.Text)
    room_number = db.Column(db.Text)
    tenant_name = db.Column(db.Text)
    phone_number = db.Column(db.Text)
    email = db.Column(db.Text)

    def __init__(self, room_id, house_name, room_number, tenant_name, phone_number, email):
        self.room_id = room_id
        self.house_name = house_name
        self.room_number = room_number
        self.tenant_name = tenant_name
        self.phone_number = phone_number
        self.email = email


class Log(db.Model):
    log_id = db.Column(db.Integer, primary_key=True)
    arrive_date = db.Column(db.DateTime)
    collect_date = db.Column(db.DateTime)
    room_id = db.Column(db.Integer)  # ref: Room.room_id
    code = db.Column(db.Integer)
    state = db.Column(db.Text)
    note = db.Column(db.Text)

    def __init__(self, log_id, arrive_date, collect_date, room_id, code, state, note):
        self.log_id = log_id
        self.arrive_date = arrive_date
        self.collect_date = collect_date
        self.room_id = room_id
        self.code = code
        self.state = state
        self.note = note


class Logbook(db.Model):
    log_id = db.Column(db.Integer, primary_key=True)
    arrive_date = db.Column(db.DateTime)
    collect_date = db.Column(db.DateTime)
    room_id = db.Column(db.Integer)
    house_name = db.Column(db.Text)
    room_number = db.Column(db.Text)
    tenant_name = db.Column(db.Text)
    email = db.Column(db.Text)
    code = db.Column(db.Integer)
    state = db.Column(db.Text)
    note = db.Column(db.Text)

    def __init__(self, log_id, arrive_date, collect_date, room_id,
                 house_name, room_number, tenant_name, email, code, state, note):
        self.log_id = log_id
        self.arrive_date = arrive_date
        self.collect_date = collect_date
        self.room_id = room_id
        self.house_name = house_name
        self.room_number = room_number
        self.tenant_name = tenant_name
        self.email = email
        self.code = code
        self.state = state
        self.note = note


class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text)
    password = db.Column(db.Text)

    def __init__(self, user_id, username, password):
        self.user_id = user_id
        self.username = username
        self.password = password

