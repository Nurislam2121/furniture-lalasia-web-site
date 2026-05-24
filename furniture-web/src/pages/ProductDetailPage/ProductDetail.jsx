import { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import "./ProductDetail.css";
import Section from "../../components/SectionContainer/SectionContainer";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useToast } from '../../components/ToastContext/ToastContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const addToast = useToast();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/items/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      addToast("Please login to add items to cart", "error");
      navigate("/login")
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1,
        }),
      });

      if (response.ok) {
        addToast(`${product.name} added to cart!`, 'success');
        window.dispatchEvent(new Event("storage"));
      } else {
        const errorData = await response.json();
        addToast(errorData.detail || "Error adding to cart", "error");
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      addToast("Something went wrong!", "error");
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (!product) return <div className="error-msg">Product not found!</div>;

  return (
    <>
      <Header />
      <Section>
        <div className="product-detail-container">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail-info">
            <h5 className="product-info-category">{product.category_name}</h5>
            <h2 className="product-info-title">{product.name}</h2>

            <p className="product-info-desc">{product.full_description}</p>

            <h2 className="product-info-price">${product.price}</h2>

            <div className="button-container">
              <button className="product-buy-btn base-button">Buy Now</button>
              <button
                className="add-cart-btn base-button"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
}
