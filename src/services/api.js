// src/services/api.js
const BASE =import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur serveur");
  return data;
}

export const taskService = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(
      Object.fromEntries(
        Object.entries(params).filter(([, v]) => v && v !== "Tous")
      )
    ).toString();
    return request("GET", `/tasks${qs ? "?" + qs : ""}`);
  },
  getStats:     ()            => request("GET",    "/tasks/stats"),
  create:       (body)        => request("POST",   "/tasks",             body),
  update:       (id, body)    => request("PUT",    `/tasks/${id}`,       body),
  updateStatus: (id, status)  => request("PATCH",  `/tasks/${id}/status`,{ status }),
  delete:       (id)          => request("DELETE", `/tasks/${id}`),
};