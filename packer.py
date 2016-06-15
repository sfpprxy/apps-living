import db


# logbook
log_id = 6097248
arrive_date = '2016-03-14 21:35:59'
collect_date = '2016-03-16 08:59:22'
confirm_state = 'null'
# student
student_id = db.student.student_id
student_name = db.student.student_name
house_name = db.student.house_name
room_number = db.student.room_number
# phone_number = db.student.phone_number
email = db.student.email


student_info = [
    {
        'studentId': student_id,
        'studentName': student_name,
        'houseName': house_name,
        'roomNumber': room_number,
        # 'phone_number': phone_number,
        'email': email
    }
]
