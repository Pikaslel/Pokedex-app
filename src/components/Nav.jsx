import { Link } from "react-router-dom";

const Nav = () => {
return (
    <nav
    style={{
        display: "flex",
        gap: "20px",
        padding: "10px",
        borderBottom: "1px solid #ccc",
        marginBottom: "20px"
    }}
    >
    <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        Home
    </Link>
    <Link to="/favorites" style={{ textDecoration: "none", color: "black" }}>
        Favoritos
    </Link>
    </nav>
);
};

export default Nav;
