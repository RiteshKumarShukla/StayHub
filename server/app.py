from flask import Flask, jsonify, request, render_template
from pymongo import MongoClient
from bson.objectid import ObjectId
import json
app = Flask(__name__)

# MongoDB connection
client = MongoClient("mongodb+srv://riteshshukla:riteshshukla@cluster0.fo6fefn.mongodb.net/?retryWrites=true&w=majority")
db = client.stayHub

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return super().default(o)

app.json_encoder = CustomJSONEncoder
class Host:
    def __init__(self, name, email, location, property_type, hosting_since):
        self._id = ObjectId()
        self.name = name
        self.email = email
        self.location = location
        self.property_type = property_type
        self.hosting_since = hosting_since

class Property:
    def __init__(self, host_id, title, location,status, property_type, description, price_per_night):
        self._id = ObjectId()
        self.host_id = host_id
        self.title = title
        self.location = location
        self.property_type = property_type
        self.description = description
        self.price_per_night = price_per_night
        self.status = status


class Guest:
    def __init__(self, name, gender, date_of_birth, bio):
        self._id = ObjectId()
        self.name = name
        self.gender = gender
        self.date_of_birth = date_of_birth
        self.bio = bio

class Booking:
    def __init__(self, property_id, guest_id, check_in_date, check_out_date):
        self._id = ObjectId()
        self.property_id = property_id
        self.guest_id = guest_id
        self.check_in_date = check_in_date
        self.check_out_date = check_out_date

@app.route("/")
def index():
    return ("server running")

# Host routes
@app.route("/api/hosts", methods=["GET"])
def get_all_hosts():
    hosts = db.hosts.find()
    res=[]
    for host in hosts:
        res.append({
            "id":str(host["_id"]),
            "name":str(host['name']),
            "email": str(host['email']),
            "location": str(host['location']),
            "property_type":str(host['property_type']),
            "hosting_since":str(host['hosting_since'])
        })
    return jsonify(res)

@app.route("/api/hosts/<string:host_id>", methods=["GET"])
def get_host(host_id):
    host = db.hosts.find_one({"_id": ObjectId(host_id)})
    if host:
        res={}
# Convert ObjectId to string and store in 'res'
        res["id"] = str(host["_id"])
        res["name"] = str(host["name"])
        res["email"] = str(host["email"])
        res["location"] = str(host["location"])
        res["property_type"] = str(host["property_type"])
        res["hosting_since"] = str(host["hosting_since"])
        return jsonify(res)
    return jsonify({"message": "Host not found"}), 404

@app.route("/api/hosts", methods=["POST"])
def create_host():
    data = request.get_json()
    host = Host(name=data["name"], email=data["email"], location=data["location"], property_type=data["property_type"],hosting_since=data["hosting_since"])
    db.hosts.insert_one(host.__dict__)
    return jsonify({"message": "Host created successfully"}), 201

@app.route("/api/hosts/<string:host_id>", methods=["PUT"])
def update_host(host_id):
    data = request.get_json()
    db.hosts.update_one({"_id": ObjectId(host_id)}, {"$set": data})
    return jsonify({"message": "Host updated successfully"})

@app.route("/api/hosts/<string:host_id>", methods=["DELETE"])
def delete_host(host_id):
    result = db.hosts.delete_one({"_id": ObjectId(host_id)})
    if result.deleted_count > 0:
        return jsonify({"message": "Host deleted successfully"})
    return jsonify({"message": "Host not found"}), 404

# Property routes
@app.route("/api/properties", methods=["GET"])
def get_all_properties():
    properties =db.properties.find()
    res=[]
    for property in properties:
        res.append({
            "id":str(property["_id"]),
            "title":str(property['title']),
            "host_id": str(property['host_id']),
            "location": str(property['location']),
            "property_type":str(property['property_type']),
            "description":str(property['description']),
            "price_per_night":str(property['price_per_night']),
            "status":bool(property['status'])
        })
    return jsonify(res)

@app.route("/api/properties/<string:property_id>", methods=["GET"])
def get_property(property_id):
    property = db.properties.find_one({"_id": ObjectId(property_id)})
    if property:

        res={}
# Convert ObjectId to string and store in 'res'
        res["id"] = str(property["_id"])
        res["title"] = str(property["title"])
        res["host_id"] = str(property["host_id"])
        res["location"] = str(property["location"])
        res["property_type"] = str(property["property_type"])
        res["description"] = str(property["description"])
        res["price_per_night"] = str(property["price_per_night"])
        res["status"] = bool(property["status"])
        return jsonify(res)
    return jsonify({"message": "Property not found"}), 404

