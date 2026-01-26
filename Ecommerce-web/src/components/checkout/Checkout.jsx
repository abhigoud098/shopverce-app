import "./Checkout.css";
import { Link } from "react-router-dom";

function Checkout() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const delivery = subtotal > 500 ? 0 : 99;
  const total = subtotal + delivery;

  return (
    <div className="checkout-page">
      {/* LEFT */}
      <div className="checkout-left">
        <h2>Checkout</h2>

        {/* Address */}
        <Link to="/app/DeliveryAddress">
          <button className="addAddress-btn">Add your Address</button>
        </Link>

        {/* Payment */}
        <div className="checkout-card">
          <h3>Payment Method</h3>
          <label>
            <input type="radio" name="payment" /> Cash on Delivery
          </label>
          <label>
            <input type="radio" name="payment" /> Card / UPI
          </label>
        </div>
      </div>

      {/* RIGHT */}
      <div className="checkout-right">
        <h3>Order Summary</h3>

        {cartItems.map((item) => (
          <div key={item.id} className="summary-item">
            <span>
              {item.title} × {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <hr />

        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="summary-row">
          <span>Delivery</span>
          <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
        </div>

        <div className="summary-row total">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button className="place-order-btn">Place Order</button>
      </div>
    </div>
  );
}

export default Checkout;
