from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mySecretKey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ChatApp.db'
db = SQLAlchemy(app)
socketio = SocketIO(app)
ROOMS = ['chat']


from chatapp.models import User
from chatapp import routes

login_manager = LoginManager()
login_manager.login_view = 'login'
login_manager.init_app(app)


@login_manager.user_loader
def load(id):
    return User.query.get(int(id))


