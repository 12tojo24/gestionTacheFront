// components/TaskCard.jsx
import { PM } from "../constants";

export default function TaskCard({ task, onEdit, onDelete, onToggle }) {
  const today = new Date().toISOString().slice(0, 10);
  const pm = PM[task.pri];
  const isDone = task.status === "Terminé";
  const late = task.due && !isDone && task.due < today;

  return (
    <div className="task-card">
      <div className="task-head">
        {/* Checkbox toggle */}
        <button
          className={`task-check${isDone ? " done" : ""}`}
          onClick={() => onToggle(task.id)}
          aria-label={isDone ? "Marquer non fait" : "Marquer terminé"}
        >
          {isDone && "✓"}
        </button>

        {/* Titre */}
        <span className={`task-title${isDone ? " done" : ""}`}>{task.title}</span>

        {/* Actions */}
        <div className="task-actions">
          <button className="btn btn-icon" onClick={() => onEdit(task)} aria-label="Modifier">
            ✎
          </button>
          <button
            className="btn btn-icon btn-danger"
            onClick={() => onDelete(task)}
            aria-label="Supprimer"
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
        {task.due && (
          <span className={`due${late ? " late" : ""}`}>
            {late ? "⚠ " : ""}{task.due}
          </span>
        )}
      </div>
    </div>
  );
}