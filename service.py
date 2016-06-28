import db


# logbook
log_id = 6097248
arrive_date = '2016-03-14 21:35:59'
collect_date = '2016-03-16 08:59:22'
confirm_state = 'null'


def get_tenants(house_name):
    result = db.House.query.filter_by(house_name=house_name).order_by(db.House.room_number)
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
    result = db.House.query.distinct(db.House.house_name)
    houses = []
    for _ in result:
        house = {
            'houseName': _.house_name
        }
        houses.append(house)
    return houses


def get_rooms(house_name):
    result = db.House.query.filter_by(house_name=house_name).order_by(db.House.room_number)
    rooms = []
    for _ in result:
        room = {
            'roomId': _.room_id,
            'roomNumber': _.room_number
        }
        rooms.append(room)
    return rooms


def get_room(room_id):
    result = db.House.query.filter_by(room_id=room_id)
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
    record = db.House(room_id=None, house_name=house, room_number=room_number, tenant_name=None, phone_number=None, email=None)
    db.db.session.add(record)
    db.db.session.commit()


def update_tenant(data):
    room_id = data['roomId']
    tenant_name = data['tenantName']
    email =data['email']
    db.House.query.filter_by(room_id=room_id).update(dict(tenant_name=tenant_name, email=email))
    db.db.session.commit()
