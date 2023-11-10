import React from "react";
import Cardbar from "./Cardbar";
import "../History.scoped.css";

const CardbarList = ({ cards, search, selection, setSelection }) => {
  return cards.length < 1 ? (
    <div className="no-cards-box">No processed cards</div>
  ) : (
    <div className="deck-container">
      {cards.map((card, i) =>
        card.standard ? (
          <Cardbar
            type="standard"
            selected={selection == i}
            status={card.status}
            onClick={() => setSelection(i)}
            title={card.title}
            description={getDescription(card)}
            search={search}
            submissionID={card.submissionID}
          />
        ) : (
          <Cardbar
            type="custom"
            selected={selection == i}
            status={card.status}
            onClick={() => setSelection(i)}
            author={card.author}
            description={getDescription(card)}
            search={search}
            submissionID={card.submissionID}
          />
        )
      )}
    </div>
  );
};

const getDescription = (card) => {
  if (card.standard) {
    return card.sponsors?.join(", ");
  } else {
    return card.body?.[0]?.value;
  }
};

export default CardbarList;
