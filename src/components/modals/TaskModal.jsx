// components/modals/TaskModal.jsx  — due_date → due géré proprement
import { useState } from "react";
import { PRIORITIES, CATEGORIES, STATUSES } from "../../constants";

export default function TaskModal({ task, onClose, onSave }) {
  const [form, setForm] = useState(
    task
      ? { ...task }
      : { title: "", desc: "", cat: "Dev", pri: "Normale", status: "À faire", due: "" }
  );

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="modal-wrap" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-head">
          <span className="modal-title">{task ? "Modifier la tâche" : "Nouvelle tâche"}</span>
          <button className="btn btn-icon" onClick={onClose}>✕</button>
        </div>

        <div className="form-group">
          <label className="form-label">Titre *</label>
          <input
            className="form-input"
            placeholder="Nom de la tâche..."
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            autoFocus
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            placeholder="Détails, contexte..."
            value={form.desc || ""}
            onChange={(e) => set("desc", e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Catégorie</label>
            <select className="form-select" value={form.cat} onChange={(e) => set("cat", e.target.value)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Priorité</label>
            <select className="form-select" value={form.pri} onChange={(e) => set("pri", e.target.value)}>
              {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Statut</label>
            <select className="form-select" value={form.status} onChange={(e) => set("status", e.target.value)}>
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Échéance</label>
            <input
              className="form-input"
              type="date"
              value={form.due || ""}
              onChange={(e) => set("due", e.target.value)}
            />
          </div>
        </div>

        <div className="modal-foot">
          <button className="btn" onClick={onClose}>Annuler</button>
          <button
            className="btn btn-primary"
            onClick={() => form.title.trim() && onSave(form)}
            disabled={!form.title.trim()}
          >
            {task ? "Enregistrer" : "Créer la tâche"}
          </button>
        </div>
      </div>
    </div>
  );
}