import React, { useState } from "react";
import StoreDiscountCard from "./StoreDiscountCard";

const StoreCard = ({ credit_card }) => {
  const { id, card_name, stores, user_id } = credit_card;

  const [storelist, setStorelist] = useState(stores);

  const onDeleteStoreDiscount = (id) => {
    const new_storelist = stores.filter((store) => store.id !== id);
    setStorelist(new_storelist);
  };

  if (storelist) {
    return (
      <>
        {storelist.map((store) => {
          return (
            <StoreDiscountCard
              key={store.id}
              store={store}
              credit_card={credit_card}
              onDeleteStoreDiscount={onDeleteStoreDiscount}
            />
          );
        })}
      </>
    );
  }
};

export default StoreCard;
