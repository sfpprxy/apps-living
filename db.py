from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ubuntu:@139.59.172.12/ubuntu'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Student(db.Model):
    student_id = db.Column(db.Integer, primary_key=True)
    student_name = db.Column(db.Text)
    house_name = db.Column(db.Text)
    room_number = db.Column(db.Text)
    phone_number = db.Column(db.Text)
    email = db.Column(db.Text)

    def __init__(self, student_id, student_name, house_name, room_number, phone_number, email):
        self.student_id = student_id
        self.student_name = student_name
        self.house_name = house_name
        self.room_number = room_number
        self.phone_number = phone_number
        self.email = email


def query():
    logs = Student.query.filter_by(student_name='Qiaorui Cui')
    return logs

student = query().first()
# print(dir(student))
# print(type(student.house_name))
# print(str(student.house_room))
