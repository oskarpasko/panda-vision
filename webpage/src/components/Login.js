import React, { useState } from 'react';
import './../styles/Login.scss'; // Import SCSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setErrorMessage('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    setErrorMessage(''); // Reset error message on new attempt

    try {
      const response = await fetch('http://192.168.0.166:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.ok && data.success) {
        localStorage.setItem('user', JSON.stringify({ username: data.user.username, role: data.user.role }));

        window.location.href = '/main'; // Redirect to main page
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Logowanie</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="input-group">
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Nazwa użytkownika"
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Hasło"
            required
          />
        </div>

        <button type="submit" className="login-btn" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Zaloguj się'}
        </button>

        <div className="register-link">
          <p>
            Nie masz jeszcze konta? <a href="/register">Rejestracja</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
