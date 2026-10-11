import Message from "./Message.jsx";



export default function MessageList({ messages, onReact }) {
  return (
    <ul className="messages">
      {messages.map((message) => (
        <Message key={message.id} message={message} onReact={onReact} />
      ))}
    </ul>
  );
}