from stayhub.models.host import Host

class HostController:
    def get_all_hosts(self):
        try:
            hosts = Host.get_all()
            return [host.to_dict() for host in hosts], 200
        except Exception as e:
            return {"error": str(e)}, 500

    def get_host_by_id(self, host_id):
        try:
            host = Host.get_by_id(host_id)
            if host:
                return host.to_dict(), 200
            return {"error": "Host not found"}, 404
        except Exception as e:
            return {"error": str(e)}, 500

    def create_host(self, host_data):
        try:
            host = Host.create(host_data)
            return host.to_dict(), 201
        except Exception as e:
            return {"error": str(e)}, 500

    def update_host(self, host_id, host_data):
        try:
            host = Host.get_by_id(host_id)
            if host:
                host.update(host_data)
                return host.to_dict(), 200
            return {"error": "Host not found"}, 404
        except Exception as e:
            return {"error": str(e)}, 500

    def delete_host(self, host_id):
        try:
            host = Host.get_by_id(host_id)
            if host:
                host.delete()
                return {"message": "Host deleted successfully"}, 200
            return {"error": "Host not found"}, 404
        except Exception as e:
            return {"error": str(e)}, 500
