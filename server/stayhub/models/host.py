from stayhub.utils.database import hosts_collection

class Host:
    def __init__(self, host_id, name, host_status, location, property_type, about, hosting_since):
        self.host_id = host_id
        self.name = name
        self.host_status = host_status
        self.location = location
        self.property_type = property_type
        self.about = about
        self.hosting_since = hosting_since

    def save(self):
        host_id = hosts_collection.insert_one(self.to_dict()).inserted_id
        self.host_id = str(host_id)

    def update(self, host_data):
        hosts_collection.update_one({"_id": self.host_id}, {"$set": host_data})

    def delete(self):
        hosts_collection.delete_one({"_id": self.host_id})

    def to_dict(self):
        return {
            "_id": self.host_id,
            "name": self.name,
            "hostStatus": self.host_status,
            "location": self.location,
            "propertyType": self.property_type,
            "about": self.about,
            "hostingSince": self.hosting_since
        }

    @staticmethod
    def get_all():
        hosts = hosts_collection.find()
        return [Host(str(host["_id"]), host["name"], host["hostStatus"], host["location"], host["propertyType"], host["about"], host["hostingSince"]) for host in hosts]

    @staticmethod
    def get_by_id(host_id):
        host = hosts_collection.find_one({"_id": host_id})
        if host:
            return Host(str(host["_id"]), host["name"], host["hostStatus"], host["location"], host["propertyType"], host["about"], host["hostingSince"])
        return None
