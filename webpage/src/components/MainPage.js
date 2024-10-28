import React, { useState, useEffect } from 'react';
import './../styles/MainPage.scss'; // Import styles
import logo from '../images/logo.png'; // Ensure the correct path to the logo
import BASE_URL from '../config';

const MainPage = () => {
  /* GENERAL */
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
  const [activeTable, setActiveTable] = useState(null);  // Initialize as null
  /* ===== DATAS FOR USERS ===== */
  const [colorTableData, setColorTableData] = useState([]);        
  const [taintTableData, setTaintTableData] = useState([]);        
  const [ishiharaTableData, setIshiharaTableData] = useState([]);   
  /* ===== DATAS FOR ADMIN ===== */
  /* USERS */
  const [countOfUsers, setcountOfUsers] = useState(0); 
  /* USERS SEX */
  const [countOfFemales, setCountOfFemales] = useState(0);
  const [countOfMales, setCountOfMales] = useState(0);
  const [countOfOthers, setCountOfOthers] = useState(0);
  /* AGE BRACKETS */
  const [usersUnder18, setUsersUnder18] = useState(0);
  const [usersBetween1835, setUsersBetween1835] = useState(0);
  const [usersBetween3660, setUsersBetween3660] = useState(0);
  const [usersUp60, setusersUp60] = useState(0);
  /* GENERAL TEST STATS */
  const [countOfTests, setcountOfTests] = useState(0); 
  const [countOfTestsTime, setcountOfTestsTime] = useState(0); 
  const [countOfCorrectTests, setcountOfCorrectTests] = useState(0); 
  const [countOfBadTests, setcountOfBadTests] = useState(0); 
  /* DATA FROM ALL TESTS TO THE TABLES */
  const [colorTableDataAdmin, setColorTableDataAdmin] = useState([]);   
  const [taintTableDataAdmin, setTaintTableDataAdmin] = useState([]);  
  const [ishiharaTableDataAdmin, setIshiharaTableDataAdmin] = useState([]);     
  /* COLOR TEST STATS */   
  const [colorTestCount, setColorTestCount] = useState(0);
  const [colorTestTime, setColorTestTime] = useState(0);
  const [colorTestAvg, setColorTestAvg] = useState(0);
  /* TAINT TEST STATS */
  const [taintTestCount, setTaintTestCount] = useState(0);
  const [taintTestTime, setTaintTestTime] = useState(0);
  const [taintTestAvg, setTaintTestAvg] = useState(0);
  /* TAINT TEST STATS WITH SPECIFIC COLORS */
    /* -- RED */
  const [taintTestRedCount, setTaintTestRedCount] = useState(0);
  const [taintTestRedTime, setTaintTestRedTime] = useState(0);
  const [taintTestRedAvg, setTaintTestRedAvg] = useState(0);
    /* -- GREEN */
  const [taintTestGreenCount, setTaintTestGreenCount] = useState(0);
  const [taintTestGreenTime, setTaintTestGreenTime] = useState(0);
  const [taintTestGreenAvg, setTaintTestGreenAvg] = useState(0);
    /* -- BLUE */
  const [taintTestBlueCount, setTaintTestBlueCount] = useState(0);
  const [taintTestBlueTime, setTaintTestBlueTime] = useState(0);
  const [taintTestBlueAvg, setTaintTestBlueAvg] = useState(0);
  /* ISHIHARA TEST STATS */
  const [ishiharaTestCount, setIshiharaTestCount] = useState(0);
  const [ishiharaTestTime, setIshiharaTestTime] = useState(0);
  const [ishiharaTestAvg, setIshiharaTestAvg] = useState(0);

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
  
  /* ===== FETCHING FOR ADMIN ===== */
  const fetchAdminData = (username) => {
    fetch(BASE_URL+'/api/admin', {
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
            /* ===== FECTH DATAS ===== */
            setcountOfUsers(data.users);                          // count of users

            setUsersUnder18(data.users_18);                       // amount of users under 18 yo
            setUsersBetween1835(data.users_18_35);                // amount of users between 18 and 35 yo
            setUsersBetween3660(data.users_36_60);                // amount of users between 36 and 60 yo
            setusersUp60(data.users_60);                          // amount of users up to 60 yo

            setCountOfFemales(data.females);                      // amount of females users
            setCountOfMales(data.males);                          // amount of males users
            setCountOfOthers(data.others);                        // amount of users with other sex

            setcountOfTests(data.tests);                          // count of all tests
            setcountOfTestsTime(data.tests_time)                  // time of all tests
            setcountOfCorrectTests(data.correct_tests);           // count of % correct test
            setcountOfBadTests(data.error_tests);                 // count of % tests with at least 1 error
            
            setColorTableDataAdmin(data.color_test || [])         // all color test results
            setIshiharaTableDataAdmin(data.ishihara_test || [])   // all ishihara test results
            setTaintTableDataAdmin(data.taint_test || [])         // all taint test results

            setColorTestCount(data.color_test_num);               // amount of all done color tests
            setColorTestTime(data.color_test_time);               // time spend during color test
            setColorTestAvg(data.color_test_avg);                 // average errors in color test
            
            setIshiharaTestCount(data.ishihara_test_num);         // amount of all done taint tests
            setIshiharaTestTime(data.ishihara_test_time);         // time spend during taint test
            setIshiharaTestAvg(data.ishihara_test_avg);           // average errors in taint test
            
            setTaintTestCount(data.taint_test_num);               // amount of all done ishihara tests
            setTaintTestTime(data.taint_test_time);               // time spend during ishihara test
            setTaintTestAvg(data.taint_test_avg);                 // average errors in ishihara test

            setTaintTestRedCount(data.taint_test_red_num)         // amount of done taint test with color red
            setTaintTestRedTime(data.taint_test_red_time)         // time spend during taint test with color red
            setTaintTestRedAvg(data.taint_test_red_avg)           // average errors in taint test with color red

            setTaintTestGreenCount(data.taint_test_green_num)      // amount of done taint test with color green
            setTaintTestGreenTime(data.taint_test_green_time)     // time spend during taint test with color green
            setTaintTestGreenAvg(data.taint_test_green_avg)       // average errors in taint test with color green

            setTaintTestBlueCount(data.taint_test_blue_num)       // amount of done taint test with color blue
            setTaintTestBlueTime(data.taint_test_blue_time)       // time spend during taint test with color blue
            setTaintTestBlueAvg(data.taint_test_blue_avg)         // average errors in taint test with color blue
          }
        } catch (err) {
          console.error('Error parsing data:', err);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  };
  /* ===== FETCHING FOR USER ===== */
  const fetchUserData = (username) => {
    fetch(BASE_URL+'/api/main', {
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
            setColorTableData(data.colors || []);       // Set the fetched color data or empty array in the state
            setTaintTableData(data.taints || []);       // Set the fetched taints data or empty array in the state
            setIshiharaTableData(data.ishihara || []);  // Set the fetched Ishihara data or empty array in the state
          }
        } catch (err) {
          console.error('Error parsing data:', err);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  };
  /* ===== LOGOUT ===== */
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user from localStorage
    window.location.href = "/login"; // Redirect to login page
  };
  /* ===== DATE FORMAT ===== */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  /* ===== SWITCH TABLES ===== */
  const switchTable = (table) => {
    setActiveTable(table); // Set the active table
  };

  /* ===== RETURN ADMIN HTML ===== */
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
                  <p>{countOfFemales}</p>
                </div>
                <div className="stat-card">
                  <h3>Męzczyźni</h3>
                  <p>{countOfMales}</p>
                </div>
                <div className="stat-card">
                  <h3>Inne płci</h3>
                  <p>{countOfOthers}</p>
                </div>
              </div>

              {/* Divider line */}
              <div className="divider"></div>

              <h2 className="section-title">Podział wiekowy użytkowników</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Osoby ponizej 18 lat</h3>
                  <p>{usersUnder18}</p>
                </div>
                <div className="stat-card">
                  <h3>Osoby 18 - 35 lat</h3>
                  <p>{usersBetween1835}</p>
                </div>
                <div className="stat-card">
                  <h3>Osoby 36 - 60 lat</h3>
                  <p>{usersBetween3660}</p>
                </div>
                <div className="stat-card">
                  <h3>Osoby powyzej 60 lat</h3>
                  <p>{usersUp60}</p>
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

              <h2 className="section-title">Test kolorów</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Zarejestrowane testy</h3>
                  <p>{colorTestCount}</p>
                </div>
                <div className="stat-card">
                  <h3>Czas spędzony podczas testu</h3>
                  <p>{colorTestTime} min</p>
                </div>
                <div className="stat-card">
                  <h3>Średnia ilość błędów</h3>
                  <p>{colorTestAvg}</p>
                </div>
              </div>

              {/* Divider line */}
              <div className="divider"></div>

              <h2 className="section-title">Test barw</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Zarejestrowane testy</h3>
                  <p>{taintTestCount}</p>
                </div>
                <div className="stat-card">
                  <h3>Czas spędzony podczas testu</h3>
                  <p>{taintTestTime} min</p>
                </div>
                <div className="stat-card">
                  <h3>Średnia ilość błędów</h3>
                  <p>{taintTestAvg}</p>
                </div>
              </div>

              <h3 className="section-title">Test barw: Kolor Czerwony</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Zarejestrowane testy</h3>
                  <p>{taintTestRedCount}</p>
                </div>
                <div className="stat-card">
                  <h3>Czas spędzony podczas testu</h3>
                  <p>{taintTestRedTime} min</p>
                </div>
                <div className="stat-card">
                  <h3>Średnia ilość błędów</h3>
                  <p>{taintTestRedAvg}</p>
                </div>
              </div>

              <h3 className="section-title">Test barw: Kolor Zielony</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Zarejestrowane testy</h3>
                  <p>{taintTestGreenCount}</p>
                </div>
                <div className="stat-card">
                  <h3>Czas spędzony podczas testu</h3>
                  <p>{taintTestGreenTime} min</p>
                </div>
                <div className="stat-card">
                  <h3>Średnia ilość błędów</h3>
                  <p>{taintTestGreenAvg}</p>
                </div>
              </div>

              <h3 className="section-title">Test barw: Kolor Niebieski</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Zarejestrowane testy</h3>
                  <p>{taintTestBlueCount}</p>
                </div>
                <div className="stat-card">
                  <h3>Czas spędzony podczas testu</h3>
                  <p>{taintTestBlueTime} min</p>
                </div>
                <div className="stat-card">
                  <h3>Średnia ilość błędów</h3>
                  <p>{taintTestBlueAvg}</p>
                </div>
              </div>

              {/* Divider line */}
              <div className="divider"></div>

              <h2 className="section-title">Statystyki: Test Ishihary</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Zarejestrowane testy</h3>
                  <p>{ishiharaTestCount}</p>
                </div>
                <div className="stat-card">
                  <h3>Czas spędzony podczas testu</h3>
                  <p>{ishiharaTestTime} min</p>
                </div>
                <div className="stat-card">
                  <h3>Średnia ilość błędów</h3>
                  <p>{ishiharaTestAvg}</p>
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
                    <th>Testowany kolor</th>
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
                        <td>{row.error_log}</td>
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

            {activeTable === 'charts' && (
              <>
                <h1>Wykresy</h1>
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

  /* ===== RETURN USER HTML ===== */
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
                    <th>Testowany kolor</th>
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
                        <td>{row.error_log}</td>
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
