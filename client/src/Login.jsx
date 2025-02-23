

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Signup.css'; // Custom styles
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


// const handleSubmit = (e) => {
//   e.preventDefault();
//   axios
//     .post("http://localhost:3001/login", { email, password })
//     .then((result) => {
//       console.log("Response from server:", result.data);
//       if (result.data.message === "Login successful") {
//         alert("Login successful");

//         // Store user ID in localStorage
//         localStorage.setItem("userId", result.data.userId);

//         navigate("/home");
//       } else {
//         alert(result.data.error || "Invalid credentials");
//       }
//     })
//     .catch((err) => {
//       console.error("Login error:", err);
//       alert("An error occurred. Please try again.");
//     });
// };

const handleSubmit = (e) => {
  e.preventDefault();
  axios
    .post("http://localhost:3001/login", { email, password }, { withCredentials: true }) // Ensure cookies are sent
    .then((result) => {
      console.log("Response from server:", result.data);
      if (result.data.message === "Login successful") {
        alert("Login successful");

        // ✅ Store user object in localStorage
        sessionStorage.setItem("user", JSON.stringify(result.data.user));

        navigate("/home");
      } else {
        alert(result.data.error || "Invalid credentials");
      }
    })
    .catch((err) => {
      console.error("Login error:", err);
      alert("An error occurred. Please try again.");
    });
};


  return (
    <div
    className="d-flex justify-content-center align-items-center vh-100"
    style={{
      backgroundImage: "url('images/bg8.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
      <div className="bg-white p-4 rounded shadow w-25">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <center><button type="submit" className="custom-button">
            Login
          </button></center>
        </form>
      </div>
    </div>
  );
}

export default Login;
