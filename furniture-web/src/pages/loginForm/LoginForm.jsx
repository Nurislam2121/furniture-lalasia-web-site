import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import InputField from "../../components/InputField/InputField";
import { Link } from "react-router-dom";
import "./LoginForm.css";
import { useToast } from '../../components/ToastContext/ToastContext';

export default function LoginForm() {
  const navigate = useNavigate();
  const addToast = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        
        addToast("Успешный вход!", "success");
        navigate("/");
        window.location.reload(); 
      } else {
        addToast("Неверный email или пароль", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <AuthLayout title={"Welcome Back!"}>
      <form className="auth-form" onSubmit={handleSubmit}>
        <InputField
          label="Email" 
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className="auth-footer">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </div>
        <button type="submit" className="main-button base-button">Sign In</button>
      </form>
    </AuthLayout>
  );
}