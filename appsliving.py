from flask import Flask, jsonify
import packer


app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/api/sample', methods=['GET'])
def get_sample():
    return jsonify({'sampleData': packer.sample_data})


@app.route('/api/student', methods=['GET'])
def get_student():
    return jsonify({'student': packer.student_info})


if __name__ == '__main__':
    app.run(debug=True)
