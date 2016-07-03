from flask import Flask, jsonify, request
from flask_cors import CORS
import service
from appslogger import logger as log


app = Flask(__name__, static_url_path='')
CORS(app)


@app.route('/hello')
def hello_world():
    log.info('Hello World!')
    return 'Hello World!'


@app.route('/')
def root():
    log.info('access index.html')
    return app.send_static_file('index.html')


@app.route('/api/tenants/<house_name>', methods=['GET'])
def get_students(house_name):
    log.info('/api/tenants/' + house_name)
    return jsonify({'tenants': service.get_tenants(house_name)})


@app.route('/api/houses', methods=['GET'])
def get_houses():
    log.info('/api/houses')
    return jsonify({'houses': service.get_houses()})


@app.route('/api/rooms/<house_name>', methods=['GET'])
def get_rooms(house_name):
    log.info('/api/rooms/' + house_name)
    return jsonify({'rooms': service.get_rooms(house_name)})


@app.route('/api/room/<room_id>', methods=['GET'])
def get_room(room_id):
    log.info('/api/room/' + room_id)
    return jsonify({'room': service.get_room(room_id)})


@app.route('/api/new-room', methods=['POST'])
def new_room():
    if request.json:
        log.info('/api/new-room: ' + service.new_room(request.json))
        return 'new-room OK!'

    else:
        print('no json received')
        return 'no json received'


@app.route('/api/update-tenant', methods=['POST'])
def update_tenant():
    if request.json:
        log.info('/api/update-tenant: ' + service.update_tenant(request.json))
        return 'update-tenant OK!'

    else:
        print('no json received')
        return 'no json received'


@app.route('/api/delete-room', methods=['POST'])
def delete_room():
    if request.json:
        log.info('/api/delete-room: ' + service.delete_room(request.json))
        return 'delete-room OK!'

    else:
        print('no json received')
        return 'no json received'


@app.route('/api/log/<state>', methods=['GET'])
def get_log(state):
    log.info('/api/log/' + state)
    return jsonify({'logs': service.get_log(state)})


@app.route('/api/check-log/<room_id>', methods=['GET'])
def check_log(room_id):
    log.info('/api/rooms/' + room_id)
    return jsonify({'logs': service.check_log(room_id)})


if __name__ == '__main__':
    app.run(debug=True)
