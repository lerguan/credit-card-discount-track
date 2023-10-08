import React, { useEffect, useState } from "react";
import StoreCard from "../components/StoreCard";

const Stores = ({ userCreditCards, onDeleteDiscount, onEditDiscount }) => {
  const credit_cards = userCreditCards;
  // console.log(credit_cards);
  return (
    <ul className="credit-cards">
      {credit_cards.map((credit_card) => {
        return (
          <StoreCard
            key={credit_card.id}
            credit_card={credit_card}
            onDeleteDiscount={onDeleteDiscount}
            onEditDiscount={onEditDiscount}
          />
        );
      })}
    </ul>
  );
};

export default Stores;
