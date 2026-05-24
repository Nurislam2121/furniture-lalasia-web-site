import "./ProductCard.css";
import { Link } from "react-router-dom";

export default function ProductCard({
  id,
  image,
  category,
  name,
  description,
  price,
}) {
  return (
    <Link to={`/product/${id}`} className="product-card-link">
      <div className="product-card">
        <img src={image} alt={name} />
        <h5 className="product-category">{category}</h5>
        <h3>{name}</h3>
        <p>{description}</p>
        <h3>${price}</h3>
      </div>
    </Link>
  );
}