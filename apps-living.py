from flask import Flask, jsonify

app = Flask(__name__)

log_id = 6097248
house_name = 'FH201'
student_name = 'QIAORUI CUI'
arrive_date = '2016-03-14 21:35:59'
collect_date = '2016-03-16 08:59:22'
confirm_state = 'null'

sample_data = [
    {
        'logId': log_id,
        'houseName': house_name,
        'studentName': student_name,
        'arriveDate': arrive_date,
        'collectDate': collect_date,
        'confirmState': confirm_state
    },
    {
        'logId': log_id,
        'houseName': house_name,
        'studentName': student_name,
        'arriveDate': arrive_date,
        'collectDate': collect_date,
        'confirmState': confirm_state
    }
]


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/api/sample', methods=['GET'])
def get_tasks():
    return jsonify({'sampleData': sample_data})


if __name__ == '__main__':
    app.run(debug=True)
