import { useContext, useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ApiContext from "../../context/ApiContext";
import "./Navbar.css";

function Navbar() {
  const { user, setUser, searchItem, setSearchItem } = useContext(ApiContext);

  const [showCard, setShowCard] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setShowCard(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowCard(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials =
    user?.firstName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  function goHomePage() {
    navigate("/app");
  }

  return (
    <nav className="nav-container">
      <h1 className="nav-logo" onClick={goHomePage}>
        ShopVerse
      </h1>

      <input
        type="text"
        className="search-input"
        placeholder="Search products..."
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />

      <ul className="nav-links">
        <li>
          <Link to="/app">Home</Link>
        </li>
        <li>
          <Link to="/app/product">Product</Link>
        </li>
        <li>
          <Link to="/app/cart">Cart</Link>
        </li>
      </ul>

      <div className="profile" ref={profileRef}>
        <FaUserCircle
          className="profile-icon"
          onClick={() => setShowCard((p) => !p)}
        />

        {showCard && user && (
          <div className="account-card">
            <div className="account-header">My Account</div>

            <div className="account-body">
              <div className="profile-section">
                <div className="avatar">{initials}</div>

                <div className="user-info">
                  <h3>{user.firstName + " " + user.lastName}</h3>
                  <p className="phone">{user.phone}</p>
                  <p className="email">{user.email}</p>

                  <div className="chips">
                    <span className="chip">{user.gender}</span>
                    <span className="chip">Customer</span>
                  </div>
                </div>
              </div>

              <div className="divider" />
              <button className="logout-btn" onClick={handleLogout}>
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
