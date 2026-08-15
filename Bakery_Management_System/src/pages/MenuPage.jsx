import { Link } from "react-router-dom";
import Menu from "../components/Menu";

function MenuPage({ addToCart, cart }) {

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">

        <div className="brand">

          <div className="brand-icon">
            🥐
          </div>

          <div>
            <h1>Sweet Crust</h1>
            <p>Fresh from our oven to your table</p>
          </div>

        </div>

        {/* CART BUTTON */}
         <div className="header-actions">

         <Link to="/profile" className="profile-button">
          👤 Profile
         </Link>

         <Link to="/order" className="cart-button">
          🛒 Cart

           <span>
            {cartCount}
           </span>
        </Link>

       </div>

      </header>


      {/* MENU */}
      <main className="menu-page">

        <div className="section-heading">

          <span>OUR MENU</span>

          <h2>
            Choose your favourite treat
          </h2>

        </div>

        <Menu addToCart={addToCart} />

      </main>

    </div>
  );
}

export default MenuPage;