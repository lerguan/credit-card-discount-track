import React, { useState } from "react";

const StoreCard = ({ credit_card, onDeleteDiscount }) => {
  const { id, card_name, store, user_id } = credit_card;
  const [displayForm, setDisplayForm] = useState(false);
  const [discount, setDiscount] = useState("");
  const [expire_date, setExpire_date] = useState("");

  const handleDelete = () => {
    onDeleteDiscount(id);
    fetch(`/credit_cards/${id}/`, { method: "DELETE" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/stores/${user_id}/${store.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        discount: discount,
        expire_date: expire_date,
      }),
    })
      .then((resp) => resp.json())
      .then((store) => {
        setDisplayForm(!displayForm);
        setDiscount(store.discount);
        setExpire_date(store.expire_date);
      });
  };

  if (store) {
    return (
      <li className="store-card">
        <h2>{store.store_name}</h2>
        <ul>
          <li>Discount: {store.discount}</li>
          <li>Expire Date: {store.expire_date}</li>
          <li>{card_name}</li>
        </ul>
        <div>
          {displayForm ? (
            <div className={"visible"}>
              <form onSubmit={handleSubmit}>
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
                <button type="submit">Edit</button>
              </form>
            </div>
          ) : (
            <div className={"invisible"}></div>
          )}
        </div>
        <button onClick={() => setDisplayForm(!displayForm)}>Edit Discount</button>
        <button onClick={handleDelete}>Remove</button>
      </li>
    );
  }
};

export default StoreCard;
