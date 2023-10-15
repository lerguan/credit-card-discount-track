import React from "react";
import StoreDiscountCard from "./StoreDiscountCard";

const StoreCard = ({ userCreditCard, onDeleteStore, onEditStoreDiscount }) => {
  if (userCreditCard.stores) {
    return (
      <>
        {userCreditCard.stores.map((store) => {
          return (
            <StoreDiscountCard
              key={store.id}
              store={store}
              card_name={userCreditCard.card_name}
              onDeleteStore={onDeleteStore}
              onEditStoreDiscount={onEditStoreDiscount}
            />
          );
        })}
      </>
    );
  }
};

export default StoreCard;
