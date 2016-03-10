from flask import Flask, jsonify

app = Flask(__name__)

log_id
house_name
student_name
arrive_date
collect_date
confirm_state

example = [
    {

    },
    {

    }
]


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/example', methods=['GET'])
def get_tasks():
    return jsonify({'example': example})


if __name__ == '__main__':
    app.run(debug=True)
