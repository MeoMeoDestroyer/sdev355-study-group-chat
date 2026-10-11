// Shows the pinned message above the list, with an Unpin button
export default function PinnedBar({ message, onUnpin }) {
  // Nothing pinned in this channel: render nothing
  if (!message) {
    return null;
  }

  return (
    <div className="pinned-bar">
      <span className="label">Pinned</span>
      <span className="pinned-text">
        {message.author}: {message.text}
      </span>
      <button onClick={onUnpin}>Unpin</button>
    </div>
  );
}