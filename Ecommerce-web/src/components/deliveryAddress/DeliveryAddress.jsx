import { useState } from "react";
import "./DeliveryAddress.css";

function DeliveryAddress() {
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    pincode: "",
  });

  const [isAddressSaved, setIsAddressSaved] = useState(false);

  function handleChange(e) {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit() {
    setIsAddressSaved(true);
  }

  return (
    <div className="checkout-card">
      <h3>Delivery Address</h3>

      {!isAddressSaved ? (
        <>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="Mobile Number"
            onChange={handleChange}
          />
          <input
            name="addressLine"
            placeholder="Address"
            onChange={handleChange}
          />
          <input
            name="city"
            placeholder="City"
            onChange={handleChange}
          />
          <input
            name="pincode"
            placeholder="Pincode"
            onChange={handleChange}
          />

          <button className="save-btn" onClick={handleSubmit}>
            Save Address
          </button>
        </>
      ) : (
        <>
          <p><strong>{address.name}</strong></p>
          <p>{address.phone}</p>
          <p>{address.addressLine}</p>
          <p>{address.city} - {address.pincode}</p>

          <button className="change-btn" onClick={() => setIsAddressSaved(false)}>
            Change Address
          </button>
        </>
      )}
    </div>
  );
}

export default DeliveryAddress;
