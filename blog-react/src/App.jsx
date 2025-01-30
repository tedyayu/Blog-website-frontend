import React, { useState,useEffect  } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CreatePost from "./components/CreatePost";

const App = () => {
    const [authToken,setAuthToken]=useState(null);
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setAuthToken(token);
        }
    }, []);

    return (
        <Router>
            <Navbar isLoggedIn={!!authToken} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login  setAuthToken={setAuthToken} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create-post" element={<CreatePost />} />
            </Routes>
        </Router>
    );
};

export default App;
