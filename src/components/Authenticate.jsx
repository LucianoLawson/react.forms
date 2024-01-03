import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Authenticate({ token }) {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  async function handleClick() {
    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      if (response.ok) {
        setUserInfo(result.data); // Store user information
      } else {
        throw new Error(result.message || "Authentication failed");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="authenticate-section">
      <h2>Authenticate</h2>
      {userInfo && <p>Welcome, {userInfo.username}!</p>}
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}

Authenticate.propTypes = {
  token: PropTypes.string,
};
