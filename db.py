from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ubuntu:@46.101.15.189/ubuntu'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Student(db.Model):
    student_id = db.Column(db.Integer, primary_key=True)
    student_name = db.Column(db.Text)
    wechat_id = db.Column(db.Text)
    house_room = db.Column(db.Text)

    def __init__(self, student_id, student_name, wechat_id, house_room):
        self.student_id = student_id
        self.student_name = student_name
        self.wechat_id = wechat_id
        self.house_room = house_room


def query():
    logs = Student.query.filter_by(student_name='QIAORUI CUI')
    return logs

student = query().first()
# print(dir(student))
# print(type(student.house_name))
# print(str(student.house_room))
