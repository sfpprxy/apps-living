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
    print(tenants)
    return tenants


def get_houses():
    result = db.House.query.distinct(db.House.house_name)
    houses = []
    for _ in result:
        house = {
            'houseName': _.house_name
        }
        houses.append(house)
    print(houses)
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
    print(rooms)
    return rooms
