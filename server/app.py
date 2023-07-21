from flask import Flask, request, jsonify, session
from pymongo import MongoClient
from flask_cors import CORS 
from bson.objectid import ObjectId
import bcrypt

app = Flask(__name__)
CORS(app) 
app.secret_key = "ritesh"
app.config['SESSION_TYPE'] = 'filesystem'  # Enable Flask session type

# MongoDB configuration
MONGO_URI = "mongodb+srv://riteshshukla:riteshshukla@cluster0.fo6fefn.mongodb.net/?retryWrites=true&w=majority"  # Replace this with your MongoDB connection URI
DB_NAME = "newStayHub"  # Replace this with your desired database name

# Helper functions

def get_db():
    client = MongoClient(MONGO_URI)
    return client[DB_NAME]

def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def verify_password(stored_hash, password):
    return bcrypt.checkpw(password.encode('utf-8'), stored_hash)

def is_host_authenticated():
    return session.get('user_role') == 'host'

def is_guest_authenticated():
    return session.get('user_role') == 'guest'

# Property model class
class Property:
    def __init__(self, host_id, title, location, status, property_type, description, price_per_night, img):
        self._id = ObjectId()
        self.host_id = host_id
        self.title = title
        self.location = location
        self.property_type = property_type
        self.description = description
        self.price_per_night = price_per_night
        self.status = status
        self.img = img

@app.route("/")
def index():
    return ("server running")

# User routes

@app.route('/signup/host', methods=['POST'])
def host_signup():
    db = get_db()
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Check if email already exists in the database
    if db.hosts.find_one({"email": email}):
        return jsonify({"error": "Email already exists"}), 400

    # Hash the password before saving it in the database
    hashed_password = hash_password(password)

    # Create a new host document
    host_id = db.hosts.insert_one({
        "email": email,
        "password": hashed_password,
    }).inserted_id

    return jsonify({"host_id": str(host_id)}), 201

@app.route('/signup/guest', methods=['POST'])
def guest_signup():
    db = get_db()
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Check if email already exists in the database
    if db.guests.find_one({"email": email}):
        return jsonify({"error": "Email already exists"}), 400

    # Hash the password before saving it in the database
    hashed_password = hash_password(password)

    # Create a new guest document
    guest_id = db.guests.insert_one({
        "email": email,
        "password": hashed_password,
    }).inserted_id

    return jsonify({"guest_id": str(guest_id)}), 201

@app.route('/login/host', methods=['POST'])
def host_login():
    db = get_db()
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Find the host with the given email
    host = db.hosts.find_one({"email": email})

    if not host:
        return jsonify({"error": "Invalid credentials"}), 401

    # Verify the password
    if not verify_password(host['password'], password):
        return jsonify({"error": "Invalid credentials"}), 401

    # Set the user role to "host" in the session
    session['user_role'] = 'host'

    # Return the host ID in the login response
    return jsonify({"message": "Host login successful", "host_id": str(host["_id"])}), 200

@app.route('/login/guest', methods=['POST'])
def guest_login():
    db = get_db()
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Find the guest with the given email
    guest = db.guests.find_one({"email": email})

    if not guest:
        return jsonify({"error": "Invalid credentials"}), 401

    # Verify the password
    if not verify_password(guest['password'], password):
        return jsonify({"error": "Invalid credentials"}), 401

    # Set the user role to "guest" in the session
    session['user_role'] = 'guest'

    return jsonify({"message": "Guest login successful"}), 200

# Property routes

@app.route("/api/properties", methods=["GET"])
def get_all_properties():
    db = get_db()

    # Get query parameters for sorting, pagination, and filtering
    sort_by = request.args.get('sort_by', 'price_per_night')  # Default sort by price_per_night
    sort_order = int(request.args.get('sort_order', 1))  # Default sort order ascending
    page = int(request.args.get('page', 1))  # Default page 1
    per_page = int(request.args.get('per_page', 10))  # Default 10 properties per page
    title_filter = request.args.get('title', '')
    property_type_filter = request.args.get('property_type', '')
    location_filter = request.args.get('location', '')

    # Prepare the filter query based on the provided parameters
    filter_query = {}
    if title_filter:
        filter_query['title'] = {'$regex': title_filter, '$options': 'i'}  # Case-insensitive title filter
    if property_type_filter:
        filter_query['property_type'] = property_type_filter
    if location_filter:
        filter_query['location'] = location_filter

    # Get total number of properties matching the filter criteria
    total_properties = db.properties.count_documents(filter_query)

    # Calculate the total number of pages based on the number of properties and properties per page
    total_pages = (total_properties - 1) // per_page + 1

    # Ensure that the page number is within valid range
    if page < 1:
        page = 1
    elif page > total_pages:
        page = total_pages

    # Calculate the skip and limit values for pagination
    skip = (page - 1) * per_page
    limit = per_page

    # Fetch properties based on the filter and pagination parameters
    properties = db.properties.find(filter_query).sort(sort_by, sort_order).skip(skip).limit(limit)

    # Convert the properties to a list of dictionaries
    res = []
    for property in properties:
        res.append({
            "id": str(property["_id"]),
            "title": str(property['title']),
            "host_id": str(property['host_id']),
            "location": str(property['location']),
            "property_type": str(property['property_type']),
            "description": str(property['description']),
            "price_per_night": str(property['price_per_night']),
            "status": str(property['status']),
            "img": str(property['img'])  # Add the 'img' field to the response
        })

    # Return the paginated and filtered properties
    return jsonify(res)


