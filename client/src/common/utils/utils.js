/**
 * Estimates the pixel width of a string.
 *
 * @param {string} text - The string being estimated.
 * @param {number} fontSize - The font size in use.
 * @returns {number} The estimated pixel width of the string.
 */
export function getTextWidth(text, fontSize = 16, fontFamily = "Inter") {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  context.font = fontSize + "px " + fontFamily;
  const metrics = context.measureText(text);
  const width = metrics.width;

  return width * 1.05;
}

export function exportToCsv(filename, rows) {
  var processRow = function(row) {
    var finalVal = "";
    for (var j = 0; j < row.length; j++) {
      var innerValue = row[j] === null ? "" : row[j].toString();
      if (row[j] instanceof Date) {
        innerValue = row[j].toLocaleString();
      }
      var result = innerValue.replace(/"/g, '""');
      if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
      if (j > 0) finalVal += ",";
      finalVal += result;
    }
    return finalVal + "\n";
  };

  var csvFile = "";
  for (var i = 0; i < rows.length; i++) {
    csvFile += processRow(rows[i]);
  }

  var blob = new Blob([csvFile], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

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
  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = inputString.split(new RegExp(`(${escapedHighlight})`, "gi"));

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

export const getExpiration = () => {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 4).toString().padStart(2, "0");
  const day = (date.getDay() + 1).toString().padStart(2, "0");
  const expiration = `${year}-${month}-${day}`;

  return expiration;
};
