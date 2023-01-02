from flask_login import UserMixin
from chatapp import db

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = email = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)
    chats = db.relationship('Chats', backref='sender', lazy=True)


class Chats(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)