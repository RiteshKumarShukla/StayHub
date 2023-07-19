from stayhub.models.host import Host

class HostController:
    def get_all_hosts(self):
        hosts = Host.get_all()
        return [host.to_dict() for host in hosts]

    def get_host(self, host_id):
        host = Host.get_by_id(host_id)
        if host:
            return host.to_dict()
        return None

    def create_host(self, host_data):
        host = Host(host_id=None, **host_data)
        host.save()
        return host.to_dict()

    def update_host(self, host_id, host_data):
        host = Host.get_by_id(host_id)
        if host:
            host.update(host_data)
            return host.to_dict()
        return None

    def delete_host(self, host_id):
        host = Host.get_by_id(host_id)
        if host:
            host.delete()
            return True
        return False
