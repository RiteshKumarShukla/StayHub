from flask import Flask, request, jsonify, session
from pymongo import MongoClient
from flask_cors import CORS 
from bson.objectid import ObjectId
import bcrypt
import openai
import os
api_key = os.environ.get('API_KEY')

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



# Booking model class
class Booking:
    def __init__(self,img, title, price_per_night, location,property_type, description):
        self._id = ObjectId()
        self.title = title
        self.img = img
        self.property_type = property_type
        self.description = description
        self.price_per_night = price_per_night
        self.location = location

# Property model class
class Property:
    def __init__(self, title, location, status, property_type, description, price_per_night, img):
        self._id = ObjectId()
        # self.host_id = host_id
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
            # "host_id": str(property['host_id']),
            "location": str(property['location']),
            "property_type": str(property['property_type']),
            "description": str(property['description']),
            "price_per_night": str(property['price_per_night']),
            "status": bool(property['status']),
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
            # "host_id": str(property["host_id"]),
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

    db = get_db()
    data = request.get_json()
    property = Property(
        # host_id=data["host_id"],
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


    db = get_db()
    data = request.get_json()
    db.properties.update_one({"_id": ObjectId(property_id)}, {"$set": data})
    return jsonify({"message": "Property updated successfully"})

@app.route("/api/properties/<string:property_id>", methods=["DELETE"])
def delete_property(property_id):

    db = get_db()
    result = db.properties.delete_one({"_id": ObjectId(property_id)})
    if result.deleted_count > 0:
        return jsonify({"message": "Property deleted successfully"})
    return jsonify({"message": "Property not found"}), 404

@app.route("/api/properties/book", methods=["POST"])
def post_property_to_book_collection():
    db = get_db()
    data = request.get_json()
    
    # Extract booking data from the request body
    title = data.get('title')
    price_per_night = data.get('price_per_night')
    location = data.get('location')
    img = data.get('img')
    description = data.get('description')
    property_type = data.get('property_type')

    # Create a new Booking object
    booking = Booking(
        title=title,
        price_per_night=price_per_night,
        location=location,
        img = img,
        description= description,
        property_type= property_type

    )

    booking_id = db.book.insert_one(booking.__dict__).inserted_id

    return jsonify({"booking_id": str(booking_id), "title":str(title) , "img":str(img) , "description":str(description),"price_per_night":str(price_per_night), "property_type":str(property_type)}), 201

# Route to get all booking data
@app.route("/api/properties/book", methods=["GET"])
def get_all_book_data():
    db = get_db()
    book_data = db.book.find()
    res = []
    for book_entry in book_data:
        res.append({
            "booking_id": str(book_entry["_id"]),
            "title": str(book_entry.get("title")),
            "price_per_night": str(book_entry.get("price_per_night")),
            "img":str(book_entry.get("img")),
            "description":str(book_entry.get("description")),
            "location": str(book_entry.get("location")),
        })
    return jsonify(res)

# Route to get a single booking data by booking ID
@app.route("/api/properties/book/<string:booking_id>", methods=["GET"])
def get_book_data(booking_id):
    db = get_db()
    book_entry = db.book.find_one({"_id": ObjectId(booking_id)})
    if book_entry:
        res = {
            "booking_id": str(book_entry["_id"]),
            "property_id": str(book_entry.get("property_id")),
            "title": str(book_entry.get("title")),
            "img":str(book_entry.get("img")),
            "price_per_night": str(book_entry.get("price_per_night")),
            "location": str(book_entry.get("location")),
            "book_date": str(book_entry.get("book_date")),
            "end_date": str(book_entry.get("end_date"))
        }
        return jsonify(res)
    return jsonify({"message": "Booking data not found"}), 404

# Route to delete a booking data by booking ID
@app.route("/api/properties/book/<string:booking_id>", methods=["DELETE"])
def delete_book_data(booking_id):
    db = get_db()
    result = db.book.delete_one({"_id": ObjectId(booking_id)})
    if result.deleted_count > 0:
        return jsonify({"message": "Booking data deleted successfully"})
    return jsonify({"message": "Booking data not found"}), 404



# chatBot
openai.api_key = api_key

def has_hotel_booking_keywords(text):
    keywords = ['hotel', 'booking', 'room', 'reservation', 'check-in', 'check-out']
    return any(keyword in text.lower() for keyword in keywords)

@app.route('/api/chat', methods=['POST'])
def get_chatbot_response():
    try:
        user_message = request.json['prompt']
        # Add a greeting message at the beginning of the conversation
        chatbot_response = "Hello! I'm your hotel booking assistant. How can I assist you today? " + user_message
        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=chatbot_response,
            max_tokens=150,
            temperature=0.7
        )
        chatbot_response = response['choices'][0]['text'].strip()

        # Filter the response to include only relevant information
        if not has_hotel_booking_keywords(chatbot_response):
            # Generate a response relevant to the topic even for non-relevant questions
            response = openai.Completion.create(
                engine="text-davinci-002",
                prompt="Hotel booking",
                max_tokens=150,
                temperature=0.7
            )
            chatbot_response = response['choices'][0]['text'].strip()

        return jsonify({'text': chatbot_response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)