// src/pages/RegisterPage.jsx — fichier COMPLET
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage({ onSwitch }) {
  const { register } = useAuth();
  const [form,    setForm]    = useState({ name: "", email: "", password: "" });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setError("");
    if (form.password.length < 6) {
      return setError("Mot de passe trop court (min 6 caractères)");
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
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
        <h1 className="auth-title">Créer un compte</h1>
        <p className="auth-sub">Rejoignez TaskFlow gratuitement</p>

        {error && <div className="auth-error">{error}</div>}

        <div className="form-group">
          <label className="form-label">Nom</label>
          <input
            className="form-input"
            placeholder="Votre nom"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </div>

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
            placeholder="Min 6 caractères"
            value={form.password}
            onChange={(e) => set("password", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>

        <button
          className="btn btn-primary auth-btn"
          onClick={handleSubmit}
          disabled={loading || !form.name || !form.email || !form.password}
        >
          {loading ? "Création..." : "Créer mon compte"}
        </button>

        <p className="auth-switch">
          Déjà un compte ?{" "}
          <button className="auth-link" onClick={onSwitch}>
            Se connecter
          </button>
        </p>
      </div>
    </div>
  );
}