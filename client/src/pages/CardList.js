import React from "react";
import CreditCardCard from "../components/CreditCardCard";

const CardList = ({ userCreditCards, onDeleteCreditCard, onDisplayStores }) => {
  return (
    <ul className="credit-cards">
      {userCreditCards.map((credit_card) => {
        return (
          <CreditCardCard
            key={credit_card.id}
            credit_card={credit_card}
            onDeleteCreditCard={onDeleteCreditCard}
            onDisplayStores={onDisplayStores}
          />
        );
      })}
    </ul>
  );
};

export default CardList;
