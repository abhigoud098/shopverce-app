import "./Cart.css";

function Cart() {
  const cartItems = [
    {
      id: 1,
      title: "Wireless Headphones",
      price: 2999,
      image: "https://i.imgur.com/ZANVnHE.png",
      quantity: 1,
    },
    {
      id: 2,
      title: "Smart Watch",
      price: 4999,
      image: "https://i.imgur.com/8zQZ9Yy.png",
      quantity: 2,
    },
  ];

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = subtotal > 5000 ? 0 : 199;
  const total = subtotal + delivery;

  return (
    <div className="cart-page">
      {/* LEFT */}
      <div className="cart-items">
        <h2>Your Cart</h2>

        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.title} />

            <div className="item-info">
              <h4>{item.title}</h4>
              <p>₹{item.price}</p>

              <div className="quantity">
                <button>-</button>
                <span>{item.quantity}</span>
                <button>+</button>
              </div>

              <button className="remove">Remove</button>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="cart-summary">
        <h3>Order Summary</h3>

        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="summary-row">
          <span>Delivery</span>
          <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
        </div>

        <hr />

        <div className="summary-row total">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
