import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Stores = () => {
  const [store_name, setStore_name] = useState("");
  const [expire_date, setExpire_date] = useState("");
  const [discount, setDiscount] = useState("");
  const [card_name, setCard_name] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    return <>Store Lists</>;
  };
};
export default Stores;
