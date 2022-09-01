import { NavLink as Link, NavLink } from "react-router-dom"
import classes from '../moduls/Header.module.css'
import Home from "../pages/Home"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
    return (
      
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">תקשורת</Navbar.Brand>
               <Nav className="me-auto">
               <Link to="/"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                דף הבית
              </Link>

          {'   '}
          <Link
            to="/suppliers"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            ספקים
          </Link>
          {'   '}
          <Link
            to="/rules"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
             חוקים
          </Link>
          {'   '}
          <Link
            to="/addresses"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
             כתובות
          </Link>
    </Nav>
         
        </Container>
      </Navbar>
    )
}

export default Header