import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage({ onSwitch }) {
  const { login } = useAuth();
  const [form,    setForm]    = useState({ email: "", password: "" });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="logo-dot" />
          TaskFlow
        </div>
        <h1 className="auth-title">Connexion</h1>
        <p className="auth-sub">Connectez-vous à votre compte</p>

        {error && <div className="auth-error">{error}</div>}

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            placeholder="exemple@email.com"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Mot de passe</label>
          <input
            className="form-input"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => set("password", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>

        <button
          className="btn btn-primary auth-btn"
          onClick={handleSubmit}
          disabled={loading || !form.email || !form.password}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        <p className="auth-switch">
          Pas encore de compte ?{" "}
          <button className="auth-link" onClick={onSwitch}>
            S'inscrire
          </button>
        </p>
      </div>
    </div>
  );
}