# Credit Card Discount Tracker

## Introduction

Nowadays, there are many credit cards offer various discount when shopping online or local retail stores. However, with this many credit cards and discounts, people are easily lost track what credit cards offer discounts when shopping at a store. This full-stack application is used for users to track their credit card discounts on retail stores. Users need to create an account use their email and then users can store their credit cards in their account and start adding discount on retail stores. When shopping a store, user can see which credit card they have offer discounts.

The `client` folder contains a React application for the frontend, while the `server` folder contains a Flask application for the backend.

A `migrations` folder will be added to the `server` directory when a developer would like create the database.

## Setup

### `server/`

The `config.py` includes
To download the dependencies for the backend server, run the following code from the root of the repository:

```console
pipenv install
pipenv shell
```

The Flask API can start on [`localhost:5555`](http://localhost:5555) by running:

```console
python server/app.py
```

### Generating Database

Change into the `server` directory and update the migration:

```console
cd server
flask db upgrade
```

There is a `seed.py` file that can populate the database with some fake data.

### `client/`

To download the dependencies for the frontend client, run:

```console
npm install --prefix client
```

The React app can start on [`localhost:3000`](http://localhost:3000) by running:

```sh
npm start --prefix client
```

---

## Use

Once the frontend page is loaded, it will allow the user to login with email address and password if the user has registered an account before. Or user can sign up after click the signup button.

After user login, the page gives user three tabs with `Credit Cards`, `Stores` and `Logout`.

- `Credit Cards` tab: User can see the credit cards owned. Each credit card has buttons that let user review the discount information and add new discount information, as well as remove the credit card from the list. User can also add new credit card by click the button at the bottom of the page.
- `Stores` tab: User can see the list of stores and their discount information, including the discounts, expire date and name of the credit card, that user added to their credit card. For each store, user can edit the discount information and remove the store.
- `Logout` tab: User logout their account and the page will show the original login/signup page.
