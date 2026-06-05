// components/TaskManager.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import TopBar from "./TopBar";
import StatsGrid     from "./StatsGrid";
import Toolbar       from "./Toolbar";
import TaskList      from "./TaskList";
import TaskModal     from "./modals/TaskModal";
import DeleteModal   from "./modals/DeleteModal";
import Toast         from "./Toast";
import { taskService } from "../services/api";
import "../styles/global.css";

const mapTask = (t) => ({
  id:     t.id,
  title:  t.title,
  desc:   t.description || "",
  cat:    t.category,
  pri:    t.priority,
  status: t.status,
  due:    t.due_date ? t.due_date.slice(0, 10) : "",
});

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

  const showToast = (msg, color = "#22c55e") => {
    setToast({ msg, color });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  };

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

      setTasks(tasksRes.data.map(mapTask));
      setStats(statsRes.data);
    } catch (err) {
      showToast(err.message, "#ef4444");
    } finally {
      setLoading(false);
    }
  }, [tab, filterPri, search]);

  useEffect(() => {
    const timer = setTimeout(fetchTasks, search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [fetchTasks]);

  const handleSave = async (form) => {
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

  const handleToggle = async (id) => {
    const task      = tasks.find((t) => t.id === id);
    const newStatus = task.status === "Termine" ? "A faire" : "Termine";

    setTasks((prev) =>
      prev.map((t) => t.id === id ? { ...t, status: newStatus } : t)
    );
    try {
      await taskService.updateStatus(id, newStatus);
      const statsRes = await taskService.getStats();
      setStats(statsRes.data);
    } catch (err) {
      setTasks((prev) =>
        prev.map((t) => t.id === id ? { ...t, status: task.status } : t)
      );
      showToast(err.message, "#ef4444");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const task = tasks.find((t) => t.id === id);
    setTasks((prev) =>
      prev.map((t) => t.id === id ? { ...t, status: newStatus } : t)
    );
    try {
      await taskService.updateStatus(id, newStatus);
      const statsRes = await taskService.getStats();
      setStats(statsRes.data);
    } catch (err) {
      setTasks((prev) =>
        prev.map((t) => t.id === id ? { ...t, status: task.status } : t)
      );
      showToast(err.message, "#ef4444");
    }
  };

  return (
    <div className="layout">
      <TopBar onAdd={() => setModal("new")} />

      <div className="content">
        <StatsGrid stats={stats} loading={loading} />

        <Toolbar
          search={search}       onSearch={setSearch}
          filterPri={filterPri} onFilterPri={setFilterPri}
          tab={tab}             onTab={setTab}
          tasks={tasks}
        />

        <TaskList
          tasks={tasks}
          loading={loading}
          onEdit={(t)   => setModal(t)}
          onDelete={(t) => setDeleteTarget(t)}
          onToggle={handleToggle}
          onStatusChange={handleStatusChange}
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