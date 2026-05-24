import { Search } from "lucide-react";
import "./SearchField.css"

export default function SearchField({ onSearchChange }) {
  return (
    <div className="search-container">
      <div className="search-icon">
        <Search size={24} color="#AFADB5" />
      </div>

      <input
        type="text"
        className="search-input"
        placeholder="Search property"
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <button className="search-button base-button">Search</button>
    </div>
  );
}