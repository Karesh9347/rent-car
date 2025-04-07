import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null); // State to hold error messages
  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


    const submitHandler = async (e) => {
      e.preventDefault();
    
      // Basic validation
      if (!email || !password) {
        setError("Please fill in both fields");
        return;
      }
    
      try {
        const response = await fetch("http://localhost:4000/login-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          console.log("Login Successful:", data);
    
          // ✅ Store user data properly in localStorage
          localStorage.setItem("user", JSON.stringify(data));
    
          // Redirect to home page
          navigate("/");
        } else {
          setError(data.message || "Login failed");
        }
      } catch (err) {
        console.error("Login error:", err);
        setError("An error occurred during login");
      }
    };
    

  return (
    <div className="relative flex justify-center flex-col items-center pt-12 mx-2">
      {error && <Alert variant="alert-error" message={error} />}
      <h1 className="text-center text-2xl">Login</h1>
      <form className="form-control w-full max-w-md" onSubmit={submitHandler}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Enter email"
          name="email"
          value={email}
          onChange={onChange}
          className="input input-bordered w-full mb-6"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          value={password}
          onChange={onChange}
          className="input input-bordered w-full"
        />
        <Link to="/sign-up" className="link link-primary">
          Register
        </Link>
        <button className="btn mt-6">Sign in</button>
      </form>
      <p>
        Don't have an account? <a href="/sign-up">Create one now</a>
      </p>
    </div>
  );
};

export default Login;
