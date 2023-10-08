import React from "react";

const CreditCardCard = ({ credit_card, onDeleteCreditCard, onDisplayStores, onAddNewDiscount }) => {
  const { id, card_name, store } = credit_card;
  console.log(store);
  const handleDelete = () => {
    fetch(`/credit_cards/${id}`, { method: "DELETE" });

    onDeleteCreditCard(id);
  };

  const handleAddDiscountClick = () => {
    // fetch(`/stores/${store.id}`)
    //   .then((resp) => resp.json())
    //   .then((store_list) => onDisplayStores(store_list));
  };

  return (
    <li className="creditcard-card">
      <h2>{card_name}</h2>
      <button onClick={onDisplayStores}>Store Discount Information</button>
      <button onClick={handleAddDiscountClick}>Add New Discount</button>
      <button onClick={handleDelete}>Remove</button>
    </li>
  );
};

export default CreditCardCard;
