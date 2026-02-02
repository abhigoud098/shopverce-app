import { useState, useEffect, useContext } from "react";
import "./Checkout.css";
import { Link, useNavigate } from "react-router-dom";
import DeliveryAddress from "../deliveryAddress/DeliveryAddress";
import { toast, ToastContainer } from "react-toastify";
import ApiContext from "../../context/ApiContext";

function Checkout() {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [savedAddress, setSavedAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const { them } = useContext(ApiContext);
  const navigate = useNavigate();

  const productInfo = JSON.parse(localStorage.getItem("cartItems")) || [];
  const address = JSON.parse(localStorage.getItem("userAddress")) || [];

  const subtotal = Math.floor(
    productInfo.reduce((total, item) => total + item.price * item.quantity, 0),
  );

  useEffect(() => {
    if (savedAddress) {
      const stored = JSON.parse(localStorage.getItem("userAddress")) || [];
      localStorage.setItem(
        "userAddress",
        JSON.stringify([...stored, savedAddress]),
      );
    }
  }, [savedAddress]);

  function handleDeleteAddress(index) {
    const updated = address.filter((_, i) => i !== index);
    localStorage.setItem("userAddress", JSON.stringify(updated));
    window.location.reload();
  }

  const originalTotal = productInfo.reduce((total, item) => {
    const originalPrice = item.discountPercentage
      ? item.price / (1 - item.discountPercentage / 100)
      : item.price;
    return total + originalPrice * item.quantity;
  }, 0);

  const discount = Math.max(originalTotal - subtotal, 0);
  const delivery = subtotal > 500 ? 0 : 99;
  const total = Math.floor(subtotal + delivery);

 function showPaymentSuccess() {
  toast.loading("Processing payment...");

  setTimeout(() => {
    toast.dismiss();
    toast.success("Payment successful!");

    setTimeout(() => {
      navigate("/app");
    }, 5000); 
  }, 3000);
}

  function addressadd() {
    setShowAddressModal(true);
  }

  return (
    <>
      <ToastContainer position="top-right" theme="colored" />

      <div className={`checkout-wrapper ${them ? "dark" : ""}`}>
        {/* ================= LEFT ================= */}
        <div className="checkout-left">
          <Link to="/app/cart">
            <button className="back-btn">← Back to cart</button>
          </Link>

          {/* ADDRESS */}
          <div className="address-box">
            {address.length > 0 ? (
              address.map((addr, index) => (
                <div className="address-item" key={index}>
                  <div className="address-text">
                    <strong>{addr.name}</strong> · {addr.phone}
                    <br />
                    {addr.addressLine}, {addr.city} – {addr.pincode}
                  </div>

                  <input
                    type="radio"
                    name="selectedAddress"
                    checked={selectedAddress?.phone === addr.phone}
                    onChange={() => setSelectedAddress(addr)}
                  />

                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteAddress(index)}
                  >
                    🗑
                  </button>
                </div>
              ))
            ) : (
              <p>No saved address</p>
            )}
            <button className="addAddress" onClick={addressadd}>
              +
            </button>
          </div>

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

          {/* PAYMENT */}
          <div className="section">
            <h4>Card Payment</h4>

            <div className="payment-methods">
              <button className="pay">
                <img src="../src/assets/visa.png" alt="visa" />
              </button>
              <button className="pay">
                <img src="../src/assets/rupay.png" alt="rupaya" />
              </button>
            </div>

            <input placeholder="Name on card" />
            <input placeholder="Card number" />

            <div className="card-row">
              <input placeholder="MM / YY" />
              <input placeholder="CVV" />
            </div>
          </div>

          <div className="section">
            <h4>UPI Payment</h4>

            <div className="payment-methods">
              <button className="pay">
                <img src="../src/assets/phonepe.svg" alt="UPI" />
              </button>
              <button className="pay">
                <img src="../src/assets/googlepay.svg" alt="" />
              </button>
              <button className="pay">
                <img src="../src/assets/paytm.svg" alt="" />
              </button>
            </div>

            <input
              class="upiInput"
              type="text"
              placeholder="Enter your UPI Id"
            />
          </div>

          <button className="confirm" onClick={showPaymentSuccess}>
            Confirm Payment ${total}
          </button>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="checkout-right">
          <h4>Order Summary</h4>

          {productInfo.map((item) => (
            <div className="summary-item" key={item.id}>
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}

          <hr />

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>{delivery === 0 ? "Free" : `$${delivery}`}</span>
          </div>

          <div className="summary-row">
            <span>Discount</span>
            <span>- ${discount.toFixed(0)}</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Order Total</span>
            <span>${total}</span>
          </div>

          <div className="saving">🎉 You saved ${discount.toFixed(0)}</div>

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
