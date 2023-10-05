#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print('Deleting all records...')
        User.query.delete()

        print("Starting seed...")

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

        db.session.add_all(users)

        db.session.commit()


        
