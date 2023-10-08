import React from "react";
import CreditCardCard from "./CreditCardCard";

const CardList = ( {credit_cards, onDeleteCard, onDisplayStores) {
    return (
        <ul className="credit-cards">
      {credit_cards.map((credit_card) => {
        return (
          <CreditCardCard key={credit_card.id} credit_card={credit_card} onDeleteCard={onDeleteCard} onDisplayStores={onDisplayStores} />
        );
      })}
    </ul>
    )
};

export default CardList;