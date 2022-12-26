export const flattenToString = (input) => {
  const flatIgnore = ["heading", "subheading", "type", "standard", "status"];
  const flatten = (input, acc) => {
    if (!input) return acc;

    switch (typeof input) {
      case "number":
        return acc.concat(` ${input}`);
      case "boolean":
        return acc;
      case "string":
        if (input.length < 1) return acc;
        return acc.concat(` ${input}`);
      case "object":
        if (Array.isArray(input)) {
          // Array
          return acc.concat(input.map((e) => flatten(e, "")).join(" "));
        } else {
          // Object
          const keys = Object.keys(input);
          return keys
            .map((key, index) => {
              const value = input[key];
              if (!flatIgnore.includes(key)) {
                return flatten(value, "");
              } else {
                return "";
              }
            })
            .join(" ");
        }
    }
  };

  return flatten(input, "");
};

export function exportProcesseds(processed) {
  let dataRows = [];
  for (let i = 0; i < processed.length; i++) {
    let card = processed[i];
    let cardRow = [];

    cardRow.push(card.submissionID);
    cardRow.push(card.author);
    cardRow.push(card.status);
    if (card.standard) {
      cardRow.push(card.title);
      cardRow.push(card.type);
      cardRow.push(
        card.sponsors == "No Selection"
          ? "No Sponsors"
          : card.sponsors.join(", ")
      );
      cardRow.push(
        card.signatories == "No Selection"
          ? "No Signatories"
          : card.signatories.join(", ")
      );
    }

    let cardBody = card.body || [];
    for (let j = 0; j < cardBody.length; j++) {
      let bodyItem = cardBody[j];
      let value = bodyItem.value;

      switch (bodyItem.type) {
        case "radio":
          cardRow.push(value == "No Selection" ? "" : value);
          break;
        case "dropdown":
          cardRow.push(value == "No Selection" ? "" : value);
          break;
        case "multiplechoice":
          cardRow.push(value == "No Selection" ? "" : value.join(", "));
          break;
        case "select-multiple":
          cardRow.push(value == "No Selection" ? "" : value.join(", "));
          break;
        case "shorttext":
          cardRow.push(value ? value : "");
          break;
        case "longtext":
          cardRow.push(value ? value : "");
          break;
        default:
          cardRow.push(JSON.stringify(value));
      }
    }

    dataRows.push(cardRow);
  }

  const rows = [
    ["JSON Format: ", JSON.stringify(processed)],
    [],
    ["ID", "Author", "Status"],
  ].concat(dataRows);
  exportToCsv("Directives History", rows);
}

export const highlight = (text, highlight) => {
  // Split on highlight term and include term into parts, ignore case
  if (!text) return "";
  const inputString = typeof text == "string" ? text : JSON.stringify(text);
  const parts = inputString.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === highlight.toLowerCase()
              ? { backgroundColor: "#FFE49A" }
              : {}
          }
        >
          {part}
        </span>
      ))}
    </span>
  );
};
