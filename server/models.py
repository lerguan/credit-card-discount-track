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
    stores = association_proxy('credit_cards', 'store', creator=lambda sr:CreditCard(store=sr))

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
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    store_id = db.Column(db.Integer, db.ForeignKey('stores.id'))

    def __repr__(self):
        return f'<CreditCard {self.card_name}>'
    
class Store(db.Model, SerializerMixin):
    __tablename__ = 'stores'

    id = db.Column(db.Integer, primary_key=True)
    store_name = db.Column(db.String, nullable=False)
    discount = db.Column(db.String)
    expire_date = db.Column(db.DateTime)

    credit_cards = db.relationship('CreditCard', backref='store')
    users = association_proxy('credit_cards', 'user', creator=lambda ur:CreditCard(ur))

    def __repr__(self):
        return f'<Store {self.store_name} has {self.discount} on {self.credit_cards} expires on {self.expire_date}> '





