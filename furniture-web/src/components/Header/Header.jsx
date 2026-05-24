import { useState, useEffect } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import userIcon from "../../assets/user.svg";
import bag from "../../assets/bag.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ProductImage from "../../assets/product1.jpg";
import { useToast } from "../ToastContext/ToastContext";

export default function Header() {
  const navigate = useNavigate();
  const addToast = useToast();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [currentUser, setCurrentUser] = useState(null);

  const [cartData, setCartData] = useState({ items: [], total_price: 0 });

  const fetchCart = async () => {
    const token = localStorage.getItem("access");
    
    if (!token) {
        setCartData({ items: [], total_price: 0 });
        return;
    }

    try {
        const res = await fetch("http://127.0.0.1:8000/api/cart/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            const data = await res.json();
            setCartData(data || { items: [], total_price: 0 });
        } else if (res.status === 401) {
            setCartData({ items: [], total_price: 0 });
        }
    } catch (err) {
        console.error("Cart fetch error:", err);
        setCartData({ items: [], total_price: 0 });
    }
};

  useEffect(() => {
    fetchCart();
  }, [isCartOpen]);

  useEffect(() => {
    if (isProfileOpen && !currentUser) {
      const token = localStorage.getItem("access");
      if (token) {
        fetch("http://127.0.0.1:8000/api/me/", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => setCurrentUser(data))
          .catch(() => setCurrentUser(null));
      }
    }
  }, [isProfileOpen]);

  const handleRemoveFromCart = async (itemId) => {
    const token = localStorage.getItem("access");
    if (!token) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/cart/item/${itemId}/`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.ok) {
        fetchCart();
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("access");
    if (!token) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/checkout/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        addToast(
          "Заказ оформлен! Инструкции отправлены на вашу почту.",
          "success",
        );

        setCartData({ items: [], total_price: 0 });

        setIsCartOpen(false);
      } else {
        addToast("Ошибка при оформлении заказа", "error");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      addToast("Не удалось связаться с сервером", "error");
    }
  };

  useEffect(() => {
    if (currentUser) {
      setTempData({
        username: currentUser.username,
        email: currentUser.email,
        password: "********",
      });
    }
  }, [currentUser]);

  const handleSave = async () => {
    const token = localStorage.getItem("access");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/me/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: tempData.username,
          email: tempData.email,
          password:
            tempData.password === "********" ? undefined : tempData.password,
        }),
      });
      if (response.ok) {
        const updated = await response.json();
        setCurrentUser(updated);
        setIsEditing(false);
        addToast("Profile updated!", "success");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  useEffect(() => {
    document.body.style.overflow =
      isCartOpen || isProfileOpen ? "hidden" : "auto";
  }, [isCartOpen, isProfileOpen]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setCurrentUser(null);
    setIsProfileOpen(false);
    navigate("/login");
  };

  return (
    <header>
      <div className="logo">
        <Link to="/home">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <nav className="header-navigation">
        <ul className="header-nav">
          <li>
            <NavLink to="/home" className="nav-item">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className="nav-item">
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/product" className="nav-item">
              Product
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="header-actions">
        <button
          className="actions cart-button"
          onClick={() => setIsCartOpen(true)}
        >
          <img src={bag} alt="Cart" />
          {cartData.items.length > 0 && (
            <span className="cart-badge">
              {cartData.items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </button>

        <button className="actions" onClick={() => setIsProfileOpen(true)}>
          <img src={userIcon} alt="Profile" />
        </button>
      </div>

      {isCartOpen && (
        <div className="modal-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cart-modal-header">
              <h2>Your Cart</h2>
              <button
                className="close-btn"
                onClick={() => setIsCartOpen(false)}
              >
                &times;
              </button>
            </div>

            <div className="cart-modal-content">
              <p className="cart-count-text">
                You have{" "}
                {cartData.items.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                items in your cart.
              </p>

              {cartData.items.length > 0 ? (
                cartData.items.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div className="cart-item-info">
                      <div className="temp-img">
                        <img
                          src={
                            item.product.image.startsWith("http")
                              ? item.product.image
                              : `http://127.0.0.1:8000${item.product.image}`
                          }
                          alt={item.product.name}
                        />
                      </div>
                      <div>
                        <h4>{item.product.name}</h4>
                        <span className="cart-item-price">
                          {item.quantity} x ${item.product.price}
                        </span>
                      </div>
                    </div>
                    <button
                      className="remove-item"
                      title="Remove item"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      &times;
                    </button>
                  </div>
                ))
              ) : (
                <p className="empty-cart-msg">Your cart is empty</p>
              )}
            </div>

            <div className="cart-modal-footer">
              <div className="cart-total">
                <span>Total</span>
                <span className="total-price">${cartData.total_price}</span>
              </div>
              <button
                className="base-button checkout-btn"
                onClick={handleCheckout}
                disabled={!cartData?.items || cartData.items.length === 0}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {isProfileOpen && (
        <div className="modal-overlay" onClick={() => setIsProfileOpen(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{currentUser ? "User Profile" : "Welcome"}</h2>
              <button
                className="close-btn"
                onClick={() => setIsProfileOpen(false)}
              >
                &times;
              </button>
            </div>

            <div className="profile-content">
              {currentUser ? (
                <>
                  <div className="profile-field">
                    <label>Username</label>
                    <input
                      type="text"
                      value={tempData.username}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setTempData({ ...tempData, username: e.target.value })
                      }
                      className={isEditing ? "editable-input" : ""}
                    />
                  </div>

                  <div className="profile-field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={tempData.email}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setTempData({ ...tempData, email: e.target.value })
                      }
                      className={isEditing ? "editable-input" : ""}
                    />
                  </div>

                  <div className="profile-field password-field">
                    <label>Password</label>
                    <div className="input-wrapper">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={tempData.password}
                        readOnly={!isEditing}
                        onChange={(e) =>
                          setTempData({ ...tempData, password: e.target.value })
                        }
                      />
                      <button
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  <div className="profile-actions-btns">
                    {isEditing ? (
                      <button
                        className="edit-data-btn save-btn"
                        onClick={handleSave}
                      >
                        Save Changes
                      </button>
                    ) : (
                      <button
                        className="edit-data-btn"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </button>
                    )}
                    <button className="logout-btn-modal" onClick={handleLogout}>
                      Log Out
                    </button>
                  </div>
                </>
              ) : (
                <div className="auth-prompt">
                  <p>Please log in to see your profile and orders.</p>
                  <Link to="/login" onClick={() => setIsProfileOpen(false)}>
                    <button className="main-button base-button">Login</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
