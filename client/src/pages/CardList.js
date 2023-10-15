import React from "react";
import CreditCardCard from "../components/CreditCardCard";

const CardList = ({ userCreditCards, onDeleteCreditCard, onAddStoreToCreditCard }) => {
  if (userCreditCards) {
    return (
      <ul className="credit-cards">
        {userCreditCards.map((userCreditCard) => {
          return (
            <CreditCardCard
              key={userCreditCard.id}
              userCreditCard={userCreditCard}
              onDeleteCreditCard={onDeleteCreditCard}
              onAddStoreToCreditCard={onAddStoreToCreditCard}
            />
          );
        })}
      </ul>
    );
  }
};

export default CardList;
