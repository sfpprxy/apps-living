import flask
from flask import Flask, jsonify, request
import flask_login
from flask_cors import CORS
import service
from appslogger import logger as log


app = Flask(__name__, static_url_path='')
app.secret_key = 'key for apps-living'
login_manager = flask_login.LoginManager()
login_manager.init_app(app)
CORS(app)

users = service.get_users()


class User(flask_login.UserMixin):
    pass


@login_manager.user_loader
def user_loader(username):
    if username not in users:
        return None
    user = User()
    user.id = username
    return user


@login_manager.request_loader
def request_loader(user_request):
    username = user_request.form.get('username')
    if username not in users:
        return
    user = User()
    user.id = username
    # DO NOT ever store passwords in plaintext and always compare password
    # hashes using constant-time comparison!
    user.is_authenticated = user_request.form['password'] == users[username]['password']
    return user


@app.route('/', methods=['GET', 'POST'])
def login():
    if flask.request.method == 'GET':
        return '''
               <form action='/' method='POST'>
                <h1>Please login</h1>
                <input type='text' name='username' id='username' placeholder='username'></input>
                <input type='password' name='password' id='password' placeholder='password'></input>
                <input type='submit' name='submit'></input>
               </form>
               '''
    username = flask.request.form['username']
    if username not in users:
        return 'Incorrect username or password'
    if flask.request.form['password'] == users[username]['password']:
        user = User()
        user.id = username
        flask_login.login_user(user)
        return flask.redirect(flask.url_for('index'))
    return 'Incorrect username or password'


@app.route('/protected')
@flask_login.login_required
def protected():
    return 'Logged in as: ' + flask_login.current_user.id


@app.route('/logout')
def logout():
    flask_login.logout_user()
    return 'Logged out'


@login_manager.unauthorized_handler
def unauthorized_handler():
    return 'Unauthorized'


@app.route('/hello')
@flask_login.login_required
def hello_world():
    log.info('Hello World!')
    return 'Hello World!'


@app.route('/index')
@flask_login.login_required
def index():
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


@app.route('/api/logs', methods=['GET'])
def get_logs():
    state = request.args.get('state')
    house = request.args.get('house')
    return jsonify({'room': service.get_logs(house, state)})


# to check if a certain room has new parcel, check button could be added later in front-end
@app.route('/api/check-log/<room_id>', methods=['GET'])
def check_log(room_id):
    log.info('/api/rooms/' + room_id)
    return jsonify({'logs': service.check_log(room_id)})


@app.route('/api/new-parcel', methods=['POST'])
def new_parcel():
    if request.json:
        result = service.new_parcel(request.json)
        log.info('/api/new-parcel: ' + result)
        return result  # success = room_id, fail = 'Wrong email address format'
    else:
        print('no json received')
        return 'no json received'


@app.route('/api/archive', methods=['POST'])
def archive():
    if request.json:
        log.info('/api/archive: ' + service.archive(request.json))
        return 'archive OK!'

    else:
        print('no json received')
        return 'no json received'


@app.route('/api/find-log/<param>', methods=['GET'])
def find_log(param):
    log.info('/api/find-log/' + param)
    return jsonify({'logs': service.find_log(param)})


if __name__ == '__main__':
    app.run(debug=True)
