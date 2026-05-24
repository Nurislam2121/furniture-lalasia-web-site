import { useNavigate } from "react-router-dom"; 
import { useState } from "react";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import InputField from "../../components/InputField/InputField";
import { Link } from "react-router-dom";
import "./RegisterForm.css";
import { useToast } from '../../components/ToastContext/ToastContext';

export default function RegisterForm() {
  const navigate = useNavigate();
  const addToast = useToast();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      addToast("Passwords do not match!", "error");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        addToast("Registration successful! Please login.", "success");
        navigate("/login"); 
      } else {
        const errorData = await response.json();
        addToast("Error: " + JSON.stringify(errorData), "error");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  return (
    <AuthLayout title={"Create Account"}>
      <form className="auth-form" onSubmit={handleSubmit}>
        <InputField label="Username" name="username" value={formData.username} onChange={handleChange} />
        <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
        <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
        <InputField label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
        
        <div className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
        <button type="submit" className="main-button base-button">Sign Up</button>
      </form>
    </AuthLayout>
  );
}