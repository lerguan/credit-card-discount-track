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
  const [displayForm, setDisplayForm] = useState(false);
  const [userSingleCard, setSingleCard] = useState(null);
  const [card_name, setCard_name] = useState("");
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
        console.log(newCreditCard);
        setDisplayForm(!displayForm);
        const newUserCardArray = [...userCreditCards, newCreditCard];
        setUserCreditCards(newUserCardArray);
      });
  };

  const handleAddCardDiscount = (newCardDiscount) => {
    const newCardDiscountArray = [...userCreditCards, newCardDiscount];
    // console.log(newCardDiscountArray);
    setUserCreditCards(newCardDiscountArray);
    // console.log(userCreditCards);
  };

  const handleDisplayDiscounts = (id) => {
    const singleCreditCard = userCreditCards.filter((userCreditCard) => userCreditCard.id == id);
    setSingleCard(singleCreditCard);
    // console.log(singleCreditCard);
    history.push("/new");
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
                  </label>
                  <button type="submit">Add</button>
                </form>
              </div>
            ) : (
              <div className={"invisible"}></div>
            )}
            <button onClick={() => setDisplayForm(!displayForm)}>Add New Credit Card</button>
          </div>
        </Route>
        <Route exact path="/new">
          <NewDiscount user={user} onAddCardDiscount={handleAddCardDiscount} />
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
