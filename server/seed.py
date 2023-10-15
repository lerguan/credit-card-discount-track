#!/usr/bin/env python3

# Standard library imports

# from random import randint, choice as rc
import random as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Store, CreditCard

if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Deleting all records...")
        User.query.delete()
        Store.query.delete()
        CreditCard.query.delete()

        print("Starting seed...")

        users = []
        emails = []
        for i in range(20):
            email = fake.email()
            while email in emails:
                emails = fake.email()
            emails.append(email)
            user = User(
                email=email,
            )
            user.password_hash = user.email + "password"
            db.session.add(user)
            db.session.commit()
            users.append(user)

        stores = []
        discounts = [
            "5%",
            "10%",
            "15%",
            "20%",
            "25%",
            "30%",
            "40%",
            "50%",
            "$5 off",
            "$10 off",
            "$15 off",
            "$20 off",
            "$25 off",
            "BOGO",
        ]
        for i in range(20):
            store_name = fake.unique.company()
            expire_date = fake.date()
            store = Store(
                store_name=store_name,
                discount=rc.choice(discounts),
                expire_date=expire_date,
            )
            db.session.add(store)
            db.session.commit()
            stores.append(store)

        credit_cards = []
        credit_card_list = [
            "The Platinum Card from American Express",
            "Gold Card from American Express",
            "Blue Cash Preferred Card from American Express",
            "Discover it Cash Back",
            "Discover it Miles",
            "Discover it Student Cash Back",
            "Chase Sapphire Preferred Card",
            "Chase Sapphire Reserve",
            "Chase Freedom Flex",
            "Chase Freedom Unlimited",
            "Chase Ink Business Preferred",
            "Bank of America Cash Rewards Credit Card",
            "BankAmericard Credit Card",
            "Alaska Airlines Visa Signature Card",
            "Citi Premier Card",
            "Citi Rewards+ Card",
            "Costco Anywhere Visa Card by Citi",
            "Capital One Venture Rewards Credit Card",
            "Capital One Spark Business Cards (for small businesses)",
        ]
        for store in stores:
            for i in range(rc.randint(1, 5)):
                credit_card = rc.choice(credit_card_list)
                if store not in credit_card.stores:
                    credit_card.stores.append(store)
                    db.session.add(credit_card)
                    db.session.commit()

                credit_card_obj = CreditCard(
                    card_name=rc.choice(credit_card_list),
                    user_id=user.id,
                )
                credit_cards.append(credit_card_obj)

        db.session.bulk_save_objects(credit_cards)
        db.session.commit()
        db.session.close()
