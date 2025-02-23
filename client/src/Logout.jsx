import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css"

function Logout() {
    const logoutContainerStyle = {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "linear-gradient(-45deg, #ff9a9e, #fad0c4, #fad0c4, #ffdde1)",
        backgroundSize: "400% 400%",
        animation: "gradientAnimation 10s ease infinite",
        
      };
      const headingStyle = {
        color: "black",
        fontSize: "2.5rem",
        marginBottom: "20px",
      };
    
      const buttonStyle = {
        backgroundColor: "red",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "1.2rem",
        transition: "background-color 0.3s",
      };

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:3001/logout", {
            });            
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                navigate("/login"); // Redirect to login page
            } else {
                alert("Logout failed");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

  return (
    <div style={logoutContainerStyle}>
            {/* Heading */}
            <h1 style={headingStyle}>"Thank you for visiting our website! <br /> We appreciate your time and look forward to serving you <again className="br"></again> Have a great day!"</h1>
       <center><button onClick={handleLogout}  style={buttonStyle}>
            Logout
        </button></center>
    </div>
  )

    
};

export default Logout
