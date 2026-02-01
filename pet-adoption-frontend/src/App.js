import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Recommendations from './pages/Recommendations';
import Navbar from './components/navbar';
function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/recommendations" element={<Recommendations />} />
            </Routes>
        </>
    );
}

export default App;