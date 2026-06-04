// components/modals/DeleteModal.jsx
export default function DeleteModal({ task, onClose, onConfirm }) {
  return (
    <div className="modal-wrap" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-sm">
        <div className="modal-head">
          <span className="modal-title">Supprimer la tâche</span>
          <button className="btn btn-icon" onClick={onClose} aria-label="Fermer">✕</button>
        </div>

        <div className="delete-body">
          <div className="delete-icon">🗑️</div>
          <p className="delete-text">
            Voulez-vous vraiment supprimer <strong>"{task.title}"</strong> ?
          </p>
          <p className="delete-sub">Cette action est irréversible.</p>
        </div>

        <div className="modal-foot">
          <button className="btn" onClick={onClose}>Annuler</button>
          <button className="btn btn-delete" onClick={onConfirm}>Supprimer</button>
        </div>
      </div>
    </div>
  );
}