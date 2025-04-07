import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setEmail(storedUser.email);
    }
  }, []);

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 20px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      position: "sticky",
      width: "100%",
      top: 0,
      zIndex: 1000,
    },
    logo: {
      fontSize: "22px",
      fontWeight: "bold",
      color: "#fff",
      textDecoration: "none",
    },
    navLinks: {
      display: "flex",
      gap: "20px",
    },
    link: {
      fontSize: "24px",
      fontWeight: "900",
      background: "linear-gradient(90deg, rgb(150, 112, 102), rgb(116, 94, 214))",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    linkHover: {
      color: "#f4b400",
    },
    button: {
      padding: "3px 15px",
      border: "2px solid #f4b400",
      color: "#f4b400",
      background: "none",
      cursor: "pointer",
      borderRadius: "5px",
      transition: "all 0.3s ease-in-out",
      textDecoration: "none",
    },
    buttonHover: {
      backgroundColor: "#f4b400",
      color: "#222",
    },
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logo}>Rent a Car</Link>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/cars" style={styles.link}>Cars</Link>
        <Link to="/about" style={styles.link}>About</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
        {user ? (
          <Link to="/dashboard" style={styles.button}>
            {email ? email.split("@")[0] : "Dashboard"}
          </Link>
        ) : (
          <Link to="/sign-in" style={styles.button}>Account</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