@app.route("/api/properties", methods=["POST"])
def create_property():
    data = request.get_json()
    property = Property(
        host_id=data["host_id"],
        title=data["title"],
        location=data["location"],
        property_type=data["property_type"],
        description=data["description"],
        price_per_night=data["price_per_night"],
        status=data["status"]
    )
    db.properties.insert_one(property.__dict__)
    return jsonify({"message": "Property created successfully"}), 201

@app.route("/api/properties/<string:property_id>", methods=["PUT"])
def update_property(property_id):
    data = request.get_json()
    db.properties.update_one({"_id": ObjectId(property_id)}, {"$set": data})
    return jsonify({"message": "Property updated successfully"})

@app.route("/api/properties/<string:property_id>", methods=["DELETE"])
def delete_property(property_id):
    result = db.properties.delete_one({"_id": ObjectId(property_id)})
    if result.deleted_count > 0:
        return jsonify({"message": "Property deleted successfully"})
    return jsonify({"message": "Property not found"}), 404

# Guest routes
@app.route("/api/guests", methods=["GET"])
def get_all_guests():
    guests = db.guests.find()
    res=[]
    for guest in guests:
        res.append({
            "id":str(guest["_id"]),
            "name":str(guest['name']),
            "gender": str(guest['gender']),
            "date_of_birth": str(guest['date_of_birth']),
            "bio":str(guest['bio'])
        })
    return jsonify(res)

@app.route("/api/guests/<string:guest_id>", methods=["GET"])
def get_guest(guest_id):
    guest = db.guests.find_one({"_id": ObjectId(guest_id)})
    if guest:
        res={}
# Convert ObjectId to string and store in 'res'
        res["id"] = str(guest["_id"])
        res["name"] = str(guest["name"])
        res["gender"] = str(guest["gender"])
        res["date_of_birth"] = str(guest["date_of_birth"])
        res["bio"] = str(guest["bio"])
        return jsonify(res)
    return jsonify({"message": "Guest not found"}), 404

@app.route("/api/guests", methods=["POST"])
def create_guest():
    data = request.get_json()
    guest = Guest(
        name=data["name"],
        gender=data["gender"],
        date_of_birth=data["date_of_birth"],
        bio=data["bio"]
    )
    db.guests.insert_one(guest.__dict__)
    return jsonify({"message": "Guest created successfully"}), 201

@app.route("/api/guests/<string:guest_id>", methods=["PUT"])
def update_guest(guest_id):
    data = request.get_json()
    db.guests.update_one({"_id": ObjectId(guest_id)}, {"$set": data})
    return jsonify({"message": "Guest updated successfully"})

@app.route("/api/guests/<string:guest_id>", methods=["DELETE"])
def delete_guest(guest_id):
    result = db.guests.delete_one({"_id": ObjectId(guest_id)})
    if result.deleted_count > 0:
        return jsonify({"message": "Guest deleted successfully"})
    return jsonify({"message": "Guest not found"}), 404

# Booking routes
@app.route("/api/bookings", methods=["GET"])
def get_all_bookings():
    bookings = db.bookings.find()
    res=[]
    for book in bookings:
        res.append({
            "id":str(book["_id"]),
            "property_id":str(book['property_id']),
            "guest_id": str(book['guest_id']),
            "check_in_date": str(book['check_in_date']),
            "check_out_date":str(book['check_out_date'])
        })
    return jsonify(res)

@app.route("/api/bookings/<string:booking_id>", methods=["GET"])
def get_booking(booking_id):
    booking = db.bookings.find_one({"_id": ObjectId(booking_id)})
    if booking:
        res={}
# Convert ObjectId to string and store in 'res'
        res["id"] = str(booking["_id"])
        res["property_id"] = str(booking["property_id"])
        res["guest_id"] = str(booking["guest_id"])
        res["check_in_date"] = str(booking["check_in_date"])
        res["check_out_date"] = str(booking["check_out_date"])
        return jsonify(res)
    return jsonify({"message": "Booking not found"}), 404

@app.route("/api/bookings", methods=["POST"])
def create_booking():
    data = request.get_json()
    booking = Booking(
        property_id=data["property_id"],
        guest_id=data["guest_id"],
        check_in_date=data["check_in_date"],
        check_out_date=data["check_out_date"]
    )
    db.bookings.insert_one(booking.__dict__)
    return jsonify({"message": "Booking created successfully"}), 201

@app.route("/api/bookings/<string:booking_id>", methods=["PUT"])
def update_booking(booking_id):
    data = request.get_json()
    db.bookings.update_one({"_id": ObjectId(booking_id)}, {"$set": data})
    return jsonify({"message": "Booking updated successfully"})

@app.route("/api/bookings/<string:booking_id>", methods=["DELETE"])
def delete_booking(booking_id):
    result = db.bookings.delete_one({"_id": ObjectId(booking_id)})
    if result.deleted_count > 0:
        return jsonify({"message": "Booking deleted successfully"})
    return jsonify({"message": "Booking not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)