import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Header.css";

function Header({ cartCount }) {
  return (
    <header className="main-header">

      <div className="header-container">

        {/* LOGO */}
        <div className="header-logo">
          <Link to="/menu">
            <img
              src={logo}
              alt="Shakti Urja Bakery"
            />
          </Link>
        </div>


        {/* SEARCH */}
        <div className="header-search">

          <input
            type="text"
            placeholder="Search for cakes, pastries, breads..."
          />

          <button type="button" aria-label="Search">
            <svg viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16L21 21" />
            </svg>
          </button>

        </div>


        {/* RIGHT SIDE ACTIONS */}
        <div className="header-actions">

          {/* NOTIFICATION */}
          <Link
            to="/notifications"
            className="header-action notification-button"
            aria-label="Notifications"
          >
            <span className="action-icon">

              <svg viewBox="0 0 24 24">
                <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                <path d="M10 21h4" />
              </svg>

            </span>

            <span className="notification-count">
              0
            </span>
          </Link>


          {/* PROFILE */}
          <Link
            to="/profile"
            className="header-action profile-button"
          >
            <span className="action-icon">

              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 20c.8-3.5 3.2-5.5 7-5.5s6.2 2 7 5.5" />
              </svg>

            </span>

            <span className="action-text">
              Profile
            </span>
          </Link>


          {/* ORDERS */}
          <Link
            to="/orders-dashboard"
            className="header-action orders-button"
          >
            <span className="action-icon">

              <svg viewBox="0 0 24 24">
                <path d="M6 3h12v18H6z" />
                <path d="M9 7h6" />
                <path d="M9 11h6" />
                <path d="M9 15h4" />
              </svg>

            </span>

            <span className="action-text">
              Orders
            </span>
          </Link>


          {/* CART */}
          <Link
            to="/order"
            className="header-action cart-button"
          >
            <span className="action-icon">

              <svg viewBox="0 0 24 24">
                <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" />

                <circle cx="9" cy="20" r="1.2" />
                <circle cx="18" cy="20" r="1.2" />
              </svg>

            </span>

            <span className="action-text">
              Cart
            </span>

            <span className="cart-count">
              {cartCount}
            </span>
          </Link>

        </div>

      </div>

    </header>
  );
}

export default Header;