import db


# logbook
log_id = 6097248
arrive_date = '2016-03-14 21:35:59'
collect_date = '2016-03-16 08:59:22'
confirm_state = 'null'


def get_students(house_name):
    result = db.Student.query.filter_by(house_name=house_name).order_by(db.Student.room_number)
    student_list = []
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


def get_apartments():
    result = db.Student.query.distinct(db.Student.house_name)
    apartments = []
    for _ in result:
        apartment = {
            'houseName': _.house_name
        }
        apartments.append(apartment)
    print(apartments)
    return apartments
