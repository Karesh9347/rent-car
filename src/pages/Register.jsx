import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const { name, email, phoneNumber, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/register-user', formData);

      if (response.status === 201) { // Ensure correct status code
        alert("user registered successfully")
        setSuccess('Registration successful! You can now log in.');
         navigate('/sign-in')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error registering. Please try again.');
    }
  };

  return (
    <div className="relative flex justify-center flex-col items-center pt-12 mx-2">
      {error && <Alert variant="text-error" message={error} />}
      {success && <Alert variant="text-success" message={success} />}
      <h1 className="text-center text-2xl">Register</h1>
      <form className="form-control w-full max-w-md" onSubmit={submitHandler}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          value={name}
          className="input input-bordered w-full mb-6"
          onChange={onChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter email"
          name="email"
          value={email}
          className="input input-bordered w-full mb-6"
          onChange={onChange}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}"
          required
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          placeholder="Enter phone number"
          name="phoneNumber"
          value={phoneNumber}
          maxLength="12"
          pattern="^\d{10,12}$"
          className="input input-bordered w-full mb-6"
          onChange={onChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          value={password}
          className="input input-bordered w-full mb-6"
          onChange={onChange}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          value={confirmPassword}
          className="input input-bordered w-full"
          onChange={onChange}
          required
        />
        <Link to="/sign-in" className="link link-primary">Already have an account? Sign in</Link>
        <button type="submit" className="btn mt-6">Sign up</button>
      </form>
    </div>
  );
};

export default Register;
