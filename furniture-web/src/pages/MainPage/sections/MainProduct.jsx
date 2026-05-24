import { useRef, useState, useEffect } from "react";

import ProductCard from "../../../components/ProductCard/ProductCard";
import Section from "../../../components/SectionContainer/SectionContainer";
import "./MainProduct.css";
import LeftArrow from "../../../assets/arrow-left.svg";
import RightArrow from "../../../assets/arrow-right.svg";

export default function MainProduct() {
    const [popularProducts, setPopularProducts] = useState([]);
    const carouselRef = useRef(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/items/")
            .then((res) => res.json())
            .then((data) => {
                const popular = data.filter(item => item.is_popular === true);
                setPopularProducts(popular);
            })
            .catch((err) => console.error("Ошибка загрузки популярных товаров:", err));
    }, []);

    const scroll = (direction) => {
        if (carouselRef.current) {
            const { current } = carouselRef;
            const scrollAmount = 400;

            if (direction === "left") {
                current.scrollLeft -= scrollAmount;
            } else {
                current.scrollLeft += scrollAmount;
            }
        }
    }

    return (
        <Section>
            <div className="main-product-container">
                <div className="main-product-title">
                    <h5>Product</h5>
                    <h2>Our popular product</h2>
                </div>
                <p className="main-product-desc">
                    Pellentesque etiam blandit in tincidunt at donec. Eget ipsum dignissim
                    placerat nisi, adipiscing mauris non purus parturient.
                </p>

                <div className="carousel-wrapper">
                    <div className="product-carousel" ref={carouselRef} style={{ scrollBehavior: 'smooth' }}>
                        {popularProducts.length > 0 ? (
                            popularProducts.map((item) => (
                                <ProductCard
                                    key={item.id}
                                    id={item.id}
                                    image={item.image}
                                    category={item.category_name}
                                    name={item.name}
                                    description={item.short_description}
                                    price={item.price}
                                />
                            ))
                        ) : (
                            <p>Loading popular products...</p>
                        )}
                    </div>

                    {popularProducts.length > 1 && (
                        <>
                            <button className="arrow-button left" onClick={() => scroll("left")}>
                                <img src={LeftArrow} alt="left" />
                            </button>
                            <button className="arrow-button right" onClick={() => scroll("right")}>
                                <img src={RightArrow} alt="right" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </Section>
    );
}