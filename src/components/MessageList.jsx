import Message from "./Message.jsx";

// Shows the messages it receives; App owns the messages state
export default function MessageList({ messages }) {
  return (
    <ul className="messages">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </ul>
  );
}