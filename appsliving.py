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
    return jsonify({'sampleData': packer.log_id})


@app.route('/api/tenants/<house_name>', methods=['GET'])
def get_students(house_name):
    return jsonify({'tenants': packer.get_tenants(house_name)})


@app.route('/api/houses', methods=['GET'])
def get_houses():
    return jsonify({'houses': packer.get_houses()})


@app.route('/api/rooms/<house_name>', methods=['GET'])
def get_rooms(house_name):
    return jsonify({'rooms': packer.get_rooms(house_name)})


@app.route('/api/new-room', methods=['POST'])
def post_add():
    if request.json:
        data = request.json # will be
        print(data)
        return 'OK to front'

    else:
        print('no json received')
        return 'no json received'


if __name__ == '__main__':
    app.run(debug=True)
