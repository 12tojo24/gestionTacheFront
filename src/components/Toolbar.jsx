// components/Toolbar.jsx
import { PRIORITIES, STATUSES, STATUS_LABELS } from "../constants";

export default function Toolbar({ search, onSearch, filterPri, onFilterPri, tab, onTab, tasks }) {
  return (
    <>
      <div className="toolbar">
        <div className="search">
          <span style={{ color: "var(--hint)", fontSize: 15 }}>⌕</span>
          <input
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="filters">
        {["Tous", ...PRIORITIES].map((p) => (
          <button
            key={p}
            className={`chip${filterPri === p ? " on" : ""}`}
            onClick={() => onFilterPri(p)}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="tabs">
        {["Tous", ...STATUSES].map((s) => {
          const cnt =
            s === "Tous"
              ? tasks.length
              : tasks.filter((t) => t.status === s).length;
          return (
            <button
              key={s}
              className={`tab${tab === s ? " on" : ""}`}
              onClick={() => onTab(s)}
            >
              {s === "Tous" ? "Tous" : STATUS_LABELS[s]}
              <span className="tab-count">{cnt}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}