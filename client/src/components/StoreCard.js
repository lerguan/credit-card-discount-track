import React from "react";

const StoreCard = ({ credit_card, onDeleteDiscount, onEditDiscount }) => {
  const { id, card_name, store } = credit_card;
  //   console.log(store);
  const handleDelete = () => {
    onDeleteDiscount(store.id);
    fetch(`/stores/${store.id}`, { method: "DELETE" });
  };

  const handleEditClick = () => {
    onEditDiscount(store.id);
  };
  // const handleAddDiscountClick = () => {
  //   // fetch(`/stores/${store.id}`)
  //   //   .then((resp) => resp.json())
  //   //   .then((store_list) => onDisplayStores(store_list));
  // };
  if (store) {
    return (
      <li className="store-card">
        <h2>{store.store_name}</h2>
        <ul>
          <li>Discount: {store.discount}</li>
          <li>Expire Date: {store.expire_date}</li>
          <li>{card_name}</li>
        </ul>
        <button onClick={handleEditClick}>Edit Discount</button>
        <button onClick={handleDelete}>Remove</button>
      </li>
    );
  }
};

export default StoreCard;
