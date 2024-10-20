import React, { useState } from 'react';
import './../styles/Registration.scss'; // Import SCSS file

const Registration = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirmation password
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !firstName || !lastName || !dateOfBirth || !phoneNumber || !password || !confirmPassword) {
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
        body: JSON.stringify({ email, firstName, lastName, dateOfBirth, phoneNumber, password }),
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.ok && data.success) {
        // Handle successful registration (e.g., redirect to login)
        window.location.href = '/login';
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
            id="firstName"
            value={firstName}
            onChange={(e) => handleInputChange(e, setFirstName)}
            placeholder="Imię"
            required
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => handleInputChange(e, setLastName)}
            placeholder="Nazwisko"
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
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => handleInputChange(e, setPhoneNumber)}
            placeholder="Numer telefonu"
            required
          />
        </div>

        <div className="input-group">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => handleInputChange(e, setEmail)}
            placeholder="Email"
            required
          />
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
