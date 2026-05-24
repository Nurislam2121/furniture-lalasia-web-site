import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/loginForm/LoginForm";
import RegisterPage from "./pages/RegisterForm/RegisterForm";
import Main from "./pages/MainPage/Main";
import Product from "./pages/ProductPage/Product";
import ProductDetail from "./pages/ProductDetailPage/ProductDetail";
import Service from "./pages/ServicesPage/Service";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { ToastProvider } from "./components/ToastContext/ToastContext";

function App() {
  return (
    <ToastProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<Main />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/services" element={<Service />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
