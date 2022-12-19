import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UseContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  const handleLogout = () => {
    logout();
    toast.success("đã đăng xuất thành công");
    navigate("/");
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/" className="nav-link">
          Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {((user && user.auth === true) ||
            window.location.pathname === "/") && (
            <>
              <Nav className="me-auto">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
                <NavLink to="user" className="nav-link">
                  User Manager
                </NavLink>
              </Nav>
              <Nav>
                {user && user.email && (
                  <span className="nav-link">wellcome: {user.email}</span>
                )}
                <NavDropdown
                  title="Setting"
                  id="collasible-nav-dropdown"
                  bg="dark"
                >
                  {user && user.auth === true ? (
                    <NavDropdown.Item onClick={handleLogout}>
                      Log-out
                    </NavDropdown.Item>
                  ) : (
                    <NavLink
                      className="dropdown-item"
                      style={{ color: "black" }}
                      to="/login"
                    >
                      Login
                    </NavLink>
                  )}
                </NavDropdown>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
