import React, { useState, useEffect } from 'react';
import './../styles/MainPage.scss'; // Import styles
import logo from '../images/logo.png'; // Ensure the correct path to the logo
import BASE_URL from '../config';
import jsPDF from 'jspdf';
import { ROBOTO_FONT } from '../styles/fonts';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
  /* CHARTS */
  const [timeAgeBracketchartData, settimeAgeBracketChartData] = useState(null);
  const [taintTimeAgeBracketchartData, setTaintTimeAgeBracketChartData] = useState(null);
  const [ishiharaTimeAgeBracketchartData, setIshiharaTimeAgeBracketChartData] = useState(null);
  const [taintRedTimeAgeBracketChartData, setTaintRedTimeAgeBracketChartData] = useState(null);
  const [taintGreenTimeAgeBracketChartData, setTaintGreenTimeAgeBracketChartData] = useState(null);
  const [taintBlueTimeAgeBracketChartData, setTaintBlueTimeAgeBracketChartData] = useState(null);
  const [colorErrorAgeBracketChartData, setColorErrorAgeBracketChartData] = useState(null);
  const [taintErrorAgeBracketChartData, setTaintErrorAgeBracketChartData] = useState(null);
  const [ishiharaErrorAgeBracketChartData, setIshiharaErrorAgeBracketChartData] = useState(null);
  const [allTestsTimeAgeBracketChartData, setAllTestsTimeAgeBracketChartData] = useState(null);

  const [colorTimeAvgSexChart, setColorTimeAvgSexChart] = useState(null);
  const [taintTimeAvgSexChart, setTaintTimeAvgSexChart] = useState(null);
  const [ishiharaTimeAvgSexChart, setIshiharaTimeAvgSexChart] = useState(null);
  const [taintRedTimeAvgSexChart, setTaintRedTimeAvgSexChart] = useState(null);
  const [taintGreenTimeAvgSexChart, setTaintGreenTimeAvgSexChart] = useState(null);
  const [taintBlueTimeAvgSexChart,setTaintBlueTimeAvgSexChart] = useState(null);
  const [colorErrorsAvgSexChart, setColorErrorsAvgSexChart] = useState(null);
  const [taintErrorsAvgSexChart, setTaintErrorsAvgSexChart] = useState(null);
  const [ishiharaErrorsAvgSexChart,setIshiaharaErrorsAvgSexChart] = useState(null);
  const [allTestsTimeSexChartData, setAllTestsTimeSexChartData] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
  
    if (storedUser) {
      document.title = "PandaVision"
      setUserName(storedUser.username);
      setRole(storedUser.role); // Set the role of the user
      fetchUserData(storedUser.username);  // Fetch user data with username
      fetchAdminData(storedUser.username);  // Fetch admin data if applicable
  
      // Set activeTable based on the user's role after setting role
      if (storedUser.role === 'admin') {
        document.title = "Panel Admina"
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

            settimeAgeBracketChartData({  // get data to chart avg time in color test for age brackets
              labels: data.color_time_age_bracket_chart.map(item => item.age_bracket),
              datasets: [
                  {
                      label: 'Średni czas (s)',
                      data: data.color_time_age_bracket_chart.map(item => item.time),
                      backgroundColor: 'rgba(176, 78, 255, 0.6)',
                      borderColor: 'rgba(176, 78, 255, 1)',
                      borderWidth: 1,
                  },
              ],
          });
            setTaintTimeAgeBracketChartData({  // get data to chart avg time in taint test for age brackets
              labels: data.taint_time_age_bracket_chart.map(item => item.age_bracket),
              datasets: [
                  {
                      label: 'Średni czas (s)',
                      data: data.taint_time_age_bracket_chart.map(item => item.time),
                      backgroundColor: 'rgba(206, 106, 255, 0.6)',
                      borderColor: 'rgba(206, 106, 255, 1)',
                      borderWidth: 1,
                  },
              ],
          });
            setIshiharaTimeAgeBracketChartData({  // get data to chart avg time in ishihara test for age brackets
              labels: data.ishihara_time_age_bracket_chart.map(item => item.age_bracket),
              datasets: [
                  {
                      label: 'Średni czas (s)',
                      data: data.ishihara_time_age_bracket_chart.map(item => item.time),
                      backgroundColor: 'rgba(237, 134, 255, 0.6)',
                      borderColor: 'rgba(237, 134, 255, 1)',
                      borderWidth: 1,
                  },
              ],
          });
            setTaintRedTimeAgeBracketChartData({  // get data to chart avg time in taint (red) test for age brackets
              labels: data.taint_red_test_time_age_bracket_chart.map(item => item.age_bracket),
              datasets: [
                  {
                      label: 'Średni czas (s)',
                      data: data.taint_red_test_time_age_bracket_chart.map(item => item.time),
                      backgroundColor: 'rgba(236, 152, 159, 0.6)',
                      borderColor: 'rgba(236, 152, 159, 1)',
                      borderWidth: 1,
                  },
              ],
          });
            setTaintGreenTimeAgeBracketChartData({  // get data to chart avg time in taint (green) test for age brackets
              labels: data.taint_green_test_time_age_bracket_chart.map(item => item.age_bracket),
              datasets: [
                  {
                      label: 'Średni czas (s)',
                      data: data.taint_green_test_time_age_bracket_chart.map(item => item.time),
                      backgroundColor: 'rgba(75, 192, 192, 0.6)',
                      borderColor: 'rgba(75, 192, 192, 1)',
                      borderWidth: 1,
                  },
              ],
          });
            setTaintBlueTimeAgeBracketChartData({  // get data to chart avg time in taint (blue) test for age brackets
              labels: data.taint_blue_test_time_age_bracket_chart.map(item => item.age_bracket),
              datasets: [
                  {
                      label: 'Średni czas (s)',
                      data: data.taint_blue_test_time_age_bracket_chart.map(item => item.time),
                      backgroundColor: 'rgba(97, 195, 231, 0.6)',
                      borderColor: 'rgba(97, 195, 231, 1)',
                      borderWidth: 1,
                  },
              ],
          });
            setColorErrorAgeBracketChartData({  // get data to chart avg error in color test
              labels: data.color_error_age_bracket_chart.map(item => item.age_bracket),
              datasets: [
                  {
                      label: 'Średnia ilość błędów',
                      data: data.color_error_age_bracket_chart.map(item => item.error),
                      backgroundColor: 'rgba(176, 78, 255, 0.6)',
                      borderColor: 'rgba(176, 78, 255, 1)',
                      borderWidth: 1,
                  },
              ],
          });
            setTaintErrorAgeBracketChartData({  // get data to chart avg error in taint test
              labels: data.taint_error_age_bracket_chart.map(item => item.age_bracket),
              datasets: [
                  {
                      label: 'Średnia ilość błędów',
                      data: data.taint_error_age_bracket_chart.map(item => item.error),
                      backgroundColor: 'rgba(206, 106, 255, 0.6)',
                      borderColor: 'rgba(206, 106, 255, 1)',
                      borderWidth: 1,
                  },
              ],
          });
            setIshiharaErrorAgeBracketChartData({  // get data to chart avg error in ishihara test
              labels: data.ishiahra_error_age_bracket_chart.map(item => item.age_bracket),
              datasets: [
                  {
                      label: 'Średnia ilość błędów',
                      data: data.ishiahra_error_age_bracket_chart.map(item => item.error),
                      backgroundColor: 'rgba(237, 134, 255, 0.6)',
                      borderColor: 'rgba(237, 134, 255, 1)',
                      borderWidth: 1,
                  },
              ],
          });
            setAllTestsTimeAgeBracketChartData({  // get data to chart avg error in ishihara test
              labels: data.all_tests_avg_time_age_bracket_chart.map(item => item.age_bracket),
              datasets: [
                  {
                      label: 'Średni czas (s)',
                      data: data.all_tests_avg_time_age_bracket_chart.map(item => item.time),
                      backgroundColor: 'rgba(114, 1, 220, 0.6)',
                      borderColor: 'rgba(114, 1, 220, 1)',
                      borderWidth: 1,
                  },
              ],
          });

          // CHART DIVIDE BETWEEN FEMALES AND MALES

          setColorTimeAvgSexChart({  // get data to chart avg time in color test divide between females and males
            labels: data.color_time_sex_chart.map(item => item.sex),
            datasets: [
                {
                    label: 'Średni czas (s)',
                    data: data.color_time_sex_chart.map(item => item.time),
                    backgroundColor: 'rgba(176, 78, 255, 0.6)',
                    borderColor: 'rgba(176, 78, 255, 1)',
                    borderWidth: 1,
                },
            ],
        });
          setTaintTimeAvgSexChart({  // get data to chart avg time in taint test divide between females and males
            labels: data.taint_time_sex_chart.map(item => item.sex),
            datasets: [
                {
                    label: 'Średni czas (s)',
                    data: data.taint_time_sex_chart.map(item => item.time),
                    backgroundColor: 'rgba(206, 106, 255, 0.6)',
                    borderColor: 'rgba(206, 106, 255, 1)',
                    borderWidth: 1,
                },
            ],
        });
          setIshiharaTimeAvgSexChart({  // get data to chart avg time in ishihara test divide between females and males
            labels: data.ishihara_time_sex_chart.map(item => item.sex),
            datasets: [
                {
                    label: 'Średni czas (s)',
                    data: data.ishihara_time_sex_chart.map(item => item.time),
                    backgroundColor: 'rgba(237, 134, 255, 0.6)',
                    borderColor: 'rgba(237, 134, 255, 1)',
                    borderWidth: 1,
                },
            ],
        });
          setTaintRedTimeAvgSexChart({  // get data to chart avg time in taint (red) test divide between females and males
            labels: data.taint_red_time_sex_chart.map(item => item.sex),
            datasets: [
                {
                    label: 'Średni czas (s)',
                    data: data.taint_red_time_sex_chart.map(item => item.time),
                    backgroundColor: 'rgba(236, 152, 159, 0.6)',
                    borderColor: 'rgba(236, 152, 159, 1)',
                    borderWidth: 1,
                },
            ],
        });
          setTaintGreenTimeAvgSexChart({  // get data to chart avg time in taint (green) test divide between females and males
            labels: data.taint_green_time_sex_chart.map(item => item.sex),
            datasets: [
                {
                    label: 'Średni czas (s)',
                    data: data.taint_green_time_sex_chart.map(item => item.time),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        });
          setTaintBlueTimeAvgSexChart({  // get data to chart avg time in taint (blue) test divide between females and males
            labels: data.taint_blue_time_sex_chart.map(item => item.sex),
            datasets: [
                {
                    label: 'Średni czas (s)',
                    data: data.taint_blue_time_sex_chart.map(item => item.time),
                    backgroundColor: 'rgba(97, 195, 231, 0.6)',
                    borderColor: 'rgba(97, 195, 231, 1)',
                    borderWidth: 1,
                },
            ],
        });
          setColorErrorsAvgSexChart({  // get data to chart avg error in color test divide between females and males
            labels: data.color_error_sex_chart.map(item => item.sex),
            datasets: [
                {
                    label: 'Średnia ilość błędów',
                    data: data.color_error_sex_chart.map(item => item.error),
                    backgroundColor: 'rgba(176, 78, 255, 0.6)',
                    borderColor: 'rgba(176, 78, 255, 1)',
                    borderWidth: 1,
                },
            ],
        });
          setTaintErrorsAvgSexChart({  // get data to chart avg error in taint test divide between females and males
            labels: data.taint_error_sex_chart.map(item => item.sex),
            datasets: [
                {
                    label: 'Średnia ilość błędów',
                    data: data.taint_error_sex_chart.map(item => item.error),
                    backgroundColor: 'rgba(206, 106, 255, 0.6)',
                    borderColor: 'rgba(206, 106, 255, 1)',
                    borderWidth: 1,
                },
            ],
        });
          setIshiaharaErrorsAvgSexChart({  // get data to chart avg error in ishihara test divide between females and males
            labels: data.ishihara_error_test_chart.map(item => item.sex),
            datasets: [
                {
                    label: 'Średnia ilość błędów',
                    data: data.ishihara_error_test_chart.map(item => item.error),
                    backgroundColor: 'rgba(237, 134, 255, 0.6)',
                    borderColor: 'rgba(237, 134, 255, 1)',
                    borderWidth: 1,
                },
            ],
        });
          setAllTestsTimeSexChartData({  // get data to chart avg error in ishihara test divide between females and males
            labels: data.all_tests_avg_time_sex_chart.map(item => item.sex),
            datasets: [
                {
                    label: 'Średni czas (s)',
                    data: data.all_tests_avg_time_sex_chart.map(item => item.time),
                    backgroundColor: 'rgba(114, 1, 220, 0.6)',
                    borderColor: 'rgba(114, 1, 220, 1)',
                    borderWidth: 1,
                },
            ],
        });
          
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
  /* ===== GENERATE PDF RAPORTS ===== */
  const generatePDF = (errorLog, user, date, test) => {
    const doc = new jsPDF();
    // Replace with the Base64 encoding for your `Roboto-Regular.ttf`
    doc.addFileToVFS('Roboto-Regular.ttf', ROBOTO_FONT);
    doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
    doc.setFont('Roboto'); // Set as the default font
    // Document Title
    doc.setFontSize(18);
    doc.setTextColor('#333333');
    doc.text('Raport błędów', 10, 15);
    // Subtitle
    doc.setFontSize(12);
    doc.setTextColor('#666666');
    doc.text('Szczegóły błędów', 10, 25);
    // Draw a separator line
    doc.setDrawColor(200, 200, 200);
    doc.line(10, 30, 200, 30);
    // Error Log Content
    doc.setFontSize(10);
    doc.setTextColor('#000000');
    // Split and wrap the error log text for proper formatting
    const pageWidth = 180;
    const margin = 10;
    const startY = 40;
    const wrappedText = doc.splitTextToSize(errorLog, pageWidth - margin * 2);
    // Add error log text, starting below the header
    doc.text(wrappedText, margin, startY);
    // Footer with Date and Page Number
    doc.setFontSize(8);
    doc.setTextColor('#888888');
    const dateDoc = new Date().toLocaleDateString('pl-PL');
    doc.text(`Data: ${dateDoc}`, margin, 285);
    doc.text(`Strona 1`, 190, 285, null, null, 'right');
    // Title
    doc.save(test+'_log_'+user+'_'+date+''+'.pdf');
  }

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
            <button onClick={() => switchTable('users_results')}>Wyniki Uzytkowników</button>
            <button onClick={() => switchTable('charts')}>Wykresy</button>
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
                    <td>Error Log</td>
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
                        <td>
                            {row.error_log ? (
                              <button className="button-generate-pdf" onClick={() => generatePDF(row.error_log, row.user, formatDate(row.date_of_test), "Color")}>
                                Raport
                              </button>
                            ) : (
                              "---"
                            )}
                          </td>
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
                      <th>Error Log</th>
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
                          <td>
                            {row.error_log ? (
                              <button className="button-generate-pdf" onClick={() => generatePDF(row.error_log, row.user, formatDate(row.date_of_test), "Ishihara")}>
                                Raport
                              </button>
                            ) : (
                              "---"
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">Brak wyników testów</td>
                      </tr>
                    )}
                  </tbody>
                </table>
            </>
            )}

            {activeTable === 'charts' && (
              <>
                <h1>Wykresy</h1>

                <h2>Wykresy ogólne</h2>
                <div class="chart-section">
                  <div className="chart-container">
                    <h2>Średni czas wykonanywania wszystkich testów w przedziałach wiekowych</h2>
                    <div className="chart">
                        <Bar
                            data={allTestsTimeAgeBracketChartData}
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Czas (s)',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Przedziały wiekowe',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#333',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                  </div>

                  <div className="chart-container">
                    <h2>Średni czas wykonanywania wszystkich testów ze względu na płeć</h2>
                    <div className="chart">
                        <Bar
                            data={allTestsTimeSexChartData}
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Czas (s)',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Przedziały wiekowe',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#333',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                  </div>
                </div>

                {/* Divider line */}
                <div className="divider"></div>

                <h2>Wykresy średnich czasów dla poszczególnych testów w przedziałach wiekowych</h2>
                <div class="chart-section">
                  <div className="chart-container">
                    <h2>Test kolorów</h2>
                    <div className="chart">
                        <Bar
                            data={timeAgeBracketchartData}
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Czas (s)',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Przedziały wiekowe',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#333',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                  </div>

                  <div className="chart-container">
                    <h2>Test barw</h2>
                    <div className="chart">
                        <Bar
                            data={taintTimeAgeBracketchartData}
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Czas (s)',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Przedziały wiekowe',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#333',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                  </div>

                  <div className="chart-container">
                    <h2>Test Ishihary</h2>
                    <div className="chart">
                        <Bar
                            data={ishiharaTimeAgeBracketchartData}
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Czas (s)',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Przedziały wiekowe',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#333',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                  </div>
                </div>

                {/* Divider line */}
                <div className="divider"></div>

                <h2>Wykresy średnich czasów dla poszczególnych barw w Taint Test w przedziałach wiekowych</h2>
                <div class="chart-section">
                  <div className="chart-container">
                    <h2>Barwa czerwona</h2>
                    <div className="chart">
                        <Bar
                            data={taintRedTimeAgeBracketChartData}
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Czas (s)',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Przedziały wiekowe',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#333',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                  </div>

                  <div className="chart-container">
                    <h2>Barwa zielona</h2>
                    <div className="chart">
                        <Bar
                            data={taintGreenTimeAgeBracketChartData}
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Czas (s)',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Przedziały wiekowe',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#333',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                  </div>

                  <div className="chart-container">
                    <h2>Barwa niebieska</h2>
                    <div className="chart">
                        <Bar
                            data={taintBlueTimeAgeBracketChartData}
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Czas (s)',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Przedziały wiekowe',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#333',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                  </div>
                </div>

                {/* Divider line */}
                <div className="divider"></div>

                <h2>Wykresy średniej ilości błędów dla poszczególnych testów w przedziałach wiekowych</h2>
                <div class="chart-section">
                  <div className="chart-container">
                    <h2>Test kolorów</h2>
                    <div className="chart">
                        <Bar
                            data={colorErrorAgeBracketChartData}
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Błędy',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Przedziały wiekowe',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#333',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                  </div>

                  <div className="chart-container">
                    <h2>Test barw</h2>
                    <div className="chart">
                        <Bar
                            data={taintErrorAgeBracketChartData}
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Błędy',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Przedziały wiekowe',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#333',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                  </div>

                  <div className="chart-container">
                    <h2>Test Ishihary</h2>
                    <div className="chart">
                        <Bar
                            data={ishiharaErrorAgeBracketChartData}
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Błędy',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Przedziały wiekowe',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#333',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                  </div>
                </div>

                {/* Divider line */}
                <div className="divider"></div>

                <h2>Wykresy średnich czasów dla poszczególnych testów ze względu na płeć</h2>
                <div class="chart-section">
                  <div className="chart-container">
                    <h2>Test kolorów</h2>
                    <div className="chart">
                        <Bar
                            data={colorTimeAvgSexChart}
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Czas (s)',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Przedziały wiekowe',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#333',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                  </div>

                  <div className="chart-container">
                    <h2>Test barw</h2>
                    <div className="chart">
                        <Bar
                            data={taintTimeAvgSexChart}
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Czas (s)',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Przedziały wiekowe',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#333',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                  </div>

                  <div className="chart-container">
                    <h2>Test Ishihary</h2>
                    <div className="chart">
                        <Bar
                            data={ishiharaTimeAvgSexChart}
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Czas (s)',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Przedziały wiekowe',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#333',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                  </div>
                </div>

                {/* Divider line */}
                <div className="divider"></div>

                <h2>Wykresy średnich czasów dla poszczególnych barw w Taint Test ze względu na płeć</h2>
                <div class="chart-section">
                  <div className="chart-container">
                    <h2>Barwa czerwona</h2>
                    <div className="chart">
                        <Bar
                            data={taintRedTimeAvgSexChart}
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Czas (s)',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Przedziały wiekowe',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#333',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                  </div>

                  <div className="chart-container">
                    <h2>Barwa zielona</h2>
                    <div className="chart">
                        <Bar
                            data={taintGreenTimeAvgSexChart}
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Czas (s)',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Przedziały wiekowe',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#333',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                  </div>

                  <div className="chart-container">
                    <h2>Barwa niebieska</h2>
                    <div className="chart">
                        <Bar
                            data={taintBlueTimeAvgSexChart}
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Czas (s)',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Przedziały wiekowe',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#333',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                  </div>
                </div>

                {/* Divider line */}
                <div className="divider"></div>

                <h2>Wykresy średniej ilości błędów dla poszczególnych testów ze względu na płeć</h2>
                <div class="chart-section">
                  <div className="chart-container">
                    <h2>Test kolorów</h2>
                    <div className="chart">
                        <Bar
                            data={colorErrorsAvgSexChart}
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Błędy',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Przedziały wiekowe',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#333',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                  </div>

                  <div className="chart-container">
                    <h2>Test barw</h2>
                    <div className="chart">
                        <Bar
                            data={taintErrorsAvgSexChart}
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Błędy',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Przedziały wiekowe',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#333',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                  </div>

                  <div className="chart-container">
                    <h2>Test Ishihary</h2>
                    <div className="chart">
                        <Bar
                            data={ishiharaErrorsAvgSexChart}
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Błędy',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Przedziały wiekowe',
                                            color: '#666',
                                        },
                                        ticks: {
                                            color: '#666',
                                        },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#333',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                  </div>
                </div>

                {/* Divider line */}
                <div className="divider"></div>

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
