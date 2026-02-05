import { useContext, useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ApiContext from "../../context/ApiContext";
import { RxHamburgerMenu } from "react-icons/rx";
import "./Navbar.css";

function Navbar() {
  const { user, setUser, searchItem, setSearchItem, setTheam, theam } =
    useContext(ApiContext);

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

  function theamChanger(e) {
    setTheam(e.target.checked);
  }

  return (
    <nav className={`nav-container ${theam ? "dark" : ""}`}>
      <h1 className="nav-logo" onClick={goHomePage}>
        ShopVerse
      </h1>

      <input
        type="text"
        className={`search-input ${theam ? "dark" : ""}`}
        placeholder="Search products..."
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />

      <RxHamburgerMenu className="pageNavigateOption" />

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
         <li>
          <Link to="/app/wishList">WishList</Link>
        </li>
      </ul>

      <div className="toggle-wrapper">
        <input
          className="toggle-checkbox"
          type="checkbox"
          onChange={theamChanger}
        />
        <div className="toggle-container">
          <div className="toggle-button">
            <div className="toggle-button-circles-container">
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
            </div>
          </div>
        </div>
      </div>

      <div className="profile" ref={profileRef}>
        <FaUserCircle
          className={`profile-icone ${theam ? "dark" : ""}`}
          onClick={() => setShowCard(true)}
        />

        {showCard && user && (
          <div className={`account-card ${theam ? "dark" : ""}`}>
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
