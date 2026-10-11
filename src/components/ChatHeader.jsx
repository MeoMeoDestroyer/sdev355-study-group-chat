// Shows the channel name, is typing 
export default function ChatHeader({ channel, isTyping }) {
  return (
    <header className="chat-header">
      <h1># {channel.name}</h1>
      {isTyping && <span className="typing">You are typing...</span>}
    </header>
  );
}