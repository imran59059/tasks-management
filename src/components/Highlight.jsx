import React, { useState, useEffect } from "react";

const Highlight = () => {
  const [highlights, setHighlights] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectionText, setSelectionText] = useState("");
  const [selectionRange, setSelectionRange] = useState(null);

  const paragraph =
    "This is a demo paragraph. You can select any part of this text using mouse or shift + arrow keys and highlight it.";

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        setSelectionText(selection.toString());
        setSelectionRange(selection.getRangeAt(0));
        setShowPopup(true);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  const handleConfirmHighlight = () => {
    if (selectionText && selectionRange) {
      setHighlights((prev) => [
        ...prev,
        { text: selectionText, start: selectionRange.startOffset, end: selectionRange.endOffset },
      ]);
      setShowPopup(false);
      window.getSelection().removeAllRanges();
    }
  };

  const getHighlightedText = () => {
    if (highlights.length === 0) return paragraph;

    let result = [];
    let lastIndex = 0;

    highlights.forEach((hl, index) => {
      result.push(paragraph.slice(lastIndex, hl.start));
      result.push(<mark key={index}>{paragraph.slice(hl.start, hl.end)}</mark>);
      lastIndex = hl.end;
    });

    result.push(paragraph.slice(lastIndex));
    return result;
  };

  return (
    <div style={{ padding: "20px" }}>
      <p>{getHighlightedText()}</p>

      {showPopup && (
        <div style={{ marginTop: "10px", background: "#eee", padding: "10px", display: "inline-block" }}>
          <p>Highlight this selection?</p>
          <button onClick={handleConfirmHighlight}>Yes</button>
          <button onClick={() => setShowPopup(false)}>No</button>
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <h3>Highlighted List:</h3>
        <ul>
          {highlights.map((hl, idx) => (
            <li key={idx}>{hl.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Highlight;
