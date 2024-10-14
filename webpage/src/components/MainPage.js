import React, { useState, useEffect } from 'react';
import './../styles/MainPage.scss'; // Importujemy style SCSS
import logo from '../images/logo.png'; // Upewnij się, że ścieżka do logo jest poprawna

const MainPage = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (storedUser && storedUser.name) {
      setUserName(storedUser.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Usunięcie użytkownika z localStorage
    window.location.href = "/login"; // Przeładowanie strony
  };

  return (
    <div className="main-page">
      <header className="header">
        <img className="logo" src={logo} alt="Logo" />
        <h1 className="app-name">PandaVision</h1>
        <button className="logout-button" onClick={handleLogout}>
          Wyloguj się
        </button>
      </header>
      <div className="tiles">
        <div className="tile">Historia badań</div>
        <div className="tile">Aktualizacja danych</div>
      </div>
      <footer className="footer">
        &copy; {new Date().getFullYear()} Oskar Paśko. Wszelkie prawa zastrzeżone.
      </footer>
    </div>
  );
};

export default MainPage;
