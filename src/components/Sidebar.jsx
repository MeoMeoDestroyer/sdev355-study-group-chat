export default function Sidebar({ channels, activeId, onSelectChannel }) {
  return (
    <nav className="sidebar">
      <h2>Channels</h2>
      {channels.map((channel) => (
        <button
          key={channel.id}
          // Highlight the button if it is the selected channel
          className={channel.id === activeId ? "channel active" : "channel"}
          // Tell App which channel was clicked; App updates the state
          onClick={() => onSelectChannel(channel.id)}
        >
          # {channel.name}
        </button>
      ))}
    </nav>
  );
}