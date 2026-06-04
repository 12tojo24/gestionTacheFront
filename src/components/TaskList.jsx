// components/TaskList.jsx  — ajout état loading
import TaskCard from "./TaskCard";

export default function TaskList({ tasks, loading, onEdit, onDelete, onToggle }) {
  if (loading) {
    return (
      <div className="task-list">
        {[1, 2, 3].map((i) => (
          <div key={i} className="task-card skeleton" style={{ height: 88, opacity: 0.4 }} />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="empty">
        <span className="empty-icon">◻</span>
        <p>Aucune tâche</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((t) => (
        <TaskCard
          key={t.id}
          task={t}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}