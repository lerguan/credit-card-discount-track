import React from "react";
import CreditCardCard from "../components/CreditCardCard";

const CardList = ({ userCreditCards, onDeleteCreditCard }) => {
  const credit_cards = userCreditCards;

  if (credit_cards) {
    return (
      <ul className="credit-cards">
        {credit_cards.map((credit_card) => {
          return (
            <CreditCardCard key={credit_card.id} credit_card={credit_card} onDeleteCreditCard={onDeleteCreditCard} />
          );
        })}
      </ul>
    );
  }
};

export default CardList;
