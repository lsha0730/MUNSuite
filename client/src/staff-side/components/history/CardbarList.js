import React, { useContext } from "react";
import { appContext } from "../../staffContext";
import { flattenToString } from "../../utils";
import Cardbar from "./Cardbar";
import styles from "./History.module.css";

const CardbarList = ({ search, selection, filter, setSelection }) => {
  const { processed } = useContext(appContext);
  const lowerSearch = search.toLowerCase();
  const reverseProcessed = processed.slice().reverse();

  if (reverseProcessed.length < 1)
    return <div className={styles.no_cards_box}>No processed cards</div>;

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
            description={getDescription(card)}
            search={search}
            submissionID={card.submissionID}
          />
        );
      } else {
        return (
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

const getDescription = (card) => {
  if (card.standard) {
    return card.sponsors?.join(", ");
  } else {
    return card.body?.[0]?.value;
  }
};

export default CardbarList;
