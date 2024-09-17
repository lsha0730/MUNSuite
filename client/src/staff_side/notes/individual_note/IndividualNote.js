import { useEffect, useState } from "react";
import "../Notes.scoped.css";
import "./IndividualNotes.scoped.css";

const IndividualNote = ({ delegate, text, updateNotes }) => {
  const [note, setNote] = useState(text);

  useEffect(() => {
    updateNotes(delegate, note);
  }, [note]);

  return (
    <div className="container">
      <p className="title">{delegate}</p>
      <textarea
        type="text"
        value={note}
        placeholder="Input here..."
        className="textfield"
        onChange={(e) => setNote(e.target.value)}
      />
    </div>
  );
};

export default IndividualNote;
