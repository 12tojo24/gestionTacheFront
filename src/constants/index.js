// constants/index.js
export const PRIORITIES = ["Urgent", "Haute", "Normale", "Basse"];
export const CATEGORIES = ["Design", "Dev", "Marketing", "RH", "Finance", "Autre"];
export const STATUSES   = ["A faire", "En cours", "Termine"];

export const STATUS_LABELS = {
  "A faire":  "À faire",
  "En cours": "En cours",
  "Termine":  "Terminé",
};

export const PM = {
  Urgent:  { c: "#ef4444", bg: "rgba(239,68,68,.12)"  },
  Haute:   { c: "#f59e0b", bg: "rgba(245,158,11,.12)" },
  Normale: { c: "#0ea5e9", bg: "rgba(14,165,233,.12)" },
  Basse:   { c: "#22c55e", bg: "rgba(34,197,94,.12)"  },
};

export const INIT_TASKS = [];