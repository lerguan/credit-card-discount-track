# Credit Card Discount Tracker

## Introduction

Nowadays, there are many credit cards offer various discount when shoping online or local retail stores. However, with this many credit cards and dicounts, people are easily lost track what credit cards offer discounts when shopping at a store. This full-stack application is used for users to track their credit card discounts on retail stores. Users need to create an account use their email and then users can store their credit cards in their account and start adding discount on retail stores. When shopping a store, user can see which credit card they have offer discounts.

The `client` folder contains a React application for the frontend, while the `server`
folder contains a Flask application for the backend.

A `migrations` folder will be added to the `server` directory when a developer would like create the database.

## Setup

### `server/`

To download the dependencies for the backend server, run:

```console
pipenv install
pipenv shell
```

The Flask API can start on [`localhost:5555`](http://localhost:5555) by
running:

```console
python server/app.py
```

### `client/`

To download the dependencies for the frontend client, run:

```console
npm install --prefix client
```

The React app can start on [`localhost:3000`](http://localhost:3000) by
running:

```sh
npm start --prefix client
```

## Generating Database

Change into the `server` directory amd update the migration:

```console
cd server
flask db upgrade
```

There is a `seed.py` file that can populate the database with some fake data.

---
