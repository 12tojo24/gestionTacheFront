import { useAuth } from "../context/AuthContext";

export default function Topbar({ onAdd }) {
  const { user, logout } = useAuth();

  return (
    <div className="topbar">
      <span className="logo">
        <span className="logo-dot" />
        TaskFlow
      </span>

      <button className="btn btn-primary" onClick={onAdd}>
        + Ajouter
      </button>

      <div className="user-info">
        <div className="user-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <span className="user-name">{user?.name}</span>
        <button className="btn btn-ghost btn-sm" onClick={logout}>
          Déconnexion
        </button>
      </div>
    </div>
  );
}