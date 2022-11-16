// DEPENDENCIES
import { useContext } from "react"
import { NavLink } from "react-router-dom";

// IMPORT: BOOTSTRAP ELEMENTS
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

// IMPORT: USER CONTEXT
import UserContext from "../data/userContext.js";


// APP NAVBAR FUNCTION MAIN --------------------------------------------------------------
export default function AppNavbar(){

    return(
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">SUGOII! Flavors of Japan.</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">home</Nav.Link>
                <Nav.Link href="#link">products</Nav.Link>
                <Nav.Link href="#link">login</Nav.Link>
                <Nav.Link href="#link">register</Nav.Link>
                <Nav.Link href="#link">logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
}