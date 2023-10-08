import React from "react";

const CreditCardCard = ({ credit_card, onDeleteCreditCard, onDisplayStores, onAddNewDiscount }) => {
  const { id, card_name, store } = credit_card;

  const handleDelete = () => {
    fetch(`/credit_cards/${id}`, { method: "DELETE" });

    onDeleteCreditCard(id);
  };

  const handleCardClick = () => {
    fetch(`/stores/${store.id}`)
      .then((resp) => resp.json())
      .then((store_list) => onDisplayStores(store_list));
  };

  return (
    <li className="creditcard-card">
      <h2 onClick={handleCardClick}>{card_name}</h2>
      <button onClick={handleDelete}>Remove</button>
    </li>
  );
};

export default CreditCardCard;
