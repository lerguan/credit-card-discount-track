from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

stores_credit_cards = db.Table(
    "stores_credit_cards",
    db.Column("store_id", db.Integer, db.ForeignKey("stores.id")),
    db.Column("credit_card_id", db.Integer, db.ForeignKey("credit_cards.id")),
)


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = (
        "-credit_cards.user",
        "-_password_hash",
    )

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    credit_cards = db.relationship("CreditCard", back_populates="user")
    # stores = association_proxy('credit_cards', 'store', creator=lambda sr:CreditCard(store=sr))

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

    def __repr__(self):
        return f"<User {self.email}>"


class Store(db.Model, SerializerMixin):
    __tablename__ = "stores"
    serialize_rules = ("-cardit_cards.stores",)

    id = db.Column(db.Integer, primary_key=True)
    store_name = db.Column(db.String)
    discount = db.Column(db.String)
    expire_date = db.Column(db.String)

    credit_cards = db.relationship(
        "CreditCard", secondary=stores_credit_cards, back_populates="stores"
    )
    # users = association_proxy('credit_cards', 'user', creator=lambda ur:CreditCard(ur))

    def __repr__(self):
        return f"<Store {self.store_name} has {self.discount} on {self.credit_cards} expires on {self.expire_date}> "


class CreditCard(db.Model, SerializerMixin):
    __tablename__ = "credit_cards"
    serialize_rules = ("-user.credit_cards", "-stores.credit_cards")

    id = db.Column(db.Integer, primary_key=True)
    card_name = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    # store_id = db.Column(db.Integer, db.ForeignKey("stores.id"))

    user = db.relationship("User", back_populates="credit_cards")
    stores = db.relationship(
        "Store", secondary=stores_credit_cards, back_populates="credit_cards"
    )

    def __repr__(self):
        return f"<CreditCard {self.card_name}>"


Store.credit_card_names = association_proxy("credit_cards", "card_name")
CreditCard.store_names = association_proxy("stores", "store_name")
