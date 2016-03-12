import db


# logbook
log_id = 6097248
arrive_date = '2016-03-14 21:35:59'
collect_date = '2016-03-16 08:59:22'
confirm_state = 'null'
# student
student_id = db.student.student_id
student_name = db.student.student_name
wechat_id = db.student.wechat_id
house_room = db.student.house_room


sample_data = [
    {
        'logId': log_id,
        'houseRoom': house_room,
        'studentName': student_name,
        'arriveDate': arrive_date,
        'collectDate': collect_date,
        'confirmState': confirm_state
    },
    {
        'logId': log_id,
        'houseRoom': house_room,
        'studentName': student_name,
        'arriveDate': arrive_date,
        'collectDate': collect_date,
        'confirmState': confirm_state
    }
]

student_info = [
    {
        'studentId': student_id,
        'wechatId': wechat_id,
        'studentName': student_name,
        'houseRoom': house_room,
    }
]
