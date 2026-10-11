import { useState } from "react";

// onReact comes from App (passed through MessageList)
export default function Message({ message, onReact }) {
  // Local state: only this message cares about these
  const [showTime, setShowTime] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className="message"
      // Click toggles the time
      onClick={() => setShowTime(!showTime)}
      // Double-click tells App to add a heart
      onDoubleClick={() => onReact(message.id)}
      // Track whether the mouse is over this message
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="author">{message.author}</span>
      <p className="text">{message.text}</p>
      {/* Show the time only after a click */}
      {showTime && <span className="time">{message.time}</span>}


      {message.hearts > 0 && <span className="hearts">♥ {message.hearts}</span>}
      {/* Show the toolbar only while hovered */}
      {isHovered && (
        
        <div className="toolbar">
          <button onClick={() => console.log("pin", message.id)}>Pin</button>
        </div>
      )}
    </li>
  );
}