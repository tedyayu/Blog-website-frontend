import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authToken,setAuthToken]=useState(null);

    return (
        <Router>
            <Navbar isLoggedIn={!!authToken} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login Login setAuthToken={setAuthToken} />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
};

export default App;
