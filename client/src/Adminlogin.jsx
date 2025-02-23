import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './main.css'

function Adminlogin() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/adminlogin", { email, password })
      .then((result) => {
        if (result.data.message === "Login successful") {
         

          navigate("/adminpage");
        } else {
          alert(result.data.error);
          
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
    className="Shading"

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
      {/* <p className="mt-3 text-center">
            Already have'nt an account?{" "}
            <Link to="/adminsignup" className="text-decoration-none">
              Signup
            </Link>
            </p> */}
    </div>
  </div>
  )
}

export default Adminlogin
