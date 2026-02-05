import { useContext } from "react";
import ApiContext from "../../context/ApiContext";
import ProductCard from "../../components/productCard/ProductCard";
import "./Product.css";

function Product() {
  const { data, searchItem } = useContext(ApiContext);

  const isSearchActive = searchItem.trim().length > 0;
  const products = data?.products || [];

  // Loading UI AFTER hooks
  if (products.length === 0) {
    return <h2>Loading...</h2>;
  }

  const search = searchItem.trim().toLowerCase();

  const filteredProducts = search
    ? products.filter((product) =>
        product.title.toLowerCase().startsWith(search),
      )
    : [];

  // 🔍 SEARCH VIEW
  if (isSearchActive) {
    return (
      <div className="main-container">
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
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="still-you-want">
        {products.slice(0, 30).map((item) => (
          <div className="product-component" key={item.id}>
            <ProductCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
