import { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://dummyjson.com/products");
      const result = await res.json();

      setData(result);
    };

    fetchProducts();
  }, []);

  console.log(data);

  return (
    <>
      <div className="main-content-container">
        {data?.products?.map((product) => (
          <div className="hero-banner">
            <img src={product?.images[0]} alt="banner" className="hero-image" />

            <div className="hero-overlay">
              <h1>Starting ₹{product?.price}</h1>
              <p className="subtitle">{product?.title}</p>

              <div className="brands">
                <span>{product?.brand}</span>
                <span id="availabilityStatus">
                  {product?.availabilityStatus}
                </span>
              </div>

              <button className="shop-btn">Shop Now</button>
            </div>

            <button className="nav left">‹</button>
            <button className="nav right">›</button>
          </div>
        ))}
        {/* <div className="still-you-want">
          <div className="product-component">Product</div>
          <div className="product-component"></div>
          <div className="product-component"></div>
          <div className="product-component"></div>
          <div className="product-component"></div>
          <div className="product-component"></div>
        </div> */}
      </div>
    </>
  );
}

export default Home;
