from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ubuntu:@139.59.172.12/ubuntu'
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
