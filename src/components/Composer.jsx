import { useState } from "react";

// onSend comes from App; Composer tells App when a message is sent
export default function Composer({ onSend }) {
  // The draft stays here because only the Composer uses it
  const [draft, setDraft] = useState("");

  function send() {
    const text = draft.trim();
    if (text === "") {
      return;
    }
    onSend(text); 
    setDraft("");
  }

  function handleSubmit(e) {
    // Stop the page reloading
    e.preventDefault(); 
    send();
  }

  function handleKeyDown(e) {
    // Enter sends; Shift+Enter makes a new line
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
    // Escape clears the box
    if (e.key === "Escape") {
      setDraft("");
    }
  }

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <textarea
        rows={2}
        placeholder="Type a message..."
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button type="submit">Send</button>
    </form>
  );
}