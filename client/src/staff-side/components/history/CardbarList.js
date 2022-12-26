import React, { useContext } from "react";
import { appContext } from "../../staffContext";
import { flattenToString } from "../../utils";
import Cardbar from "./Cardbar";
import "./History.scoped.css";

const CardbarList = ({ search, selection, filter, setSelection }) => {
  const { processed } = useContext(appContext);
  const lowerSearch = search.toLowerCase();
  const reverseProcessed = processed.slice().reverse();

  if (reverseProcessed.length < 1)
    return <div className="no-cards-box">No processed cards</div>;

  return reverseProcessed.map((card, i) => {
    if (shouldRender(card, filter, lowerSearch)) {
      if (card.standard) {
        return (
          <Cardbar
            type="standard"
            selected={selection == i}
            status={card.status}
            onClick={() => setSelection(i)}
            title={card.title}
            search={search}
          />
        );
      } else {
        return (
          <Cardbar
            type="custom"
            selected={selection == i}
            status={card.status}
            onClick={() => setSelection(i)}
            submissionID={card.submissionID}
            author={card.author}
            search={search}
          />
        );
      }
    }
  });
};

const shouldRender = (card, filter, lowerSearch) => {
  const cardStringLower = flattenToString(card).toLowerCase();
  const filterBoolean = card.status == filter || filter == "No Filter";
  const includesSearchKey = cardStringLower.includes(lowerSearch);

  return filterBoolean && includesSearchKey;
};

export default CardbarList;
