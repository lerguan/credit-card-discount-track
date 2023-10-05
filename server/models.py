from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-credit_cards.user', '-_password_hash',)

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    credit_cards = db.relationship('Creditcard', backref='user')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'<User {self.email}>'

class CreditCard(db.Model, SerializerMixin):
    __tablename__ = 'credit_cards'

    id = db.Column(db.Integer, primary_key=True)
    card_name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, foreign_key='users.id')

    stores = db.relationship('Store', secondary=cc_store, backref='credit_cards')

    def __repr__(self):
        return f'<CreditCard {self.card_name}>'


