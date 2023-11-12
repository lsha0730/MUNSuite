import "../Notes.scoped.css";
import "./IndividualNotes.scoped.css";

const IndividualNote = ({ delegate, text, updateNotes }) => {
  return (
    <div className="container">
      <p className="title">{delegate}</p>
      <textarea
        type="text"
        value={text}
        placeholder="Input here..."
        className="textfield"
        onChange={(e) => updateNotes(delegate, e.target.value)}
      />
    </div>
  );
};

export default IndividualNote;
