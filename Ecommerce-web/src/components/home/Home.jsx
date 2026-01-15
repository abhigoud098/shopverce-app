import { useContext, useEffect, useState } from "react";
import ProductCard from "../productCard/ProductCard";
import "./Home.css";
import ApiContext from "../../context/apiContext";

function Home() {
  const { data, searchItem, searchQuery } = useContext(ApiContext);
  console.log(searchQuery);

  const [startProduct] = useState(() => Math.floor(Math.random() * 30));
  const [productNum, setProductNum] = useState(startProduct);

  const isSearchActive = searchItem.trim().length > 0;
  const products = data?.products || [];

  useEffect(() => {
    if (isSearchActive || products.length === 0) return;

    const timer = setInterval(() => {
      setProductNum((prev) =>
        prev === startProduct + 3 ? startProduct : prev + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [startProduct, isSearchActive, products.length]);

  // Loading UI AFTER hooks
  if (products.length === 0) {
    return <h2>Loading...</h2>;
  }
  const search = searchQuery.toLowerCase();

  const filteredProducts = search
    ? products.filter((product) =>
        product.title.toLowerCase().startsWith(search)
      )
    : [];

  const product = products[productNum];

  // 🔍 SEARCH VIEW
  if (isSearchActive) {
    return (
      <div className="still-you-want">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div className="product-component" key={item.id}>
              <ProductCard data={item} />
            </div>
          ))
        ) : (
          <h3>No products found</h3>
        )}
      </div>
    );
  }

  return (
    <div className="main-content-container">
      <div className="hero-banner">
        <img src={product?.images?.[0]} alt="banner" className="hero-image" />

        <div className="hero-overlay">
          <h1>Starting ₹{product?.price}</h1>
          <h4 className="subtitle">{product?.title}</h4>

          <div className="brands">
            <span>{product?.brand}</span>
            <span id="availabilityStatus">{product?.availabilityStatus}</span>
          </div>

          <button className="shop-btn">Shop Now</button>
        </div>
      </div>

      <div className="still-you-want">
        {products.slice(0, 6).map((item) => (
          <div className="product-component" key={item.id}>
            <ProductCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
