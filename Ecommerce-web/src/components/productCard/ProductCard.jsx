import { useContext, useState } from "react";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import "./ProductCard.css";
import ApiContext from "../../context/ApiContext";

function ProductCard({ data }) {
  const [liked, setLiked] = useState(false);
  const { theam } = useContext(ApiContext);

  const handleShare = async () => {
    const shareUrl = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: data?.title,
        text: data?.description,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied");
    }
  };

  function sendIdOfProduct(id) {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingProduct = storedCartItems.find((item) => item.id === id);
    console.log(existingProduct);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      storedCartItems.push({
        ...data,
        quantity: 1,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(storedCartItems));
  }

  return (
    <div className={`productcard ${theam ? "dark" : ""}`}>
      <div className="image-box">
        <img src={data?.images[0]} alt={data?.brand} />

        {/* TOP RIGHT ICONS */}
        <div className="top-icons">
          <button className="icon-btn" onClick={() => setLiked(!liked)}>
            {liked ? <FaHeart /> : <FaRegHeart />}
          </button>

          <button className="icon-btn" onClick={handleShare}>
            <FaShareAlt />
          </button>
        </div>
      </div>

      <div className="product-info">
        <h3>{data?.title}</h3>
        <p c className={`desc ${theam ? "dark" : ""}`} >{data?.description}</p>

        <div className="rating-price">
          <span className="rating">⭐ {data?.rating}</span>
          <span className="original-price">${data?.price}</span>
        </div>

        <button  className={`cart-btn ${theam ? "dark" : "light"}`} onClick={() => sendIdOfProduct(data.id)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
