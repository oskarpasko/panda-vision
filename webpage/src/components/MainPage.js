import React, { useState, useEffect } from 'react';
import './../styles/MainPage.scss'; // Import styles
import logo from '../images/logo.png'; // Ensure the correct path to the logo

const MainPage = () => {
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
  const [colorTableData, setColorTableData] = useState([]);         // State for colors table initialized as empty array
  const [taintTableData, setTaintTableData] = useState([]);         // State for taints table initialized as empty array
  const [ishiharaTableData, setIshiharaTableData] = useState([]);   // State for Ishihara table initialized as empty array
  const [activeTable, setActiveTable] = useState(null);  // Initialize as null

  const [countOfUsers, setcountOfUsers] = useState(0); 
  const [countOfTests, setcountOfTests] = useState(0); 
  const [countOfTestsTime, setcountOfTestsTime] = useState(0); 
  const [countOfCorrectTests, setcountOfCorrectTests] = useState(0); 
  const [countOfBadTests, setcountOfBadTests] = useState(0); 
  const [colorTableDataAdmin, setColorTableDataAdmin] = useState([]);         // State for colors table initialized as empty array
  const [taintTableDataAdmin, setTaintTableDataAdmin] = useState([]);         // State for taints table initialized as empty array
  const [ishiharaTableDataAdmin, setIshiharaTableDataAdmin] = useState([]);   // State for Ishihara table initialized as empty array

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
  
    if (storedUser) {
      setUserName(storedUser.username);
      setRole(storedUser.role); // Set the role of the user
      fetchUserData(storedUser.username);  // Fetch user data with username
      fetchAdminData(storedUser.username);  // Fetch admin data if applicable
  
      // Set activeTable based on the user's role after setting role
      if (storedUser.role === 'admin') {
        setActiveTable('dashboard');  // Set 'dashboard' for admin
      } else {
        setActiveTable('colors');  // Set 'colors' for regular users
      }
    }
  }, []);
  

  const fetchAdminData = (username) => {
    fetch('http://localhost:5000/api/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username }),  // Send username in the request body
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
            console.log(data)
            // fetch data: 
            setcountOfUsers(data.users);                          // count of users
            setcountOfTests(data.tests);                          // count of all tests
            setcountOfTestsTime(data.tests_time)                  // time of all tests
            setcountOfCorrectTests(data.correct_tests);           // count of % correct test
            setcountOfBadTests(data.error_tests);                 // count of % tests with at least 1 error
            setColorTableDataAdmin(data.color_test || [])         // all color test results
            setIshiharaTableDataAdmin(data.ishihara_test || [])   // all ishihara test results
            setTaintTableDataAdmin(data.taint_test || [])         // all taint test results
          }
        } catch (err) {
          console.error('Error parsing data:', err);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  const fetchUserData = (username) => {
    fetch('http://192.168.0.166:5000/api/main', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username }),  // Send username in the request body
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
          {/* Sidebar for selecting tables */}
          <div className="side-panel">
            <button onClick={() => switchTable('dashboard')}>Dashboard</button>
            <button onClick={() => switchTable('users_results')}>Wyniki Uytkowników</button>
            <button onClick={() => switchTable('charts')}>Wykresy</button>
            <button onClick={() => switchTable('raports')}>Raporty</button>
          </div>

          <div className="main-dashboard">

          {activeTable === 'dashboard' && (
  <>
    <h1 className="section-title">Dashboard</h1>
    <h2 className="section-title">Ogólne statystyki uzytkowników</h2>
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Użytkownicy</h3>
        <p>{countOfUsers}</p>
      </div>
      <div className="stat-card">
        <h3>Kobiety</h3>
        <p> N/A </p>
      </div>
      <div className="stat-card">
        <h3>Męzczyźni</h3>
        <p> N/A </p>
      </div>
      <div className="stat-card">
        <h3>Inne płci</h3>
        <p> N/A </p>
      </div>
    </div>

    {/* Divider line */}
    <div className="divider"></div>

    <h2 className="section-title">Podział wiekowy użytkowników</h2>
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Osoby ponizej 18 lat</h3>
        <p> N/A </p>
      </div>
      <div className="stat-card">
        <h3>Osoby 18 - 35 lat</h3>
        <p> N/A </p>
      </div>
      <div className="stat-card">
        <h3>Osoby w przedziale 36 - 60 lat</h3>
        <p> N/A </p>
      </div>
      <div className="stat-card">
        <h3>Osoby powyzej 60 lat</h3>
        <p> N/A </p>
      </div>
    </div>

    {/* Divider line */}
    <div className="divider"></div>

    <h2 className="section-title">Ogólne statystyki testów</h2>
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Zarejestrowane testy</h3>
        <p>{countOfTests}</p>
      </div>
      <div className="stat-card">
        <h3>Czas spędzony w testach</h3>
        <p>{countOfTestsTime}min</p>
      </div>
      <div className="stat-card">
        <h3>Poprawne odpowiedzi</h3>
        <p>{countOfCorrectTests}%</p>
      </div>
      <div className="stat-card">
        <h3>Błędne odpowiedzi</h3>
        <p>{countOfBadTests}%</p>
      </div>
    </div>

    {/* Divider line */}
    <div className="divider"></div>

    <h2 className="section-title">Statystyki: Test kolorów</h2>
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Zarejestrowane testy</h3>
        <p> N/A </p>
      </div>
      <div className="stat-card">
        <h3>Czas spędzony podczas testu</h3>
        <p> N/A </p>
      </div>
      <div className="stat-card">
        <h3>Średnia ilość błędów</h3>
        <p> N/A </p>
      </div>
    </div>

    {/* Divider line */}
    <div className="divider"></div>

    <h2 className="section-title">Statystyki: Test barw</h2>
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Zarejestrowane testy</h3>
        <p> N/A </p>
      </div>
      <div className="stat-card">
        <h3>Czas spędzony podczas testu</h3>
        <p> N/A </p>
      </div>
      <div className="stat-card">
        <h3>Średnia ilość błędów</h3>
        <p> N/A </p>
      </div>
    </div>

    {/* Divider line */}
    <div className="divider"></div>

    <h2 className="section-title">Statystyki: Test Ishihary</h2>
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Zarejestrowane testy</h3>
        <p> N/A </p>
      </div>
      <div className="stat-card">
        <h3>Czas spędzony podczas testu</h3>
        <p> N/A </p>
      </div>
      <div className="stat-card">
        <h3>Średnia ilość błędów</h3>
        <p> N/A </p>
      </div>
    </div>
  </>
)}


            {activeTable === 'users_results' && (
            <>
              <h3>Wyniki testów Kolorów</h3>
              <table>
                <thead>
                  <tr>
                    <th>Data Testu</th>
                    <th>Czas testu [ s ]</th>
                    <th>Błędne odpowiedzi</th>
                    <th>Uzytkownik</th>
                  </tr>
                </thead>
                <tbody>
                  {colorTableDataAdmin.length > 0 ? (
                    colorTableDataAdmin.map((row) => (
                      <tr key={row.id} className={row.error_colors > 0 ? 'error-row' : ''}>
                        <td>{formatDate(row.date_of_test)}</td>
                        <td>{row.time_of_test}</td>
                        <td>{row.error_colors}</td>
                        <td>{row.user}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">Brak wyników testów</td>
                    </tr>
                  )}
                </tbody>
              </table>
              
              <h3>Wyniki testów Barw</h3>
              <table>
                <thead>
                  <tr>
                    <th>Data Testu</th>
                    <th>Czas testu [ s ]</th>
                    <th>Poprawne odpowiedzi</th>
                    <th>Błędne odpowiedzi</th>
                    <th>Uzytkownik</th>
                  </tr>
                </thead>
                <tbody>
                  {taintTableDataAdmin.length > 0 ? (
                    taintTableDataAdmin.map((row) => (
                      <tr key={row.id} className={row.error_colors > 0 ? 'error-row' : ''}>
                        <td>{formatDate(row.date_of_test)}</td>
                        <td>{row.time_of_test}</td>
                        <td>{row.correct_colors}</td>
                        <td>{row.error_colors}</td>
                        <td>{row.user}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">Brak wyników testów</td>
                    </tr>
                  )}
                </tbody>
              </table>

              <h3>Wyniki testów Ishihary</h3>
              <table>
                <thead>
                  <tr>
                    <th>Data Testu</th>
                    <th>Czas testu [ s ]</th>
                    <th>Poprawne odpowiedzi</th>
                    <th>Błędne odpowiedzi</th>
                    <th>Uzytkownik</th>
                  </tr>
                </thead>
                <tbody>
                  {ishiharaTableDataAdmin.length > 0 ? (
                    ishiharaTableDataAdmin.map((row) => (
                      <tr key={row.id} className={row.error_colors > 0 ? 'error-row' : ''}>
                        <td>{formatDate(row.date_of_test)}</td>
                        <td>{row.time_of_test}</td>
                        <td>{row.correct_colors}</td>
                        <td>{row.error_colors}</td>
                        <td>{row.user}</td>
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
