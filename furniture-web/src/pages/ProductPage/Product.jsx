import React, { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Product.css";
import Section from "../../components/SectionContainer/SectionContainer";
import SearchField from "../../components/SearchField/SearchField";
import ProductCard from "../../components/ProductCard/ProductCard";
import FilterImage from "../../assets/filter.svg";
import SortImage from "../../assets/sort.svg";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const productsPerPage = 9;

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/items/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Ошибка загрузки:", err));
  }, []);

  const categories = ["All", ...new Set(products.map(p => p.category_name))];

  let processedProducts = [...products];

  processedProducts = processedProducts.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedCategory !== "All") {
    processedProducts = processedProducts.filter(
      (item) => item.category_name === selectedCategory
    );
  }

  if (sortOrder === "az") {
    processedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder === "za") {
    processedProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = processedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(processedProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <Section className={"product-section"}>
        <div className="page-header">
          <h1>Products</h1>
          <p>We display products based on the latest products we have...</p>
        </div>

        <div className="search-filter">
          <SearchField onSearchChange={setSearchQuery} />
          
          <div className="custom-select-container">
            <img src={FilterImage} alt="" className="btn-icon select-icon"/>
            <select 
              className="filter-btn base-button"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Categories</option>
              {categories.filter(c => c !== "All").map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="product-info">
          <div className="total-product">
            <h2>Total Product</h2>
            <span>{processedProducts.length}</span> 
          </div>
          
          <div className="custom-select-container">
            <img src={SortImage} alt="" className="btn-icon select-icon"/>
            <select 
              className="sort-btn base-button"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="default">Default Sort</option>
              <option value="az">Alphabet (A-Z)</option>
              <option value="za">Alphabet (Z-A)</option>
            </select>
          </div>
        </div>

        <div className="product-page-container">
          <div className="product-grid">
            {currentProducts.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}              
                image={item.image}
                category={item.category_name} 
                name={item.name}
                description={item.short_description} 
                price={item.price}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="page-arrow"
              >
                &lt;
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`page-number ${currentPage === index + 1 ? "active" : ""}`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="page-arrow"
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </Section>
      <Footer />
    </>
  );
}