import React, { useState } from "react";

const CreditCardCard = ({ userCreditCard, onDeleteCreditCard, onAddStoreToCreditCard }) => {
  const { id, card_name, stores } = userCreditCard;
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
    if (stores) {
      setDisplayStores(!displayStores);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/stores/${id}`, {
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
        onAddStoreToCreditCard(store.credit_cards);
      });
  };

  return (
    <li className="creditcard-container">
      <h4 className="creditcard-card">
        {card_name}
        <button onClick={handleDelete} className="delete-button">
          Delete Card
        </button>
      </h4>
      <div>
        {displayStores ? (
          <ul className="credit-cards">
            {stores.map((store) => {
              return (
                <div className={"visible"} key={store.id}>
                  {store.store_name} has {store.discount} that expires on {store.expire_date}
                </div>
              );
            })}
          </ul>
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
