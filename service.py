from datetime import datetime
from random import randint
import db
import appsemail


def get_tenants(house_name):
    result = db.Room.query.filter_by(house_name=house_name).order_by(db.Room.room_number)
    tenants = []
    for _ in result:
        tenant = {
            'roomId': _.room_id,
            'houseName': _.house_name,
            'roomNumber': _.room_number,
            'tenantName': _.tenant_name,
            'email': _.email
        }
        tenants.append(tenant)
    return tenants


def get_houses():
    result = db.Room.query.distinct(db.Room.house_name)
    houses = []
    for _ in result:
        house = {
            'houseName': _.house_name
        }
        houses.append(house)
    return houses


def get_rooms(house_name):
    result = db.Room.query.filter_by(house_name=house_name).order_by(db.Room.room_number)
    rooms = []
    for _ in result:
        room = {
            'roomId': _.room_id,
            'roomNumber': _.room_number
        }
        rooms.append(room)
    return rooms


def get_room(room_id):
    result = db.Room.query.filter_by(room_id=room_id)
    one_room = []
    for _ in result:
        room = {
            'roomId': _.room_id,
            'houseName': _.house_name,
            'roomNumber': _.room_number,
            'tenantName': _.tenant_name,
            'email': _.email
        }
        one_room.append(room)
    return one_room


def new_room(data):
    house = data['house']
    room_number = data['roomNumber']
    record = db.Room(room_id=None, house_name=house, room_number=room_number,
                     tenant_name='', phone_number='', email='')
    db.db.session.add(record)
    db.db.session.commit()
    return house + ' ' + room_number


def update_tenant(data):
    room_id = data['roomId']
    tenant_name = data['tenantName']
    email = data['email']
    room = db.Room.query.filter_by(room_id=room_id)
    old_tenant_name = room.first().tenant_name
    old_email = room.first().email
    room.update(dict(tenant_name=tenant_name, email=email))
    db.db.session.commit()
    return 'old: ' + old_tenant_name + ' ' + old_email + ' ' + \
           'new: ' + tenant_name + ' ' + email + ' '


def delete_room(data):
    room_id = data['roomId']
    db.Room.query.filter_by(room_id=room_id).delete()
    db.db.session.commit()
    return str(room_id)


def get_logs(state):
    result = db.Logbook.query.filter_by(state=state).order_by(db.Logbook.arrive_date.desc())
    logs = []
    for _ in result:
        if state == 'current':
            collect_date = 'Waiting for collection'
        else:
            collect_date = _.collect_date.strftime('%d %b %Y %I:%M%p')
        log = {
            'logId': _.log_id,
            'arriveDate': _.arrive_date.strftime('%d %b %Y %I:%M%p'),
            'collectDate': collect_date,
            'roomId': _.room_id,
            'houseName': _.house_name,
            'roomNumber': _.room_number,
            'tenantName': _.tenant_name,
            'email': _.email,
            'code': _.code,
            'state': _.state
        }
        logs.append(log)
    return logs


def check_log(room_id):
    result = db.Logbook.query.filter_by(room_id=room_id, state=None)
    logs = []
    for _ in result:
        log = {
            'logId': _.log_id,
            'arriveDate': _.arrive_date,
            'collectDate': _.collect_date,
            'roomId': _.room_id,
            'houseName': _.house_name,
            'roomNumber': _.room_number,
            'tenantName': _.tenant_name,
            'email': _.email,
            'code': _.code,
            'state': _.state
        }
        logs.append(log)
    return logs


def new_parcel(data):
    # prepare data for sending email
    room_id = data['roomId']
    result = db.Room.query.filter_by(room_id=room_id).first()
    tenant_name = result.tenant_name
    email = result.email
    code = str(randint(1000, 9999))

    is_success = appsemail.send(email, tenant_name, code)
    if is_success:
        # add new parcel record
        record = db.Log(log_id=None, arrive_date=datetime.now(), collect_date=None,
                        room_id=room_id, code=code, state='current')
        db.db.session.add(record)
        db.db.session.commit()
        return str(room_id)
    else:
        return 'Wrong email address format'


def archive(data):
    log_id = data['logId']
    log = db.Log.query.filter_by(log_id=log_id)
    log.update(dict(state='archived', collect_date=datetime.now()))
    db.db.session.commit()
    return str(log_id)
