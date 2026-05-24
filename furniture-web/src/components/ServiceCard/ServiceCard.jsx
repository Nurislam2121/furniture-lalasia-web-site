import "./ServiceCard.css";

export default function ServiceCard({ number, title, description }) {
  return (
    <div className="service-card">
      {number < 10 ? (
        <h2 className="service-number"> 0{number}</h2>
      ) : (
        <h2 className="service-number">{number}</h2>
      )}
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
    </div>
  );
}
