import { useState } from "react";

// onSend and onTypingChange come from App
export default function Composer({ onSend, onTypingChange }) {
  // The draft stays here because only the Composer uses it
  const [draft, setDraft] = useState("");

  function send() {
    const text = draft.trim();
    if (text === "") {
      return;
    }
    onSend(text); // Pass the text up to App
    setDraft(""); // Clear the box
  }

  function handleSubmit(e) {
    e.preventDefault(); // Stop the page reloading
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
        // Tell App when the box gains or loses focus
        onFocus={() => onTypingChange(true)}
        onBlur={() => onTypingChange(false)}
      />
      <button type="submit">Send</button>
    </form>
  );
}