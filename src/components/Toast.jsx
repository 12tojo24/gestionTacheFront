// components/Toast.jsx
export default function Toast({ msg, color }) {
  return (
    <div className="toast-wrap">
      <div className="toast">
        <span style={{ color, fontSize: 16, fontWeight: 600 }}>●</span>
        {msg}
      </div>
    </div>
  );
}