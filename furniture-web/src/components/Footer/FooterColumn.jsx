import { Link } from "react-router-dom";

export default function FooterColumn({ title, links }) {
  return (
    <div className="footer-column">
      <h4>{title}</h4>
      <ul className="footer-links">
        {links.map((link, index) => (
          <li key={index}>
            <Link to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}>
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
