import React, { useState } from "react";

const CreditCardCard = ({ credit_card, onDeleteCreditCard, onAddNewDiscount }) => {
  const { id, card_name, store } = credit_card;
  const [displayForm, setDisplayForm] = useState(false);
  const [store_name, setStore_name] = useState("");
  const [discount, setDiscount] = useState("");
  const [expire_date, setExpire_date] = useState("");
  const [displayStores, setDisplayStores] = useState(false);

  const handleDelete = () => {
    onDeleteCreditCard(id);
    fetch(`/credit_cards/${id}`, { method: "DELETE" });
  };

  const handleDisplayClick = (e) => {
    e.preventDefault();
    if (store) {
      setDisplayStores(!displayStores);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/credit_cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        store_name: store_name,
        discount: discount,
        expire_date: expire_date,
      }),
    })
      .then((resp) => resp.json())
      .then((store) => {
        setDisplayForm(!displayForm);
        console.log(store);
      });
  };

  return (
    <li className="creditcard-container">
      <h4>
        {card_name}
        <button onClick={handleDelete}>Delete Credit Card</button>
      </h4>
      <div>
        {displayStores ? (
          <div className={"visible"}>
            {store.store_name} has {store.discount} that expires on {store.expire_date}
          </div>
        ) : (
          <div className={"invisible"}></div>
        )}
      </div>
      <button onClick={handleDisplayClick}>Store Discount Information</button>
      <div>
        {displayForm ? (
          <div className={"visible"}>
            <form onSubmit={handleSubmit}>
              <label>
                Input Store Name:
                <input
                  type="text"
                  name="store_name"
                  placeholder="Store Name"
                  value={store_name}
                  onChange={(e) => setStore_name(e.target.value)}
                />
              </label>
              <label>
                Input Discount:
                <input
                  type="text"
                  name="discount"
                  placeholder="Discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </label>
              <label>
                Input Expire Date:
                <input
                  type="text"
                  name="expire_date"
                  placeholder="Expire Date"
                  value={expire_date}
                  onChange={(e) => setExpire_date(e.target.value)}
                />
              </label>
              <button type="submit" onClick={handleSubmit}>
                Add
              </button>
            </form>
          </div>
        ) : (
          <div className={"invisible"}></div>
        )}
      </div>
      <button onClick={() => setDisplayForm(!displayForm)}>Add New Discount</button>
    </li>
  );
};

export default CreditCardCard;
