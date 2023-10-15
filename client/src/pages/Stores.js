import React, { useState } from "react";
import StoreCard from "../components/StoreCard";

const Stores = ({ userCreditCards, onDeleteStore, onEditStoreDiscount }) => {
  if (userCreditCards) {
    return (
      <ul className="credit-cards">
        {userCreditCards.map((userCreditCard) => {
          return (
            <StoreCard
              key={userCreditCard.id}
              userCreditCard={userCreditCard}
              onDeleteStore={onDeleteStore}
              onEditStoreDiscount={onEditStoreDiscount}
            />
          );
        })}
      </ul>
    );
  }
};
export default Stores;
