import { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import ApiContext from "../../context/apiContext";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const { searchItem, setSearchItem, setSearchQuery, user, setUser } =
    useContext(ApiContext);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(searchItem.trim());
      setSearchItem("");
    }
  };

  // // fake login (UI only)
  // const handleLogin = () => {
  //   setUser({
  //     name: "Abhishek",
  //     email: "abhishek@gmail.com",
  //   });
  // };

  // const handleLogout = () => {
  //   setUser(null);
  // };

  return (
    <div className="nav-container">
      <h1 className="nav-logo">ShopVerse</h1>

      <input
        type="text"
        placeholder="Search product"
        className="input"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <ul className="nav-links">
        <Link to="/app">Home</Link>
        <Link to="/app/product">Product</Link>
        <Link to="/app/cart">Cart</Link>
      </ul>

      {/* <div className="auth-section">
        {!user ? (
          <>
            <button className="login-btn">Login</button>
          </>
        ) : (
          <div className="profile">
            <FaUserCircle className="profile-icon" />
            <div className="profile-dropdown">
              <p className="name">{user.name}</p>
              <p className="email">{user.email}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
}

export default Navbar;
