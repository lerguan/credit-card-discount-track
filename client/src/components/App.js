import React, { useEffect, useState, useSyncExternalStore } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Login from "../pages/Login";
import Stores from "../pages/Stores";
import CardDiscount from "../pages/CardDiscount";
import NewDiscount from "../pages/NewDiscount";
import CardList from "../pages/CardList";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [userCreditCards, setUserCreditCards] = useState(null);
  const [userSingleCard, setSingleCard] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetch("/checksession").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => {
          setUser(user);
          setUserCreditCards(user.credit_cards);
          // setUserStores(user.stores);
        });
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  const handleDeleteCreditCard = (id) => {
    const newUserCardArray = userCreditCards.filter((userCreditCard) => userCreditCard.id !== id);
    setUserCreditCards(newUserCardArray);
  };

  const handleAddNewCreditCard = () => {
    // const newUserCardArray = [...userCreditCards, newCreditCard]
    // setUserCreditCards(newUserCardArray)
  };

  // const handleAddCardDiscount = (newDiscount) {
  //   const newCardDiscountArray = [...useSyncExternalStore, newDiscount]
  //   set
  // }

  const handleDisplayDiscounts = (id) => {
    const singleCreditCard = userCreditCards.filter((userCreditCard) => userCreditCard.id == id);
    setSingleCard(singleCreditCard);
    // console.log(singleCreditCard);
    history.push("/card_discounts");
  };

  const handleDeleteDiscount = (id) => {
    const newUserCardArray = userCreditCards.filter((userCreditCard) => userCreditCard.store.id !== id);
    setUserCreditCards(newUserCardArray);
  };

  return (
    <BrowserRouter>
      <NavBar user={user} setUser={setUser} />
      <Switch>
        <Route path="/main">
          <CardList
            userCreditCards={userCreditCards}
            onDeleteCreditCard={handleDeleteCreditCard}
            onDisplayDiscounts={handleDisplayDiscounts}
          />
          <button onClick={handleAddNewCreditCard}>Add New Credit Card</button>
        </Route>
        <Route exact path="/new">
          {/* <NewDiscount user={user} onAddCardDiscount={handleAddCardDiscount} /> */}
        </Route>
        <Route exact path="/stores">
          <Stores
            userCreditCards={userCreditCards}
            onDeleteDiscount={handleDeleteDiscount}
            // onEditDiscount={handleEditDiscount}
          />
        </Route>
        <Route exact path="/card_discounts">
          <CardDiscount userSingleCard={userSingleCard} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
