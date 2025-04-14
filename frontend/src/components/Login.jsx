import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_DB_URL;


const Login = () => {
  // Form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  // For displaying errors
  const [error, setError] = useState("");

  // React Router DOM hook for navigation
  const navigate = useNavigate();

  // Handle text field changes logic
  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit button logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Handle errors from the backend
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to login");
      }

      // Parse the response data
      const data = await response.json();
      const { token, role, id } = data;

      // Save the token to localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("id", id);

      // Navigate based on role
      if (role === "doctor") {
        navigate("/doctor-home");
      } else if (role === "nurse") {
        navigate("/nurse-home");
      } else if (role === "patient") {
        navigate("/patient-home");
      } else {
        throw new Error("Unknown role");
      }
    } catch (error) {
      setError(error.message || "An error occurred while logging in");
    }
  };

  return (
    <div className="login-container">
      <h1>Welcome to Hospital Management Portal</h1>
      <p>
        A platform for doctors, nurses, and patients to track their progress!
      </p>
      <hr />
      <p>Fill out the form to login!</p>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChanges}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChanges}
            placeholder="Password"
            required
          />
        </div>
        {/* <div className='form-group'>
                    <label htmlFor='role'>Role</label>
                    <select
                        id='role'
                        name='role'
                        value={formData.role}
                        onChange={handleChanges}
                        required
                    >
                        <option value=''>Select your role</option>
                        <option value='doctor'>Doctor</option>
                        <option value='nurse'>Nurse</option>
                        <option value='patient'>Patient</option>
                    </select>
                </div> */}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <br />
      <p>
        Don't have an account? <a href="/signup">Sign up!</a>
      </p>
    </div>
  );
};

export default Login;
