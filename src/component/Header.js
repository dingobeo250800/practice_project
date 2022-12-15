import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/" className="nav-link">
          Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="user" className="nav-link">
              User Manager
            </NavLink>
          </Nav>
          <Nav>
            <NavDropdown title="Setting" id="collasible-nav-dropdown" bg="dark">
              <NavLink
                className="nav-link"
                style={{ color: "black" }}
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                className="nav-link"
                style={{ color: "black" }}
                to="/logout"
              >
                Logout
              </NavLink>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
