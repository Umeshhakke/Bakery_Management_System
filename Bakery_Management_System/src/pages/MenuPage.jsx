import Menu from "../components/Menu";
import Header from "../components/Header";

function MenuPage({ addToCart, cart }) {

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="app">

      <Header cartCount={cartCount} />

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