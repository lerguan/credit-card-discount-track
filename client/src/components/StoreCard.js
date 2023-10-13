import React, { useState } from "react";
import StoreDiscountCard from "./StoreDiscountCard";

const StoreCard = ({ credit_card, onDeleteDiscount }) => {
  const { id, card_name, stores, user_id } = credit_card;
  const [displayForm, setDisplayForm] = useState(false);
  const [discount, setDiscount] = useState("");
  const [expire_date, setExpire_date] = useState("");
  const [storelist, setStorelist] = useState(stores);

  // const handleDelete = (id) => {
  //   // onDeleteDiscount(id);
  //   fetch(`/stores/${id}/`, { method: "DELETE" });
  // };

  const onDeleteStoreDiscount = (id) => {
    const new_storelist = stores.filter((store) => store.id != id);
    setStorelist(new_storelist);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/stores/${user_id}/${stores.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        discount: discount,
        expire_date: expire_date,
      }),
    })
      .then((resp) => resp.json())
      .then((store) => {
        setDisplayForm(!displayForm);
        setDiscount(store.discount);
        setExpire_date(store.expire_date);
      });
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
