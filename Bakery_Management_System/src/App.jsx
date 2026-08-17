import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuPage from "./pages/MenuPage";
import OrderSummary from "./pages/OrderSummary";
import Profile from "./pages/Profile";
import Order from "./pages/Order";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminOrders from "./pages/Admin/AdminOrders";
import DeliveryLogin from "./pages/Delivery/DeliveryLogin";
import DeliveryRegister from "./pages/Delivery/DeliveryRegister";
import DeliveryDashboard from "./pages/Delivery/DeliveryDashboard";
import UserOrderDetails from "./pages/UserOrderDetails";
import OrdersDashboard from "./pages/OrdersDashboard";

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("bakeryCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("bakeryCart", JSON.stringify(cart));
  }, [cart]);

  const clearCart = () => setCart([]);


  // =====================================================
  // ADD TO CART
  // =====================================================

  const addToCart = (item) => {

    const existingItem = cart.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItem) {

      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1
              }
            : cartItem
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...item,
          quantity: 1
        }
      ]);

    }
  };


  // =====================================================
  // INCREASE QUANTITY
  // =====================================================

  const increaseQuantity = (id) => {

    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    );

  };


  // =====================================================
  // DECREASE QUANTITY
  // =====================================================

  const decreaseQuantity = (id) => {

    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );

  };


  return (

    <BrowserRouter>

      <Routes>

        {/* =============================================
            LOGIN
        ============================================== */}

        <Route
          path="/"
          element={<Login />}
        />


        {/* =============================================
            REGISTER
        ============================================== */}

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =============================================
            MENU
        ============================================== */}

        <Route
          path="/menu"
          element={
            <MenuPage
              addToCart={addToCart}
              cart={cart}
            />
          }
        />


        {/* =============================================
            ORDER SUMMARY / CART
        ============================================== */}

        <Route
          path="/order"
          element={
            <OrderSummary
              cart={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          }
        />

         <Route
        path="/profile"
        element={<Profile />}
      />
        <Route
          path="/my-orders/:id"
          element={<UserOrderDetails />}
        />
        {/* ADMIN ROUTES */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />
        <Route
          path="/admin/products"
          element={<AdminProducts />}
        />
        <Route
          path="/admin/users"
          element={<AdminUsers />}
        />
        <Route
          path="/admin/orders"
          element={<AdminOrders />}
        />
        {/* DELIVERY ROUTES */}
        <Route
          path="/delivery/login"
          element={<DeliveryLogin />}
        />
        <Route
          path="/delivery/register"
          element={<DeliveryRegister />}
        />
        <Route
          path="/delivery/dashboard"
          element={<DeliveryDashboard />}
        />
        {/* ORDER DETAILS */}
        <Route
          path="/order-details"
          element={
            <Order
              cart={cart}
              clearCart={clearCart}
            />
          }
        />


        {/* =============================================
            STAFF / ORDER DASHBOARD
        ============================================== */}

        <Route
          path="/orders-dashboard"
          element={<OrdersDashboard />}
        />


        {/* =============================================
            FALLBACK
        ============================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;