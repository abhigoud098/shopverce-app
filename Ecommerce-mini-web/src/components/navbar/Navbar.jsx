import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="nav-container">
        <h1 className="nav-logo">ShopVerse</h1>
        <input type="text" placeholder="Search product" className="input" />
        <ul>
          <li>Home</li>
          <li>Product</li>
          <li>Cart</li>
          {/* <Link to="/home">Home</Link>;
     <Link to="/products">Product</Link>;
     <Link to="/cart">Cart</Link>; */}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
