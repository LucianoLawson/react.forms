import { useState } from 'react';
import PropTypes from 'prop-types';

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState("");

  const validateForm = () => {
    if (username.length < 8) {
      setValidationError("Username must be at least 8 characters long");
      return false;
    }
    setValidationError("");
    return true;
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();

      if (response.ok) {
        setToken(result.token);
        // Clear input fields after successful submission
        setUsername("");
        setPassword("");
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      {validationError && <p className="error-message">{validationError}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </label>
        <label>
          Password:
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

SignUpForm.propTypes = {
  setToken: PropTypes.func.isRequired,
};
