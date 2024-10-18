import React, { useState, useEffect } from 'react';
import './../styles/MainPage.scss'; // Import styles
import logo from '../images/logo.png'; // Ensure the correct path to the logo

const MainPage = () => {
  const [userName, setUserName] = useState('');
  const [colorTableData, setColorTableData] = useState([]); // State for colors table initialized as empty array
  const [taintTableData, setTaintTableData] = useState([]); // State for taints table initialized as empty array
  const [ishiharaTableData, setIshiharaTableData] = useState([]); // State for Ishihara table initialized as empty array
  const [activeTable, setActiveTable] = useState('colors'); // State to track the active table

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
            console.log(data);
            setColorTableData(data.colors || []);  // Set the fetched color data or empty array in the state
            setTaintTableData(data.taints || []);  // Set the fetched taints data or empty array in the state
            setIshiharaTableData(data.ishihara || []);  // Set the fetched Ishihara data or empty array in the state
          }
        } catch (err) {
          console.error('Error parsing data:', err);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user from localStorage
    window.location.href = "/login"; // Redirect to login page
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  // Function to switch between tables
  const switchTable = (table) => {
    setActiveTable(table); // Set the active table
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

      {/* Sidebar for selecting tables */}
      <div className="side-panel">
        <button onClick={() => switchTable('colors')}>Test Kolorów</button>
        <button onClick={() => switchTable('taints')}>Test Barw</button>
        <button onClick={() => switchTable('ishihara')}>Test Ishihary</button>
      </div>

      {/* Conditional rendering based on active table */}
      <div className="data-table">
        {activeTable === 'colors' && (
          <>
            <h3>Wyniki testów Kolorów</h3>
            <table>
              <thead>
                <tr>
                  <th>Data Testu</th>
                  <th>Czas testu [ s ]</th>
                  <th>Poprawne odpowiedzi</th>
                  <th>Błędne odpowiedzi</th>
                </tr>
              </thead>
              <tbody>
                {colorTableData.length > 0 ? (
                  colorTableData.map((row) => (
                    <tr key={row.id}>
                      <td>{formatDate(row.date_of_test)}</td>
                      <td>{row.time_of_test}</td>
                      <td>{row.correct_colors}</td>
                      <td>{row.error_colors}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">Brak wyników testów</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}

        {activeTable === 'taints' && (
          <>
            <h3>Wyniki testów Barw</h3>
            <table>
              <thead>
                <tr>
                  <th>Data Testu</th>
                  <th>Czas testu [ s ]</th>
                  <th>Poprawne odpowiedzi</th>
                  <th>Błędne odpowiedzi</th>
                </tr>
              </thead>
              <tbody>
                {taintTableData.length > 0 ? (
                  taintTableData.map((row) => (
                    <tr key={row.id}>
                      <td>{formatDate(row.date_of_test)}</td>
                      <td>{row.time_of_test}</td>
                      <td>{row.correct_colors}</td>
                      <td>{row.error_colors}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">Brak wyników testów</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}

        {activeTable === 'ishihara' && (
          <>
            <h3>Wyniki testów Ishihary</h3>
            <table>
              <thead>
                <tr>
                  <th>Data Testu</th>
                  <th>Czas testu [ s ]</th>
                  <th>Poprawne odpowiedzi</th>
                  <th>Błędne odpowiedzi</th>
                </tr>
              </thead>
              <tbody>
                {ishiharaTableData.length > 0 ? (
                  ishiharaTableData.map((row) => (
                    <tr key={row.id}>
                      <td>{formatDate(row.date_of_test)}</td>
                      <td>{row.time_of_test}</td>
                      <td>{row.correct_colors}</td>
                      <td>{row.error_colors}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">Brak wyników testów</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>

      <footer className="footer">
        &copy; {new Date().getFullYear()} Oskar Paśko. Wszelkie prawa zastrzeżone.
      </footer>
    </div>
  );
};

export default MainPage;
