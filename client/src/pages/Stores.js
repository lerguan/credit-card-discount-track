import React, { useEffect, useState } from "react";
import StoreCard from "../components/StoreCard";

const Stores = ({ userCreditCards }) => {
  // const credit_cards = userCreditCards;
  const [credit_cards, setCredit_cards] = useState(userCreditCards);
  // console.log(credit_cards);
  const handleEditDiscount = (store) => {
    const newCreditCards = [...credit_cards, store.credit_cards[0]];
    // console.log(newCreditCards);
    setCredit_cards(newCreditCards);
  };

  const handleDeletDiscount = (id) => {
    const newUserCardArray = userCreditCards.filter((userCreditCard) => userCreditCard.id !== id);
    setCredit_cards(newUserCardArray);
  };
  return (
    <ul className="credit-cards">
      {credit_cards.map((credit_card) => {
        return (
          <StoreCard
            key={credit_card.id}
            credit_card={credit_card}
            onDeleteDiscount={handleDeletDiscount}
            onEditDiscount={handleEditDiscount}
          />
        );
      })}
    </ul>
  );
};

export default Stores;
