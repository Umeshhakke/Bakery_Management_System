import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import cake from "../assets/cake.jpg";
import cupcake from "../assets/cupcake.jpg";
import khari from "../assets/khari.jpg";
import pav from "../assets/pav.jpg";
import {getRequestHeader , API_URL} from "../utils/api";
import logo from "../assets/logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [SuccessAlert, setSuccessAlert] = useState("");

  const navigate = useNavigate();

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Check basic email format
    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // if (!emailPattern.test(email)) {
    //   alert("Please enter a valid email address.");
    //   return;
    // }

    // Allowed email domains
    // const allowedDomains = [
    //   "gmail.com",
    //   "outlook.com",
    //   "hotmail.com",
    //   "yahoo.com",
    // ];

    // const domain = email.split("@")[1].toLowerCase();

    // if (!allowedDomains.includes(domain)) {
    //   alert("Please enter a valid email domain.");
    //   return;
    // }

    // Temporary login
    const response = await fetch(`${API_URL}/auth/login` , {method:"POST" , headers : getRequestHeader(true) , body: JSON.stringify({ username:email, password })});
    const data = await response.json();

    if(!response.ok){
      throw new Error(data.message || 'Authentication failed');
    }

    localStorage.setItem('token',data.token);
    localStorage.setItem('user' , JSON.stringify(data.user));
    setSuccessAlert('Login successful! Access granted.');

    setTimeout(() => {
        window.location.href = '/menu';
      }, 1000);
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
            <img src={cake} alt="Fresh cake" />
          </div>

          <div className="collage-image image-two">
            <img src={cupcake} alt="Cupcake" />
          </div>

          <div className="collage-image image-three">
            <img src={khari} alt="Khari" />
          </div>

          <div className="collage-image image-four">
            <img src={pav} alt="Fresh pav" />
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
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img
                src={logo}
                                alt=""
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

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="login-input-group">

              <label>
                Email Address
              </label>

              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </div>


            {/* LOGIN OPTIONS */}

            <div className="login-options">

              <label className="remember-me">

                <input type="checkbox" />

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