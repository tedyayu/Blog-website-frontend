import {React} from "react"; 
import {Link} from "react-router-dom";

const Navbar=({isLoggedIn})=>{
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">Blog Website</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                        {isLoggedIn && (
                            <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/create-post">Create Post</Link>
                            </li>
                            <li className="nav-item">
                                    <button 
                                        className="btn btn-danger"
                                        onClick={() => {
                                            localStorage.removeItem("authToken");
                                            window.location.reload();
                                        }}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;