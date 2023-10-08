import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const NewDiscount = ({ user, onAddCardDiscount }) => {
  const [card_name, setCard_name] = useState("");
  const [store_name, setStore_name] = useState("");
  const [discount, setDiscount] = useState("");
  const [expire_date, setExpire_date] = useState("");
  const [store_id, setStore_id] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/stores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        store_name: store_name,
        expire_date: expire_date,
        discount: discount,
      }),
    })
      .then((resp) => resp.json())
      .then((store) => {
        console.log(store);
        setStore_id(store.id);
      });

    fetch("/credit_cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        card_name: card_name,
        user_id: user.id,
        store_id: store_id,
      }),
    })
      .then((resp) => resp.json())
      .then((newCardDiscount) => onAddCardDiscount(newCardDiscount));
  };

  return (
    <div className="new-discount-info">
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
        <button type="submit">Add New Discount</button>
      </form>
    </div>
  );
};
export default NewDiscount;
