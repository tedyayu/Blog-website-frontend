import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";

const Register = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "",confirmPassword: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        try {
            console.log("Sending request:", formData);
            const response = await registerUser(formData.username, formData.email, formData.password);
            console.log("API Response:", response);
            if (response.error) {
                setError(response.error);
            } else {
                alert("Registration successful! Please log in.");
                navigate("/login");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Register</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input 
                     type="text" 
                     name="username" 
                     className="form-control" 
                     placeholder="Enter your name" 
                     value={formData.username}
                     onChange={handleChange}
                     required/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="Enter email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Register;
