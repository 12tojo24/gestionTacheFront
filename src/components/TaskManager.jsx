// components/TaskManager.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import Topbar from "./TopBar";
import StatsGrid   from "./StatsGrid";
import Toolbar     from "./Toolbar";
import TaskList    from "./TaskList";
import TaskModal   from "./modals/TaskModal";
import DeleteModal from "./modals/DeleteModal";
import Toast       from "./Toast";
import { taskService } from "../services/api";
import "../styles/global.css";

export default function TaskManager() {
  const [tasks,        setTasks]        = useState([]);
  const [stats,        setStats]        = useState(null);
  const [loading,      setLoading]      = useState(true);
  const [modal,        setModal]        = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [tab,          setTab]          = useState("Tous");
  const [search,       setSearch]       = useState("");
  const [filterPri,    setFilterPri]    = useState("Tous");
  const [toast,        setToast]        = useState(null);
  const toastTimer = useRef(null);

  // ── Toast ────────────────────────────────────────────────────────────────────
  const showToast = (msg, color = "#22c55e") => {
    setToast({ msg, color });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  };

  // ── Chargement des tâches ────────────────────────────────────────────────────
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (tab       !== "Tous") params.status   = tab;
      if (filterPri !== "Tous") params.priority = filterPri;
      if (search)               params.search   = search;

      const [tasksRes, statsRes] = await Promise.all([
        taskService.getAll(params),
        taskService.getStats(),
      ]);

      setTasks(tasksRes.data);
      setStats(statsRes.data);
    } catch (err) {
      showToast(err.message, "#ef4444");
    } finally {
      setLoading(false);
    }
  }, [tab, filterPri, search]);

  useEffect(() => {
    const timer = setTimeout(fetchTasks, search ? 300 : 0); // debounce search
    return () => clearTimeout(timer);
  }, [fetchTasks]);

  // ── Créer / Modifier ─────────────────────────────────────────────────────────
  const handleSave = async (form) => {
    // Mapping champs front → back
    const body = {
      title:       form.title,
      description: form.desc,
      category:    form.cat,
      priority:    form.pri,
      status:      form.status,
      due_date:    form.due || null,
    };

    try {
      if (form.id) {
        await taskService.update(form.id, body);
        showToast("Tâche modifiée");
      } else {
        await taskService.create(body);
        showToast("Tâche créée ✓");
      }
      setModal(null);
      fetchTasks();
    } catch (err) {
      showToast(err.message, "#ef4444");
    }
  };

  // ── Supprimer ────────────────────────────────────────────────────────────────
  const handleDeleteConfirm = async () => {
    try {
      await taskService.delete(deleteTarget.id);
      showToast("Tâche supprimée", "#ef4444");
      setDeleteTarget(null);
      fetchTasks();
    } catch (err) {
      showToast(err.message, "#ef4444");
    }
  };

  // ── Toggle statut ────────────────────────────────────────────────────────────
  const handleToggle = async (id) => {
    const task   = tasks.find((t) => t.id === id);
    const newStatus = task.status === "Terminé" ? "À faire" : "Terminé";
    try {
      await taskService.updateStatus(id, newStatus);
      fetchTasks();
    } catch (err) {
      showToast(err.message, "#ef4444");
    }
  };

  // ── Mapper back → front (snake_case → camelCase) ─────────────────────────────
  const mapped = tasks.map((t) => ({
    id:     t.id,
    title:  t.title,
    desc:   t.description,
    cat:    t.category,
    pri:    t.priority,
    status: t.status,
    due:    t.due_date ? t.due_date.slice(0, 10) : "",
  }));

  return (
    <div className="layout">
      <Topbar onAdd={() => setModal("new")} />

      <div className="content">
        <StatsGrid stats={stats} loading={loading} />

        <Toolbar
          search={search}       onSearch={setSearch}
          filterPri={filterPri} onFilterPri={setFilterPri}
          tab={tab}             onTab={setTab}
          tasks={mapped}
        />

        <TaskList
          tasks={mapped}
          loading={loading}
          onEdit={(t) => setModal(t)}
          onDelete={(t) => setDeleteTarget(t)}
          onToggle={handleToggle}
        />
      </div>

      {modal && (
        <TaskModal
          task={modal === "new" ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          task={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}

      {toast && <Toast msg={toast.msg} color={toast.color} />}
    </div>
  );
}