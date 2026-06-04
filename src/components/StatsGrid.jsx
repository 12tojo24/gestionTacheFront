// components/StatsGrid.jsx  — accepte les stats du back
export default function StatsGrid({ stats, loading }) {
  const items = [
    { label: "Total",     value: stats?.total       ?? "—", color: "#0ea5e9" },
    { label: "En cours",  value: stats?.in_progress ?? "—", color: "#f59e0b" },
    { label: "Terminées", value: stats?.done        ?? "—", color: "#22c55e" },
    { label: "Urgentes",  value: stats?.urgent      ?? "—", color: "#ef4444" },
  ];

  return (
    <div className="stats">
      {items.map((s) => (
        <div className="stat" key={s.label}>
          <div className="stat-n" style={{ color: s.color, opacity: loading ? 0.4 : 1 }}>
            {s.value}
          </div>
          <div className="stat-l">{s.label}</div>
        </div>
      ))}
    </div>
  );
}