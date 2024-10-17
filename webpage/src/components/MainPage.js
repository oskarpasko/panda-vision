import React, { useState, useEffect } from 'react';
import './../styles/MainPage.scss'; // Importujemy style SCSS
import logo from '../images/logo.png'; // Upewnij się, że ścieżka do logo jest poprawna

const MainPage = () => {
  const [userName, setUserName] = useState('');
  const [tableData, setTableData] = useState([]); // State to hold table data

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (storedUser) {
      setUserName(storedUser);
      fetchUserData(storedUser.email);  // Fetch user data with email
    }
  }, []);

  const fetchUserData = (email) => {
    fetch('http://localhost:5000/api/main', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),  // Send email in the request body
    })
      .then((response) => {
        if (response.ok) {
          return response.json();  // Attempt to parse the JSON response
        } else {
          return response.text();  // If not JSON, return the raw text for debugging
        }
      })
      .then((data) => {
        try {
          if (typeof data === 'string') {
            console.error('Non-JSON response:', data);  // Log non-JSON response
          } else {
            setTableData(data);  // Set the fetched data in the state
          }
        } catch (err) {
          console.error('Error parsing data:', err);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  };
  

  const handleLogout = () => {
    localStorage.removeItem('user'); // Usunięcie użytkownika z localStorage
    window.location.href = "/login"; // Przeładowanie strony
  };

  // Function to format date strings
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {  // Format using 'pl-PL' for Polish locale
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
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
      {/* Table rendering */}
      <div className="data-table">
        <h3>Wyniki testów Kolorów</h3>
        <table>
          <thead>
            <tr>
              <th>Data Testu</th>
              <th>Czas testu [ s ]</th>
              <th>Poprawne odpowiedzi</th>
              <th>Błędne odpowiedzi</th>
              {/* Add more columns based on your MySQL table structure */}
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((row) => (
                <tr key={row.id}>
                  <td>{formatDate(row.date_of_test)}</td> {/* Format date here */}
                  <td>{row.time_of_test}</td>
                  <td>{row.correct_colors}</td>
                  <td>{row.error_colors}</td>
                  {/* Map other fields based on the structure of pandavision.color_test_user_results */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Brak wyników testów</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <footer className="footer">
        &copy; {new Date().getFullYear()} Oskar Paśko. Wszelkie prawa zastrzeżone.
      </footer>
    </div>
  );
};

export default MainPage;
