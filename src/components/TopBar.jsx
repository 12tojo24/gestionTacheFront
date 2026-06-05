export default function TopBar({ onAdd }) {
  return (
    <div className="topbar">
      <span className="logo">
        <span className="logo-dot" />
        TaskFlow
      </span>
      <button className="btn btn-primary" onClick={onAdd}>
        + Ajouter
      </button>
    </div>
  );
}