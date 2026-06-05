const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getToken = () => localStorage.getItem("token");

async function request(method, path, body) {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur serveur");
  return data;
}

export const authService = {
  register: (body) => request("POST", "/auth/register", body),
  login:    (body) => request("POST", "/auth/login",    body),
  me:       ()     => request("GET",  "/auth/me"),
};

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
  create:       (body)        => request("POST",   "/tasks",              body),
  update:       (id, body)    => request("PUT",    `/tasks/${id}`,        body),
  updateStatus: (id, status)  => request("PATCH",  `/tasks/${id}/status`, { status }),
  delete:       (id)          => request("DELETE", `/tasks/${id}`),
};