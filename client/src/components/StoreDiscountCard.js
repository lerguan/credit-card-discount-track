import React, { useState } from "react";

const StoreDiscountCard = ({ store, card_name, onDeleteStore, onEditStoreDiscount }) => {
  const { id } = store;
  const [displayForm, setDisplayForm] = useState(false);
  const [discount, setDiscount] = useState("");
  const [expire_date, setExpire_date] = useState("");

  const handleDelete = () => {
    onDeleteStore(id);
    fetch(`/stores/${id}`, { method: "DELETE" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/stores/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        discount: discount,
        expire_date: expire_date,
      }),
    })
      .then((resp) => resp.json())
      .then((store) => {
        onEditStoreDiscount(store.credit_cards);
        setDisplayForm(!displayForm);
      });
  };

  return (
    <li className="store-container">
      <h4 className="store-card">{store.store_name}</h4>
      <ul className="store-discount">
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
      <button onClick={() => setDisplayForm(!displayForm)} className="edit-button">
        Edit Discount
      </button>
      <button onClick={handleDelete} className="delete-button">
        Remove
      </button>
    </li>
  );
};

export default StoreDiscountCard;
