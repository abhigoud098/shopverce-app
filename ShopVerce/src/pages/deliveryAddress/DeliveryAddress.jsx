import { useState } from "react";
import "./DeliveryAddress.css";

function DeliveryAddress({ onSave, onClose }) {

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    pincode: "",
  });

  function handleChange(e) {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit() {
    onSave(address);
    location.reload();
  }

  return (
    <div className="checkout-card">
      <h3 className="diliveryHadding">Delivery Address</h3>

      <input
        name="name"
        placeholder="Full Name"
        value={address.name}
        onChange={handleChange}
      />
      <input
        name="phone"
        placeholder="Mobile Number"
        value={address.phone}
        onChange={handleChange}
      />
      <input
        name="addressLine"
        placeholder="Address"
        value={address.addressLine}
        onChange={handleChange}
      />
      <input
        name="city"
        placeholder="City"
        value={address.city}
        onChange={handleChange}
      />
      <input
        name="pincode"
        placeholder="Pincode"
        value={address.pincode}
        onChange={handleChange}
      />

      <div className="modal-actions">
        <button className="save-btn" onClick={handleSubmit}>
          Save Address
        </button>
        <button className="change-btn" onClick={onClose}>
          Cancel
        </button>
      </div>

      
    </div>
  );
}

export default DeliveryAddress;
