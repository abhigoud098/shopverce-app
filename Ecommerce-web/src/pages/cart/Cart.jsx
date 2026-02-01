import { useContext } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import ApiContext from "../../context/ApiContext";

function Cart() {
  const productInfo = JSON.parse(localStorage.getItem("cartItems")) || [];
  const { them } = useContext(ApiContext);

  function removeItem(itemId) {
    const updatedCart = productInfo.filter((item) => item.id !== itemId);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    location.reload();
  }

  function quantityIncrease(itemId) {
    const updatedCart = productInfo.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    location.reload();
  }

  function quantityDecrease(itemId) {
    const updatedCart = productInfo.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    location.reload();
  }

  const subtotal = Math.floor(
    productInfo.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );

  const delivery = subtotal > 500 ? 0 : 99;
  const total = subtotal + delivery;

  return (
    <div className={`cart-page ${them ? "dark" : "light"}`}>
      {/* LEFT */}
      <div className="cart-items">
        <h2>Your Cart</h2>

        {productInfo.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item?.images[0]} alt={item.title} />

            <div className="item-info">
              <h4>{item.title}</h4>
              <p>${item.price}</p>
              <h5>Discount: {item.discountPercentage}%</h5>
              <p>{item.returnPolicy}</p>

              <div className="quantity">
                <button onClick={() => quantityDecrease(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => quantityIncrease(item.id)}>+</button>
              </div>

              <button className="remove" onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="cart-summary">
        <h3>Order Summary</h3>

        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>

        <div className="summary-row">
          <span>Delivery</span>
          <span>{delivery === 0 ? "Free" : `$${delivery}`}</span>
        </div>

        <hr />

        <div className="summary-row total">
          <span>Total</span>
          <span>${total}</span>
        </div>

        <Link to="/app/checkout">
          <button className="checkout-btn">Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
