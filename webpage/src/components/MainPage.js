import React, { useState, useEffect } from 'react';
import './../styles/MainPage.scss'; // Import styles
import logo from '../images/logo.png'; // Ensure the correct path to the logo

const MainPage = () => {
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
  const [colorTableData, setColorTableData] = useState([]);         // State for colors table initialized as empty array
  const [taintTableData, setTaintTableData] = useState([]);         // State for taints table initialized as empty array
  const [ishiharaTableData, setIshiharaTableData] = useState([]);   // State for Ishihara table initialized as empty array
  const [activeTable, setActiveTable] = useState('colors');         // State to track the active table

  const [countOfUsers, setcountOfUsers] = useState(0); 
  const [countOfTests, setcountOfTests] = useState(0); 

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (storedUser) {
      setUserName(storedUser.email);
      setRole(storedUser.role); // Set the role of the user
      fetchUserData(storedUser.email);  // Fetch user data with email
      fetchAdminData(storedUser.email);  // Fetch user data with email
    }
  }, []);

  const fetchAdminData = (email) => {
    fetch('http://192.168.0.166:5000/api/admin', {
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
            console.log(data.tests[0].suma)
            console.log(data.users[0].suma)
            // fetch data
            setcountOfUsers(data.users || []);      // TO DO: Ogarnąć o co chodzi z tym błedem że userów wyświetla a testy wywala błąd jakiś
            setcountOfTests(data.tests || []);

            // add data to the varables
            const countOfUsers = data.users[0].suma;
            const countOfTests = data.tests[0].suma;

            console.log(countOfUsers);
            console.log(countOfTests);
            setcountOfUsers(countOfUsers);
            setcountOfUsers(countOfTests);
          }
        } catch (err) {
          console.error('Error parsing data:', err);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  const fetchUserData = (email) => {
    fetch('http://192.168.0.166:5000/api/main', {
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

  if (role === 'admin') {
    return (
      <div className="admin-page">
        <header className="header">
          <img className="logo" src={logo} alt="Logo" />
          <h1 className="app-name">Admin Panel - PandaVision</h1>
          <button className="logout-button" onClick={handleLogout}>
            Wyloguj się
          </button>
        </header>

        <div className="admin-content">
          <div className="side-panel">
            <button>Wyniki Użytkowników</button>
            <button>Wykresy</button>
            <button>Raporty</button>
          </div>

          <div className="main-dashboard">
            <h2>Witaj, {userName}</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Użytkownicy</h3>
                <p>{countOfUsers}</p>
              </div>
              <div className="stat-card">
                <h3>Zarejestrowane testy</h3>
                <p>{countOfTests}</p>
              </div>
              <div className="stat-card">
                <h3>Poprawne odpowiedzi</h3>
                <p>89%</p>
              </div>
              <div className="stat-card">
                <h3>Błędne odpowiedzi</h3>
                <p>11%</p>
              </div>
            </div>

            <div className="chart-section">
              <h3>Wykres Aktywności</h3>
              {/* Można tutaj dodać komponenty do wykresów */}
              <div className="chart-placeholder">[Wykres Aktywności]</div>
            </div>
          </div>
        </div>

        <footer className="footer">
          &copy; {new Date().getFullYear()} Oskar Paśko. Wszelkie prawa zastrzeżone.
        </footer>
      </div>
    );
  }

  // User page
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


      <div className="main-dashboard">
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
                      <tr key={row.id} className={row.error_colors > 0 ? 'error-row' : ''}>
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
                      <tr key={row.id} className={row.error_colors > 0 ? 'error-row' : ''}>
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
                      <tr key={row.id} className={row.error_colors > 0 ? 'error-row' : ''}>
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
      </div>

      <footer className="footer">
        &copy; {new Date().getFullYear()} Oskar Paśko. Wszelkie prawa zastrzeżone.
      </footer>
    </div>
  );
};

export default MainPage;