from flask import Flask, jsonify, request
from flask.ext.cors import CORS
import packer


app = Flask(__name__, static_url_path='')
CORS(app)


@app.route('/hello')
def hello_world():
    return 'Hello World!'


@app.route('/')
def root():
    return app.send_static_file('index.html')


@app.route('/api/sample', methods=['GET'])
def get_sample():
    return jsonify({'sampleData': packer.sample_data})


@app.route('/api/student/<house_name>', methods=['GET'])
def get_student(house_name):
    return jsonify({'student': packer.get_student_list(house_name)})


@app.route('/api/add', methods=['POST'])
def post_add():
    print('WOW!')
    if request.json:
        mydata = request.json # will be
        print('OK')
        print(mydata)
        return 'OK to front'

    else:
        print('no json received')
        return 'no json received'


if __name__ == '__main__':
    app.run(debug=True)
