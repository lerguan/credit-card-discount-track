import React, { useEffect, useState, useSyncExternalStore } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import Stores from "../pages/Stores";
import NewDiscount from "../pages/NewDiscount";
import CardList from "../pages/CardList";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [userCards, setUserCards] = useState(null);
  useEffect(() => {
    fetch("/checksession").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => {
          setUser(user);
          setUserCards(user.credit_cards);
        });
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  const handleDeleteCreditCard = (id) => {
    const newUserCardArray = userCards.filter((id) => id !== id);
    setUserCards(newUserCardArray);
  };

  // const handleAddCardDiscount = (newDiscount) {
  //   const newCardDiscountArray = [...useSyncExternalStore, newDiscount]
  //   set
  // }

  return (
    <BrowserRouter>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route exact path="/new">
            {/* <NewDiscount user={user} onAddCardDiscount={handleAddCardDiscount} /> */}
          </Route>
          <Route exact path="/stores">
            <Stores
            // user={user}
            // credit_cards={credit_cards}
            // onDeleteDiscount={onDeleteDiscount}
            // onDisplayDiscounts={onDisplayDiscounts}
            />
          </Route>
          <Route exact path="/">
            <CardList userCreditCards={userCards} onDeleteCreditCard={handleDeleteCreditCard} />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
