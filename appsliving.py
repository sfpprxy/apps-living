from flask import Flask, jsonify, request
from flask.ext.cors import CORS
import service


app = Flask(__name__, static_url_path='')
CORS(app)


# TODO: log all these gets and posts
@app.route('/hello')
def hello_world():
    return 'Hello World!'


@app.route('/')
def root():
    return app.send_static_file('index.html')


@app.route('/api/sample', methods=['GET'])
def get_sample():
    return jsonify({'sampleData': service.log_id})


@app.route('/api/tenants/<house_name>', methods=['GET'])
def get_students(house_name):
    return jsonify({'tenants': service.get_tenants(house_name)})


@app.route('/api/houses', methods=['GET'])
def get_houses():
    return jsonify({'houses': service.get_houses()})


@app.route('/api/rooms/<house_name>', methods=['GET'])
def get_rooms(house_name):
    return jsonify({'rooms': service.get_rooms(house_name)})


@app.route('/api/room/<room_id>', methods=['GET'])
def get_room(room_id):
    return jsonify({'room': service.get_room(room_id)})


# TODO: implement this post
@app.route('/api/new-room', methods=['POST'])
def post_add():
    if request.json:
        data = request.json
        print(data)
        return 'new-room OK!'

    else:
        print('no json received')
        return 'no json received'


# TODO: implement update-tenant post, http://127.0.0.1:5000/api/update-tenant
# TODO: implement delete-room post, http://127.0.0.1:5000/api/delete-room


if __name__ == '__main__':
    app.run(debug=True)
