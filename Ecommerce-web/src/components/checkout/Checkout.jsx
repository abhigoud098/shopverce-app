import { useState } from "react";
import "./Checkout.css";
import { Link, useNavigate } from "react-router-dom";
import DeliveryAddress from "../deliveryAddress/DeliveryAddress";
import { toast, ToastContainer } from "react-toastify";

function Checkout() {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [savedAddress, setSavedAddress] = useState(null);
  const navigate = useNavigate();
  const productInfo = JSON.parse(localStorage.getItem("cartItems")) || [];

  const subtotal = Math.floor(productInfo.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  ));

  const originalTotal = productInfo.reduce((total, item) => {
    const originalPrice = item.discountPercentage
      ? item.price / (1 - item.discountPercentage / 100)
      : item.price;

    return total + originalPrice * item.quantity;
  }, 0);

  const discount = Math.max(originalTotal - subtotal, 0);
  const delivery = subtotal > 500 ? 0 : 99;
  const total = Math.floor(subtotal + delivery);

  function sowPaymentSuccess() {
    toast.success("Payment successfully!");
    navigate("/app");
  }

  return (
    <>
      <ToastContainer position="top-right" theme="colored" />

      <div className="checkout-wrapper">
        {/* LEFT */}
        <div className="checkout-left">
          <Link to="/app/cart">
            <button className="back-btn">← Back</button>
          </Link>

          {/* Address box */}
          <div className="section">
            <h4>Shipping address</h4>

            <div className="address-box">
              {savedAddress ? (
                <>
                  <strong>{savedAddress.name}</strong>, {savedAddress.phone}
                  <br />
                  {savedAddress.addressLine}, {savedAddress.city} -{" "}
                  {savedAddress.pincode}
                </>
              ) : (
                "No address added"
              )}

              <span className="edit" onClick={() => setShowAddressModal(true)}>
                ✎
              </span>
            </div>
          </div>

          {/* Address Modal */}
          {showAddressModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <DeliveryAddress
                  onSave={(address) => {
                    setSavedAddress(address);
                    setShowAddressModal(false);
                  }}
                  onClose={() => setShowAddressModal(false)}
                />
              </div>
            </div>
          )}

          {/* Payment */}
          <div className="section">
            <h4>Payment information</h4>

            <div className="payment-methods">
              <button className="pay active">💳</button>
              <button className="pay">PayPal</button>
              <button className="pay">Klarna</button>
            </div>

            <input placeholder="Name on card" />
            <input placeholder="Card number" />

            <div className="card-row">
              <input placeholder="MM/YY" />
              <input placeholder="CVV" />
            </div>
          </div>

          <div className="actions">
            <button className="confirm" onClick={sowPaymentSuccess}>
              Confirm Payment ₹{total}
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="checkout-right">
          <h4>Order Summary</h4>

          {productInfo.map((item) => (
            <div className="summary-item" key={item.id}>
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

          <div className="summary-row">
            <span>Discount</span>
            <span>- ₹{discount.toFixed(0)}</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Order Total</span>
            <span>₹{total}</span>
          </div>

          <div className="saving">
            🎉 You saved ₹{discount.toFixed(0)} on this order
          </div>

          <div className="coupon">
            <input placeholder="Coupon code" />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
