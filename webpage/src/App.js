import './App.css';
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Registration from './components/Registration';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the login page */}
          <Route path="/login" element={<Login />} />

          {/* Route for the registration page */}
          <Route path="/register" element={<Registration />} />
          
          {/* Route for the main page */}
          <Route path="/main" element={<MainPage />} />
          
          {/* Default route: redirect to login if no route matches */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
