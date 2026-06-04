// constants/index.js
export const PRIORITIES = ["Urgent", "Haute", "Normale", "Basse"];
export const CATEGORIES = ["Design", "Dev", "Marketing", "RH", "Finance", "Autre"];
export const STATUSES = ["À faire", "En cours", "Terminé"];

export const PM = {
  Urgent:  { c: "#ef4444", bg: "rgba(239,68,68,.12)"  },
  Haute:   { c: "#f59e0b", bg: "rgba(245,158,11,.12)" },
  Normale: { c: "#0ea5e9", bg: "rgba(14,165,233,.12)" },
  Basse:   { c: "#22c55e", bg: "rgba(34,197,94,.12)"  },
};

export const INIT_TASKS = [
  { id:1, title:"Refonte UI dashboard",    desc:"Moderniser l'interface avec le nouveau design system.", cat:"Design",    pri:"Haute",   status:"En cours", due:"2026-06-10" },
  { id:2, title:"API d'authentification",  desc:"Implémenter JWT + refresh tokens.",                     cat:"Dev",       pri:"Urgent",  status:"À faire",  due:"2026-06-07" },
  { id:3, title:"Campagne emailing Q3",    desc:"Préparer les assets et segments cibles.",               cat:"Marketing", pri:"Normale", status:"À faire",  due:"2026-06-20" },
  { id:4, title:"Audit sécurité",          desc:"Pentesting et rapport de vulnérabilités.",              cat:"Dev",       pri:"Haute",   status:"Terminé",  due:"2026-05-30" },
  { id:5, title:"Onboarding RH",           desc:"Créer le parcours d'intégration des nouveaux.",         cat:"RH",        pri:"Basse",   status:"À faire",  due:"2026-07-01" },
];