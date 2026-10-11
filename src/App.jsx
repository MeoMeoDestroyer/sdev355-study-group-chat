import { useState } from "react";

import { CHANNELS, SEED_MESSAGES } from "./data.js";
import Sidebar from "./components/Sidebar.jsx";
import ChatHeader from "./components/ChatHeader.jsx";
import MessageList from "./components/MessageList.jsx";
import Composer from "./components/Composer.jsx";

// Returns the current time, like "9:05 PM"
function now() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export default function App() {
  // Selected channel ID, read by Sidebar, ChatHeader and MessageList
  const [activeId, setActiveId] = useState("general");
  // Every channel's messages, read by MessageList and changed by Composer
  const [messages, setMessages] = useState(SEED_MESSAGES);
  // Whether the message box has focus; read by ChatHeader, changed by Composer
  const [isTyping, setIsTyping] = useState(false);

  // Full channel object for the selected ID
  const channel = CHANNELS.find((c) => c.id === activeId);

  // Called by the Composer with the new message text
  function handleSend(text) {
    const message = { id: crypto.randomUUID(), author: "You", time: now(), hearts: 0, text };
    // Immutable update: copy all channels, then replace this channel's array with a new one
    setMessages({ ...messages, [activeId]: [...messages[activeId], message] });
  }

  // Called by a Message on double-click; adds one heart to that message
function handleReact(id) {
  // New array: copy the matching message with hearts + 1, keep the others as they are
  const updated = messages[activeId].map((m) =>
    m.id === id ? { ...m, hearts: m.hearts + 1 } : m
  );
  // Immutable update, same pattern as handleSend
  setMessages({ ...messages, [activeId]: updated });
}

  return (
    <div className="app">
      <Sidebar
        channels={CHANNELS}
        activeId={activeId}
        onSelectChannel={setActiveId}
      />
      <main className="main">
        {/* Header shows the channel name and the typing indicator */}
        <ChatHeader channel={channel} isTyping={isTyping} />
        <MessageList messages={messages[activeId]} onReact={handleReact} />
        {/* Composer sends messages and reports focus changes */}
        <Composer onSend={handleSend} onTypingChange={setIsTyping} />
      </main>
    </div>
  );
}