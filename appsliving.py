from flask import Flask, jsonify, request
from flask_cors import CORS
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


@app.route('/api/new-room', methods=['POST'])
def new_room():
    if request.json:
        service.new_room(request.json)
        return 'new-room OK!'

    else:
        print('no json received')
        return 'no json received'


@app.route('/api/update-tenant', methods=['POST'])
def update_tenant():
    if request.json:
        service.update_tenant(request.json)
        return 'update-tenant OK!'

    else:
        print('no json received')
        return 'no json received'


@app.route('/api/delete-room', methods=['POST'])
def delete_room():
    if request.json:
        service.delete_room(request.json)
        return 'delete-room OK!'

    else:
        print('no json received')
        return 'no json received'


if __name__ == '__main__':
    app.run(debug=True)
