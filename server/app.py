from flask import Flask
from stayhub.routes.host_routes import host_routes

app = Flask(__name__)
app.config["DEBUG"] = True
app.register_blueprint(host_routes)

if __name__ == '__main__':
    app.run()
