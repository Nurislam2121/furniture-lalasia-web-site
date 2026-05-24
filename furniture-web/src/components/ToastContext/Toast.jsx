import './Toast.css'

export default function Toast({ message, type, onClose }) {
  const icons = {
    success: { icon: "✅", class: "toast-success" },
    error: { icon: "❌", class: "toast-error" },
    info: { icon: "❗", class: "toast-info" }
  };

  return (
    <div className={`toast-container ${type}`}>
      <div className={`toast-icon-circle ${icons[type].class}`}>
        {icons[type].icon}
      </div>
      <div className="toast-content">
        <p className="toast-text">{message}</p>
      </div>
    </div>
  );
}