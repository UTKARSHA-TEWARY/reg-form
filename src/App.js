// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import LoggedIn from './LoggedIn';

const App = () => {
    return (
        <Router>
            <nav>
              
            </nav>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/loggedin" element={<LoggedIn />} />
            </Routes>
        </Router>
    );
};

export default App;

