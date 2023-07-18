from stayhub.utils.database import db

class Host:
   class Host:
    def __init__(self, name, hostStatus, location, propertyType, about, hostingSince):
        self.name = name
        self.hostStatus = hostStatus
        self.location = location
        self.propertyType = propertyType
        self.about = about
        self.hostingSince = hostingSince


    def save(self):
        host_id = db.hosts.insert_one(self.to_dict()).inserted_id
        return str(host_id)

    def update(self, host_data):
        db.hosts.update_one({"_id": self._id}, {"$set": host_data})

    def delete(self):
        db.hosts.delete_one({"_id": self._id})

    def to_dict(self):
        return {
            "_id": str(self._id),
            "name": self.name,
            "hostStatus": self.host_status,
            "location": self.location,
            "propertyType": self.property_type,
            "about": self.about,
            "hostingSince": self.hosting_since
        }

    @staticmethod
    def get_all():
        return [Host(**host) for host in db.hosts.find()]

    @staticmethod
    def get_by_id(host_id):
        host = db.hosts.find_one({"_id": ObjectId(host_id)})
        if host:
            return Host(**host)
        return None

    @staticmethod
    def create(host_data):
        host = Host(**host_data)
        host_id = host.save()
        host._id = ObjectId(host_id)
        return host
