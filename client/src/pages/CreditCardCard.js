import React from "react";

const CreditCardCard = ({ credit_card, store, onDeleteCreditCard, onDisplayStores, onAddNewDiscount }) => {
  const { card_id, card_name } = credit_card;
  const { store_id, store_name, discount, expire_date } = store;

  const handleDelete = () => {
    fetch(`/credit_cards/${card_id}`, { method: "DELETE" });

    onDeleteCreditCard(card_id);

    const handleCardClick = () => {
      fetch(`/stores/${store_id}`)
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
};

export default CreditCardCard;
