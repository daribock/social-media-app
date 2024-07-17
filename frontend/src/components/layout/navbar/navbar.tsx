import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="navbar bg-base-100">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost">
                    JSK
                </Link>
            </div>
            <div className="navbar-end space-x-2">
                <Link to="/home/login" className="btn btn-primary">
                    Login
                </Link>
                <Link to="/home/register" className="btn btn-">
                    Register
                </Link>
            </div>
        </header>
    );
};

export default Navbar;
