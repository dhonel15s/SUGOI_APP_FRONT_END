// IMPORT: DEPENDENCIES
import { useContext } from "react"
import { NavLink } from "react-router-dom";

// IMPORT: CSS
import './styles/AppNavbar.css';

// IMPORT: BOOTSTRAP ELEMENTS
import { Container, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";

// IMPORT: USER CONTEXT
import UserContext from "../UserContext.js";


// APP NAVBAR FUNCTION MAIN --------------------------------------------------------------
export default function AppNavbar(){


    // GET LOGGED-IN USER DETAILS
    let user = {
        token: sessionStorage.getItem("token"),
        id: sessionStorage.getItem("id"),
        isAdmin: sessionStorage.getItem("isAdmin")
      }


    // APPNAVBAR MAIN DESIGN------------------------------------------------------------------
    // CHECK IF NO LOGGED USER
    if(user.token === null && user.id === null && user.isAdmin === null ){
      return(
        <Navbar className="border navbar-main p-3" sticky="top" expand="lg">
          <Container className="navbar-submain">
            <Navbar.Brand href="#home" className="d-flex flex-row">
              <Image src={require('../assets/logo.jpg')} width="35" className="my-auto"/>
              <h4 className="brand-title ms-3 my-auto">Sugoi!</h4>
              <p className="ms-2 my-auto">Flavors of Japan.</p>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={ NavLink } to="/" end>Home</Nav.Link>
                <Nav.Link as={ NavLink } to="/products" end>Products</Nav.Link>
                <Nav.Link as={ NavLink } to="/aboutus" end>About Us</Nav.Link>
                <Nav.Link as={ NavLink } to="/login" end>Login</Nav.Link>
                <Nav.Link as={ NavLink } to="/register" end>Register</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>  
      )
    }

    // IF ADMIN: GO TO ADMIN DASHBOARD
    else if(user.isAdmin === "true"){
      return(
        <Navbar className="border navbar-main p-3 " sticky="top" expand="lg">
          <Container className="navbar-submain">
            <Navbar.Brand href="#home" className="d-flex flex-row">
              <Image src={require('../assets/logo.jpg')} width="35" className="my-auto"/>
              <h4 className="brand-title ms-3 my-auto">Sugoi!</h4>
              <p className="ms-2 my-auto">Flavors of Japan.</p>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={ NavLink } to="/" end>Home</Nav.Link>
                <Nav.Link as={ NavLink } to="/manageproducts" end>Manage Products</Nav.Link>
                <Nav.Link as={ NavLink } to="/logout" end>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>   
      )
    }

    // IF USER: GO TO USER DASHBOARD
    else {
      return(
        <Navbar className="border navbar-main p-3 " sticky="top" expand="lg">
          <Container className="navbar-submain">
            <Navbar.Brand href="#home" className="d-flex flex-row">
              <Image src={require('../assets/logo.jpg')} width="35" className="my-auto"/>
              <h4 className="brand-title ms-3 my-auto">Sugoi!</h4>
              <p className="ms-2 my-auto">Flavors of Japan.</p>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={ NavLink } to="/" end>Home</Nav.Link>
                <Nav.Link as={ NavLink } to="/products" end>Products</Nav.Link>
                <Nav.Link as={ NavLink } to="/aboutus" end>About Us</Nav.Link>
                <Nav.Link as={ NavLink } to="/cart" end>Cart</Nav.Link>
                <Nav.Link as={ NavLink } to="/logout" end>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>   
      )
    }
}