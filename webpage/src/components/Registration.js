import React, { useState } from 'react';
import './../styles/Registration.scss'; // Import SCSS file

const Registration = () => {
  const [username, setUsername] = useState(''); // Change to username
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState(''); // New gender state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirmation password state
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    if (!username || !dateOfBirth || !gender || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setErrorMessage(''); // Reset error message on new attempt

    try {
      const response = await fetch('http://192.168.0.166:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, dateOfBirth, gender, password }),
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.ok && data.success) {
        window.location.href = '/login'; // Redirect on success
      } else {
        setErrorMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2>Rejestracja</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="input-group">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => handleInputChange(e, setUsername)}
            placeholder="Nazwa użytkownika"
            required
          />
        </div>

        <div className="input-group">
          <input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => handleInputChange(e, setDateOfBirth)}
            required
          />
        </div>

        <div className="input-group">
          <select
            id="gender"
            value={gender}
            onChange={(e) => handleInputChange(e, setGender)}
            required
          >
            <option value="">Wybierz płeć</option>
            <option value="female">Kobieta</option>
            <option value="male">Mężczyzna</option>
            <option value="other">Inna</option>
          </select>
        </div>

        <div className="input-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => handleInputChange(e, setPassword)}
            placeholder="Hasło"
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            id="confirmPassword" // New field for confirmation
            value={confirmPassword}
            onChange={(e) => handleInputChange(e, setConfirmPassword)}
            placeholder="Potwierdź hasło"
            required
          />
        </div>

        <button type="submit" className="register-btn" disabled={isLoading}>
          {isLoading ? 'Rejestrowanie...' : 'Zarejestruj się'}
        </button>

        <div className="login-link">
          <p>
            Masz już konto? <a href="/login">Logowanie</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Registration;
