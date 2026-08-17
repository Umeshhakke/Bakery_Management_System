import { useState } from "react";
import { Link } from "react-router-dom";

import cake from "../assets/cake.jpg";
import cupcake from "../assets/cupcake.jpg";
import khari from "../assets/khari.jpg";
import pav from "../assets/pav.jpg";

import { getRequestHeader, API_URL } from "../utils/api";
import logo from "../assets/logo.png";

import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [SuccessAlert, setSuccessAlert] = useState("");

  // =========================
  // LOGIN
  // =========================

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check empty fields
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      // Send login request to backend
      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",

          headers: getRequestHeader(true),

          body: JSON.stringify({
            username: email,
            password: password
          })
        }
      );

      const data = await response.json();

      console.log("Login Response:", data);

      // Backend error
      if (!response.ok) {
        throw new Error(
          data.message || "Authentication failed"
        );
      }

      // =========================
      // LOGIN SUCCESS
      // =========================

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setSuccessAlert(
        "Login successful! Access granted."
      );

      alert("Login successful!");

      // Go to menu
      setTimeout(() => {
        window.location.href = "/menu";
      }, 500);

    } catch (error) {
      console.error(
        "Login Error:",
        error
      );

      alert(error.message);
    }
  };

  return (
    <div className="login-page">

      {/* =========================
          LEFT - BAKERY COLLAGE
      ========================= */}

      <div className="login-visual">

        <div className="visual-content">

          <div className="visual-text">

            <span>
              FRESH • WARM • DELICIOUS
            </span>

            <h1>
              A little sweetness
              <br />
              in every bite.
            </h1>

            <p>
              From freshly baked cakes to crispy khari,
              discover your favourite bakery treats.
            </p>

          </div>

        </div>


        {/* IMAGE COLLAGE */}

        <div className="bakery-collage">

          <div className="collage-image image-one">
            <img
              src={cake}
              alt="Fresh cake"
            />
          </div>

          <div className="collage-image image-two">
            <img
              src={cupcake}
              alt="Cupcake"
            />
          </div>

          <div className="collage-image image-three">
            <img
              src={khari}
              alt="Khari"
            />
          </div>

          <div className="collage-image image-four">
            <img
              src={pav}
              alt="Fresh pav"
            />
          </div>

        </div>


        <div className="floating-message">
          ✨ Baked fresh every day
        </div>

      </div>


      {/* =========================
          RIGHT - LOGIN FORM
      ========================= */}

      <div className="login-form-section">

        <div className="login-box">

          <div className="mobile-logo">
            Shakti Urja
          </div>


          <div className="login-heading">

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >

              <img
                src={logo}
                alt="Sweet Crust Logo"
                id="logo"
                style={{
                  width: "100%",
                  maxWidth: "200px",
                  height: "auto",
                  display: "block",
                  margin: "0 auto"
                }}
              />

            </div>


            <span>
              WELCOME BACK
            </span>

            <h2>
              Login to your account
            </h2>

            <p>
              Your favourite treats are waiting for you.
            </p>

          </div>


          {/* =========================
              LOGIN FORM
          ========================= */}

          <form onSubmit={handleLogin}>

            {/* USERNAME / EMAIL */}

            <div className="login-input-group">

              <label>
                Username or Email
              </label>

              <input
                type="text"
                placeholder="Enter your username or email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>


            {/* PASSWORD */}

            <div className="login-input-group">

              <label>
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>


            {/* LOGIN OPTIONS */}

            <div className="login-options">

              <label className="remember-me">

                <input
                  type="checkbox"
                />

                <span>
                  Remember me
                </span>

              </label>


              <button
                type="button"
                className="forgot-password"
                onClick={() =>
                  alert(
                    "Password recovery will be connected later."
                  )
                }
              >
                Forgot password?
              </button>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-submit"
            >
              Login

              <span>
                →
              </span>

            </button>

          </form>


          {/* SUCCESS MESSAGE */}

          {SuccessAlert && (
            <p
              style={{
                color: "green",
                textAlign: "center",
                marginTop: "10px"
              }}
            >
              {SuccessAlert}
            </p>
          )}


          {/* DIVIDER */}

          <div className="login-divider">

            <span>
              OR
            </span>

          </div>


          {/* REGISTER */}

          <p className="register-text">

            Don't have an account?{" "}

            <Link to="/register">
              Create Account
            </Link>

          </p>


          {/* NOTE */}

          <p className="login-note">
            🍪 Freshly baked happiness, just a login away.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;