@app.route("/api/properties/<string:property_id>", methods=["GET"])
def get_property(property_id):
    db = get_db()
    property = db.properties.find_one({"_id": ObjectId(property_id)})
    if property:
        res = {
            "id": str(property["_id"]),
            "title": str(property["title"]),
            "host_id": str(property["host_id"]),
            "location": str(property["location"]),
            "property_type": str(property["property_type"]),
            "description": str(property["description"]),
            "price_per_night": str(property["price_per_night"]),
            "status": bool(property["status"]),
            "img": str(property["img"])  # Add the 'img' field to the response
        }
        return jsonify(res)
    return jsonify({"message": "Property not found"}), 404

@app.route("/api/properties", methods=["POST"])
def create_property():
    if not is_host_authenticated():
        return jsonify({"error": "Unauthorized"}), 401

    db = get_db()
    data = request.get_json()
    property = Property(
        host_id=data["host_id"],
        title=data["title"],
        location=data["location"],
        property_type=data["property_type"],
        description=data["description"],
        price_per_night=data["price_per_night"],
        status=data["status"],
        img=data["img"]  # Add the 'img' field to the new Property object
    )
    db.properties.insert_one(property.__dict__)
    return jsonify({"message": "Property created successfully"}), 201


@app.route("/api/properties/<string:property_id>", methods=["PUT"])
def update_property(property_id):
    if not is_host_authenticated():
        return jsonify({"error": "Unauthorized"}), 401

    db = get_db()
    data = request.get_json()
    db.properties.update_one({"_id": ObjectId(property_id)}, {"$set": data})
    return jsonify({"message": "Property updated successfully"})

@app.route("/api/properties/<string:property_id>", methods=["DELETE"])
def delete_property(property_id):
    if not is_host_authenticated():
        return jsonify({"error": "Unauthorized"}), 401

    db = get_db()
    result = db.properties.delete_one({"_id": ObjectId(property_id)})
    if result.deleted_count > 0:
        return jsonify({"message": "Property deleted successfully"})
    return jsonify({"message": "Property not found"}), 404

# booking 
@app.route("/api/properties/book", methods=["POST"])
def post_property_to_book_collection():
    # Check if the user is authenticated as a guest
    if not is_guest_authenticated():
        return jsonify({"error": "Unauthorized"}), 401

    db = get_db()
    data = request.get_json()
    book_id = db.book.insert_one(data).inserted_id
    property_id = data.get('property_id')
    if property_id:
        db.properties.update_one({"_id": ObjectId(property_id)}, {"$set": {"status": False}})

    return jsonify({"book_id": str(book_id)}), 201

@app.route("/api/properties/book/<string:book_id>", methods=["DELETE"])
def delete_property_from_book_collection(book_id):
    if not is_guest_authenticated():
        return jsonify({"error": "Unauthorized"}), 401

    db = get_db()
    result = db.book.delete_one({"_id": ObjectId(book_id)})
    if result.deleted_count > 0:
        return jsonify({"message": "Property data deleted from book collection successfully"})
    return jsonify({"message": "Property data not found in book collection"}), 404

@app.route("/api/properties/book", methods=["GET"])
def get_all_book_data():
    db = get_db()
    book_data = db.book.find()
    res = []
    for book_entry in book_data:
        res.append({
            "book_id": str(book_entry["_id"]),
            "property_id": str(book_entry.get("property_id")),
        })
    return jsonify(res)

@app.route("/api/properties/book/<string:book_id>", methods=["GET"])
def get_book_data(book_id):
    db = get_db()
    book_entry = db.book.find_one({"_id": ObjectId(book_id)})
    if book_entry:
        res = {
            "book_id": str(book_entry["_id"]),
            "property_id": str(book_entry.get("property_id")),
        }
        return jsonify(res)
    return jsonify({"message": "Book data not found"}), 404


if __name__ == '__main__':
    app.run(debug=True)