import db


# logbook
log_id = 6097248
arrive_date = '2016-03-14 21:35:59'
collect_date = '2016-03-16 08:59:22'
confirm_state = 'null'


def get_student_list(hn):
    student_list = []
    result = db.Student.query.filter_by(house_name=hn).order_by(db.Student.room_number)
    for _ in result:
        student_info = {
            'studentId': _.student_id,
            'studentName': _.student_name,
            'houseName': _.house_name,
            'roomNumber': _.room_number,
            'email': _.email
        }
        student_list.append(student_info)
    print(student_list)
    return student_list




