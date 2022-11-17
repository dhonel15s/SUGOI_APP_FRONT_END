// DEPENDENCIES
import { useContext } from "react"
import { NavLink } from "react-router-dom";

// IMPORT: CSS
import './styles/AppNavbar.css';

// IMPORT: BOOTSTRAP ELEMENTS
import { Container, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";

// IMPORT: USER CONTEXT
import UserContext from "../data/userContext.js";


// APP NAVBAR FUNCTION MAIN --------------------------------------------------------------
export default function AppNavbar(){

    // GET LOGGED-IN USER DETAILS
    const { user } = useContext(UserContext);

    return(
        <Navbar className=" navbar-main p-3 border" sticky="top" expand="lg">
          <Container>
            <Navbar.Brand href="#home" className="d-flex flex-row">
              <Image src={require('../assets/logo.jpg')} width="35" className="my-auto"/>
              <h4 className="brand-title ms-3 my-auto">Sugoi!</h4>
              <p className="ms-2 my-auto">Flavors of Japan.</p>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={ NavLink } to="/">Home</Nav.Link>
                <Nav.Link as={ NavLink } to="/products">Products</Nav.Link>
                <Nav.Link as={ NavLink } to="/aboutus">About Us</Nav.Link>

                {/*IF A USER IS LOGGED IN*/}
                {
                  (user.id !== null)
                  ?
                    <Nav.Link as={ NavLink } to="/logout">Logout</Nav.Link>
                  :
                    <>
                    <Nav.Link as={ NavLink } to="/login">Login</Nav.Link>
                    <Nav.Link as={ NavLink } to="/register">Register</Nav.Link>
                    </>
                }
                
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
}