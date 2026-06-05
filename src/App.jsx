import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage    from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TaskManager  from "./components/TaskManager";

function AppContent() {
  const { user, loading } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (loading) {
    return (
      <div className="auth-wrap">
        <div style={{ color: "var(--muted)", fontSize: 14 }}>
          Chargement...
        </div>
      </div>
    );
  }

  if (!user) {
    return showRegister
      ? <RegisterPage onSwitch={() => setShowRegister(false)} />
      : <LoginPage    onSwitch={() => setShowRegister(true)}  />;
  }

  return <TaskManager />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}