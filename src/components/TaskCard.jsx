// components/TaskCard.jsx
import { useState } from "react";
import { PM, STATUS_LABELS } from "../constants";

const STATUS_CONFIG = {
  "A faire":  { color: "#94a3b8", bg: "rgba(148,163,184,.12)", icon: "○" },
  "En cours": { color: "#f59e0b", bg: "rgba(245,158,11,.12)",  icon: "◑" },
  "Termine":  { color: "#22c55e", bg: "rgba(34,197,94,.12)",   icon: "●" },
};

export default function TaskCard({ task, onEdit, onDelete, onToggle, onStatusChange }) {
  const [showMenu, setShowMenu] = useState(false);
  const today  = new Date().toISOString().slice(0, 10);
  const pm     = PM[task.pri]  || PM["Normale"];
  const sc     = STATUS_CONFIG[task.status] || STATUS_CONFIG["A faire"];
  const isDone = task.status === "Termine";
  const late   = task.due && !isDone && task.due < today;

  return (
    <div className="task-card">
      <div className="task-head">
        <button
          className={`task-check${isDone ? " done" : ""}`}
          onClick={() => onToggle(task.id)}
          title={isDone ? "Remettre à faire" : "Marquer terminé"}
        >
          {isDone && "✓"}
        </button>

        <span className={`task-title${isDone ? " done" : ""}`}>
          {task.title}
        </span>

        <div className="task-actions">
          <button
            className="btn btn-icon"
            onClick={() => onEdit(task)}
            title="Modifier"
          >
            ✎
          </button>
          <button
            className="btn btn-icon btn-danger"
            onClick={() => onDelete(task)}
            title="Supprimer"
          >
            ✕
          </button>
        </div>
      </div>

      {task.desc && <p className="task-desc">{task.desc}</p>}

      <div className="task-meta">
        <span className="badge" style={{ background: pm.bg, color: pm.c }}>
          {task.pri}
        </span>
        <span className="badge badge-cat">{task.cat}</span>

        <div className="status-wrap">
          <button
            className="status-btn"
            style={{ background: sc.bg, color: sc.color }}
            onClick={() => setShowMenu((v) => !v)}
          >
            <span>{sc.icon}</span>
            {STATUS_LABELS[task.status] || task.status}
            <span style={{ fontSize: 10, opacity: 0.6 }}>▾</span>
          </button>

          {showMenu && (
            <>
              <div
                style={{ position: "fixed", inset: 0, zIndex: 29 }}
                onClick={() => setShowMenu(false)}
              />
              <div className="status-menu">
                {Object.entries(STATUS_CONFIG).map(([s, cfg]) => (
                  <button
                    key={s}
                    className={`status-option${task.status === s ? " active" : ""}`}
                    style={{ color: cfg.color }}
                    onClick={() => {
                      onStatusChange(task.id, s);
                      setShowMenu(false);
                    }}
                  >
                    <span>{cfg.icon}</span>
                    {STATUS_LABELS[s]}
                    {task.status === s && (
                      <span style={{ marginLeft: "auto" }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {task.due && (
          <span className={`due${late ? " late" : ""}`}>
            {late ? "⚠ " : ""}{task.due}
          </span>
        )}
      </div>
    </div>
  );
}