import React, { useState } from "react";

const CreditCardCard = ({ credit_card, onDeleteCreditCard }) => {
  const { id, card_name, stores } = credit_card;
  const [displayForm, setDisplayForm] = useState(false);
  const [store_name, setStore_name] = useState("");
  const [discount, setDiscount] = useState("");
  const [expire_date, setExpire_date] = useState("");
  const [displayStores, setDisplayStores] = useState(false);
  const [store_discounts, setStore_discounts] = useState(stores);

  const handleDelete = () => {
    onDeleteCreditCard(id);
    fetch(`/credit_cards/${id}`, { method: "DELETE" });
  };

  const handleDisplayClick = (e) => {
    e.preventDefault();
    if (store_discounts) {
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
      .then((credit_card) => {
        setDisplayForm(!displayForm);
        setStore_discounts(credit_card.stores);
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
            {store_discounts.map((store_discount) => {
              return (
                <div className={"visible"}>
                  {store_discount.store_name} has {store_discount.discount} that expires on {store_discount.expire_date}
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
