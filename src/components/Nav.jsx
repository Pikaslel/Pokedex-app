import { Link } from "react-router-dom";
import '../styles/Nav.css';
const Nav = () => {
return (
    <nav
        className="nav">
    <Link to="/">
        Home
    </Link>
    <Link to="/favorites" >
        Favorites
    </Link>
    </nav>
);
};

export default Nav;
