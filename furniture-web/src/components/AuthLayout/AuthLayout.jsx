import "./AuthLayout.css";

export default function AuthLayout({ title, children }) {
  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>{title}</h2>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
