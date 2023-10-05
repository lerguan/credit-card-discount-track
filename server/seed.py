#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Store, CreditCard

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print('Deleting all records...')
        User.query.delete()
        Store.query.delete()
        CreditCard.query.delete()

        print("Starting seed...")

        credit_card_companies = [
            {
                "Company": "American Express",
                "Cards": [
                    "The Platinum Card from American Express",
                    "Gold Card from American Express",
                    "Blue Cash Preferred Card from American Express",
                    "Delta SkyMiles Credit Cards",
                    "Hilton Honors Credit Cards",
                ],
            },
            {
                "Company": "Visa",
                "Cards": [
                    "Visa offers a wide range of credit cards, including travel rewards cards, cashback cards, and co-branded cards with various banks.",
                ],
            },
            {
                "Company": "Mastercard",
                "Cards": [
                    "Similar to Visa, Mastercard provides a variety of credit card options, including rewards cards, cashback cards, and co-branded cards.",
                ],
            },
            {
                "Company": "Discover",
                "Cards": [
                    "Discover it Cash Back",
                    "Discover it Miles",
                    "Discover it Student Cash Back",
                    "Discover it Secured",
                ],
            },
            {
                "Company": "Chase",
                "Cards": [
                    "Chase Sapphire Preferred Card",
                    "Chase Sapphire Reserve",
                    "Chase Freedom Flex",
                    "Chase Freedom Unlimited",
                    "Chase Ink Business Preferred",
                ],
            },
            {
                "Company": "Bank of America",
                "Cards": [
                    "Bank of America Cash Rewards Credit Card",
                    "Bank of America Travel Rewards Credit Card",
                    "BankAmericard Credit Card",
                    "Alaska Airlines Visa Signature Card",
                ],
            },
            {
                "Company": "Citi",
                "Cards": [
                    "Citi Double Cash Card",
                    "Citi Premier Card",
                    "Citi Rewards+ Card",
                    "Costco Anywhere Visa Card by Citi",
                ],
            },
            {
                "Company": "Capital One",
                "Cards": [
                    "Capital One Venture Rewards Credit Card",
                    "Capital One Quicksilver Cash Rewards Credit Card",
                    "Capital One Savor Cash Rewards Credit Card",
                    "Capital One Spark Business Cards (for small businesses)",
                ],
            },
        ]


        users=[]
        emails=[]
        for i in range(10):
            email = fake.email()
            while email in emails:
                emails = fake.email()
            emails.append(email)
            user = User(email = email,
                        )
            user.password_hash = user.email + 'password'
            users.append(user)
            db.session.add(user)
            db.seesion.commit()
        
        stores=[]
        discounts = ['5%', '10%', '15%', '20%', '25%', '30%', '40%', '50%', '$5 off', '$10 off', '$15 off', '$20 off', '$25 off', 'BOGO']
        for i in range(20):
            store_name = fake.commerce.unique.name()
            store = Store(
                store_name=store_name,
                discount=rc.choice(discounts),
            )
            stores.append(store)
            db.session.add(store)
            db.session.commit()


        credit_cards=[]
        for user in users:
            for i in range(rc.randint(1,5)):
                store=rc.choice(stores)
                if user not in store.users:
                    store.users.append(user)
                    db.session.add(store)
                    db.session.commit()

                credit_card = CreditCard(
                    cc_name=rc.choice([value for key, value in credit_card_companies])
                    user_id=user.id,
                    store_id=store.id
                )
                credit_cards.append(credit_card)


    db.session.bulk_save_objects(credit_cards)
    db.session.commit()
    db.session.close()


        
