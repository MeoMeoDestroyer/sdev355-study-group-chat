import { useState } from "react";

// isPinned, onPin and onReact all come from App (through MessageList)
export default function Message({ message, isPinned, onPin, onReact }) {
  // Local state: only this message cares about these
  const [showTime, setShowTime] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function handlePinClick(e) {
    // Stop the click from bubbling up to the <li>, so the time doesn't toggle
    e.stopPropagation();
    // Tell App which message to pin or unpin
    onPin(message.id);
  }

  return (
    <li
      className={isPinned ? "message pinned" : "message"}
      onClick={() => setShowTime(!showTime)}
      onDoubleClick={() => onReact(message.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="author">{message.author}</span>
      <p className="text">{message.text}</p>
      {showTime && <span className="time">{message.time}</span>}
      {message.hearts > 0 && <span className="hearts">♥ {message.hearts}</span>}
      {isHovered && (
        <div className="toolbar">
          <button onClick={handlePinClick}>{isPinned ? "Unpin" : "Pin"}</button>
        </div>
      )}
    </li>
  );
}