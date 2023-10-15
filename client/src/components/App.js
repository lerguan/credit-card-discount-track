import React, { useEffect, useState, useSyncExternalStore } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import Stores from "../pages/Stores";
import CardList from "../pages/CardList";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [userCreditCards, setUserCreditCards] = useState(null);
  const [displayForm, setDisplayForm] = useState(false);
  const [card_name, setCard_name] = useState("");

  useEffect(() => {
    fetch("/checksession").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => {
          setUser(user);
          setUserCreditCards(user.credit_cards);
        });
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  const handleDeleteCreditCard = (id) => {
    const newUserCardArray = userCreditCards.filter((userCreditCard) => userCreditCard.id !== id);
    setUserCreditCards(newUserCardArray);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/credit_cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        card_name: card_name,
        user_id: user.id,
      }),
    })
      .then((resp) => resp.json())
      .then((newCreditCard) => {
        setDisplayForm(!displayForm);
        const newUserCardArray = [...userCreditCards, newCreditCard];
        setUserCreditCards(newUserCardArray);
      });
  };

  const handleAddStoreToCreditCard = (newStoreCreditCard) => {
    const newUserCreditCard = newStoreCreditCard[0];
    const newUserCardArray = userCreditCards.map((userCreditCard) =>
      newUserCreditCard.id === userCreditCard.id ? newUserCreditCard : userCreditCard
    );
    setUserCreditCards(newUserCardArray);
  };

  const handleDeletStore = (id) => {
    const newUserCardArray = userCreditCards.map((userCreditCard) => {
      if (userCreditCard.stores) {
        userCreditCard.stores = userCreditCard.stores.filter((store) => store.id !== id);
      }
      return userCreditCard;
    });
    setUserCreditCards(newUserCardArray);
  };

  const handleEditStoreDiscount = (newStoreDiscount) => {
    const newUserCreditCard = newStoreDiscount[0];
    const newUserCardArray = userCreditCards.map((userCreditCard) =>
      userCreditCard.id === newUserCreditCard.id ? newUserCreditCard : userCreditCard
    );
    setUserCreditCards(newUserCardArray);
  };

  return (
    <BrowserRouter>
      <NavBar user={user} setUser={setUser} />
      <Switch>
        <Route path="/creditcards">
          <CardList
            userCreditCards={userCreditCards}
            onDeleteCreditCard={handleDeleteCreditCard}
            onAddStoreToCreditCard={handleAddStoreToCreditCard}
          />
          <div>
            {displayForm ? (
              <div className={"visible"}>
                <form onSubmit={handleSubmit}>
                  <label>
                    Input Credit Card Name:
                    <input
                      type="text"
                      name="card_name"
                      placeholder="Credit Card Name"
                      value={card_name}
                      onChange={(e) => setCard_name(e.target.value)}
                    />
                    <button type="submit">Add</button>
                  </label>
                </form>
              </div>
            ) : (
              <div className={"invisible"}></div>
            )}
            <button onClick={() => setDisplayForm(!displayForm)}>Add New Credit Card</button>
          </div>
        </Route>
        <Route exact path="/stores">
          <Stores
            userCreditCards={userCreditCards}
            onDeleteStore={handleDeletStore}
            onEditStoreDiscount={handleEditStoreDiscount}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
