import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

const Login=({ setAuthToken })=>{
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await loginUser(formData);
            if (response.error) {
                setError(response.error);
            } else {
                localStorage.setItem("authToken", response.token);
                setAuthToken(response.token); // Save the token
                alert("Login successful!");
                navigate("/");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return(
        <div className="container mt-4">
            <h2>Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}
export default Login;