import React, { useEffect, useState } from "react";
import CreditCardCard from "../components/CreditCardCard";

const CardList = ({ userCreditCards, onDeleteCreditCard }) => {
  const credit_cards = userCreditCards;
  return (
    <ul className="credit-cards">
      {credit_cards.map((credit_card) => {
        return (
          <CreditCardCard key={credit_card.id} credit_card={credit_card} onDeleteCreditCard={onDeleteCreditCard} />
        );
      })}
    </ul>
  );
};

export default CardList;
