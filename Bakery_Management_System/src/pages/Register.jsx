import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getRequestHeader , API_URL } from "../utils/api";
import logo from "../assets/logo.png";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username,setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [SuccessAlert, setSuccessAlert] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !username||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Temporary frontend registration.
    // Later this will connect to your friend's Java API.
    console.log("Customer Registration:", {
      fullName: name,
      user_name:username,
      email: email,
      phone: phone,
      password: password,
    });



    const response = await fetch(`${API_URL}/auth/register` , {method:"POST" , headers:getRequestHeader(true) , body:JSON.stringify({name ,username , password , email , phone })});
    const data = await response.json();

    if(!response.ok){
      throw new Error(data.message || 'Authentication Failed');
    }
    alert("Account created successfully!");


    localStorage.setItem('token',data.token);
    localStorage.setItem('user' , JSON.stringify(data.user));
    setSuccessAlert('Login successful! Access granted.');

    setTimeout(() => {
        window.location.href = '/menu';
      }, 1000);

  };

  

  return (
    <div className="register-page">

      {/* =========================
          LEFT SIDE
      ========================= */}

      <div className="register-visual">

        <div className="register-brand">
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
        </div>

        <div className="register-message">

          <span>WELCOME TO Shakti Urja</span>

          <h1>
            Your favourite
            <br />
            bakery is waiting.
          </h1>

          <p>
            Create your account and make your
            favourite bakery treats just a few
            clicks away.
          </p>

        </div>

        <div className="register-decoration">
          🍰 &nbsp; 🥐 &nbsp; 🧁 &nbsp; 🍪
        </div>

      </div>


      {/* =========================
          RIGHT SIDE
      ========================= */}

      <div className="register-form-section">

        <div className="register-box">

          <div className="register-mobile-logo">
            🥐 Shakti Urja
          </div>

          <div className="register-heading">

            <span>GET STARTED</span>

            <h2>Create your account</h2>

            <p>
              Join Shakti Urja and order your
              favourite treats with ease.
            </p>

          </div>


          <form onSubmit={handleRegister}>

            {/* NAME */}

            <div className="register-input-group">

              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

            </div>
            <div className="register-input-group">

              <label>Username</label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />

            </div>


            {/* EMAIL */}

            <div className="register-input-group">

              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>


            {/* PHONE */}

            <div className="register-input-group">

              <label>Phone Number</label>

              <input
                type="tel"
                placeholder="Enter 10-digit phone number"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                maxLength="10"
                required
              />

            </div>
             

            {/* PASSWORD */}

            <div className="register-input-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="register-input-group">

              <label>Confirm Password</label>

              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                required
              />

            </div>


            <button
              type="submit"
              className="register-submit"
            >
              Create Account
              <span>→</span>
            </button>

          </form>


          <p className="already-account">

            Already have an account?{" "}

            <Link to="/login">
              Login
            </Link>

          </p>


          <p className="register-note">
            🍪 Freshly baked happiness starts here.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;