import React, { useEffect, useState } from "react";
import CreditCardCard from "../components/CreditCardCard";

const CardList = ({ userCreditCards, onDeleteCreditCard, onDisplayDiscounts }) => {
  const credit_cards = userCreditCards;
  // console.log(credit_cards);
  return (
    <ul className="credit-cards">
      {credit_cards.map((credit_card) => {
        return (
          <CreditCardCard
            key={credit_card.id}
            credit_card={credit_card}
            onDeleteCreditCard={onDeleteCreditCard}
            onDisplayDiscounts={onDisplayDiscounts}
          />
        );
      })}
    </ul>
  );
};

export default CardList;
