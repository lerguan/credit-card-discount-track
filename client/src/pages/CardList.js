import React from "react";
import CreditCardCard from "../components/CreditCardCard";

const CardList = ({ user, onDeleteCard, onDisplayStores }) => {
  const credit_card_list = user.credit_cards;
  return (
    <ul className="credit-cards">
      {credit_card_list.map((credit_card) => {
        return (
          <CreditCardCard
            key={credit_card.id}
            credit_card={credit_card}
            onDeleteCard={onDeleteCard}
            onDisplayStores={onDisplayStores}
          />
        );
      })}
    </ul>
  );
};

export default CardList;
