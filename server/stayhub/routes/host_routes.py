from flask import Blueprint, request, jsonify
from stayhub.controllers.host_controller import HostController

host_routes = Blueprint("host_routes", __name__)
host_controller = HostController()

@host_routes.route('/api/hosts', methods=['GET'])
def get_hosts():
    hosts = host_controller.get_all_hosts()
    return jsonify(hosts)

@host_routes.route('/api/hosts/<host_id>', methods=['GET'])
def get_host(host_id):
    host = host_controller.get_host_by_id(host_id)
    if host:
        return jsonify(host)
    return jsonify({"error": "Host not found"}), 404

@host_routes.route('/api/hosts', methods=['POST'])
def create_host():
    host_data = request.get_json()
    host = host_controller.create_host(host_data)
    return jsonify(host), 201

@host_routes.route('/api/hosts/<host_id>', methods=['PUT'])
def update_host(host_id):
    host_data = request.get_json()
    host = host_controller.update_host(host_id, host_data)
    if host:
        return jsonify(host)
    return jsonify({"error": "Host not found"}), 404

@host_routes.route('/api/hosts/<host_id>', methods=['DELETE'])
def delete_host(host_id):
    success = host_controller.delete_host(host_id)
    if success:
        return jsonify({"message": "Host deleted successfully"})
    return jsonify({"error": "Host not found"}), 404
