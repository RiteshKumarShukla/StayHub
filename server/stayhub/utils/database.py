from pymongo import MongoClient
from stayhub.utils import config

# Connect to your MongoDB Atlas cluster
client = MongoClient(config.MONGODB_URI)
db = client[config.MONGODB_NAME]

# Create collections for entities
hosts_collection = db["hosts"]
properties_collection = db["properties"]
guests_collection = db["guests"]
bookings_collection = db["bookings"]
