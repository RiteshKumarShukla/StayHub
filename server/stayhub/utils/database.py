from pymongo import MongoClient

# Connect to your MongoDB server
client = MongoClient("mongodb://localhost:27017/")
db = client.vacation_rental_db
