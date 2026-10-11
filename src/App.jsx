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

  // Full channel object for the selected ID
  const channel = CHANNELS.find((c) => c.id === activeId);

  // Called by the Composer with the new message text
  function handleSend(text) {
    const message = { id: crypto.randomUUID(), author: "You", time: now(), hearts: 0, text };
    // Immutable update: copy all channels, then replace this channel's array with a new one
    setMessages({ ...messages, [activeId]: [...messages[activeId], message] });
  }


  return (
    <div className="app">
      <Sidebar
        channels={CHANNELS}
        activeId={activeId}
        onSelectChannel={setActiveId}
      />
      <main className="main">
        <ChatHeader channel={channel} />
        
        <MessageList messages={messages[activeId]} />
        <Composer onSend={handleSend} />
      </main>
    </div>
  );
}