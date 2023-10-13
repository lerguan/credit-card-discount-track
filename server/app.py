#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, jsonify, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api

# Add your model imports
from models import User, CreditCard, Store, stores_credit_cards


class Signup(Resource):
    def get(self):
        if session.get("user_id"):
            user = User.query.filter(User.id == session["user_id"]).first()
            return make_response(jsonify(user.to_dict()), 200)
        return {"error": "401 Unauthorized"}, 401

    def post(self):
        request_json = request.get_json()
        email = request_json.get("email")
        password = request_json.get("password")

        user = User(
            email=email,
        )

        user.password_hash = password

        try:
            db.session.add(user)
            db.session.commit()

            session["user_id"] = user.id

            return make_response(jsonify(user.to_dict()), 201)

        except IntegrityError:
            return {"error": "422 Unprocessable Entity"}, 422


class CheckSession(Resource):
    def get(self):
        if session.get("user_id"):
            user = User.query.filter(User.id == session["user_id"]).first()
            return make_response(jsonify(user.to_dict()), 200)
        return {"error": "401 Unauthorized"}, 401


class Login(Resource):
    def post(self):
        request_json = request.get_json()
        email = request_json.get("email")
        password = request_json.get("password")

        user = User.query.filter(User.email == email).first()

        if user:
            if user.authenticate(password):
                session["user_id"] = user.id
                db.session.add(user)
                db.session.commit()
                return make_response(jsonify(user.to_dict()), 200)

        return {"error": "401 Unauthoerized"}, 401


class Logout(Resource):
    def delete(self):
        if session.get("user_id"):
            session["user_id"] = None
            return {}, 204

        return {"error": "401 Unauthorized"}, 401


class CreditCards(Resource):
    def get(self):
        credit_cards = [credit_card.to_dict() for credit_card in CreditCard.query.all()]
        if credit_cards:
            return make_response(credit_cards, 200)
        return {}, 404

    def post(self):
        data = request.get_json()
        new_credit_card = CreditCard(
            card_name=data["card_name"], user_id=session.get("user_id")
        )
        db.session.add(new_credit_card)
        db.session.commit()

        return make_response(new_credit_card.to_dict(), 201)


class CreditCardByID(Resource):
    def get(self, id):
        credit_card = CreditCard.query.filter(CreditCard.id == id).first().to_dict()
        return make_response(jsonify(credit_card), 200)

    def patch(self, id):
        data = request.get_json()
        credit_card = CreditCard.query.filter(CreditCard.id == id).first()

        for attr in data:
            setattr(credit_card, attr, data[attr])
        db.session.add(credit_card)
        db.session.commit()

        return make_response(jsonify(credit_card.to_dict()), 200)

    def delete(self, id):
        credit_card = CreditCard.query.filter(CreditCard.id == id).first()
        db.session.delete(credit_card)
        db.session.commit()

        return make_response("", 204)


class Stores(Resource):
    def get(self):
        stores = [store.to_dict() for store in Store.query.all()]
        if stores:
            return make_response(jsonify(stores), 200)
        return {}, 404

    def post(self):
        data = request.get_json()
        new_store = Store(
            store_name=data["store_name"],
            discount=data["discount"],
            expire_date=data["expire_date"],
        )
        db.session.add(new_store)
        db.session.commit()
        return make_response(new_store.to_dict(), 201)


class StoresByCCID(Resource):
    def get(self, credit_card_id):
        stores = [store.to_dict() for store in Store.query.all()]
        credit_card = CreditCard.query.filter(CreditCard.id == credit_card_id).first()
        if credit_card:
            return make_response(jsonify(credit_card.to_dict()), 200)
        return {}, 404

    def post(self, credit_card_id):
        data = request.get_json()
        new_store = Store(
            store_name=data["store_name"],
            discount=data["discount"],
            expire_date=data["expire_date"],
        )
        db.session.add(new_store)
        db.session.commit()
        store_credit_card = stores_credit_cards.insert().values(
            store_id=new_store.id,
            credit_card_id=credit_card_id,
        )
        db.session.execute(store_credit_card)
        db.session.commit()
        return make_response(new_store.to_dict(), 201)


class StoreByID(Resource):
    def get(self, id):
        store = Store.query.filter(Store.id == id).first()
        if store:
            return make_response(jsonify(store.to_dict()), 200)

    def patch(self, id):
        data = request.get_json()
        store = Store.query.filter(Store.id == id).first()
        for attr in data:
            setattr(store, attr, data[attr])
        db.session.add(store)
        db.session.commit()

        return make_response(jsonify(store.to_dict()), 200)

    def delete(self, id):
        store = Store.query.filter((Store.id == id)).first()
        if store:
            db.session.delete(store)
            db.session.commit()
            return make_response("", 204)


api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(CheckSession, "/checksession", endpoint="checksession")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Logout, "/logout", endpoint="logout")
api.add_resource(CreditCards, "/credit_cards", endpoint="credit_cards")
api.add_resource(
    CreditCardByID, "/credit_cards/<int:id>", endpoint="/credit_cards/<int:id>"
)
api.add_resource(Stores, "/stores", endpoint="stores")
api.add_resource(
    StoreByID,
    "/stores/<int:id>",
    endpoint="/stores/<int:id>",
)
api.add_resource(
    StoresByCCID,
    "/stores/<int:credit_card_id>",
    endpoint="/stores/<int:credit_card_id>",
)

if __name__ == "__main__":
    app.run(port=5555, debug=True)
