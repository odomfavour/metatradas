import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'


const Header = ({ detail }) => {
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem('userToken');
        navigate('/login');
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand to="/">MetaTradas</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavLink to="/activities" className="nav-link">Activities</NavLink>
                        <NavLink to="/subscription" className="nav-link">Subscription</NavLink>
                        <NavLink to="/login" className="nav-link">Login</NavLink>
                        {detail ? <NavDropdown title={'Hello ' + detail.username} id="basic-nav-dropdown" className='text-capitalize'>
                            <NavLink to="/teams" className="dropdown-item">
                                Teams
                            </NavLink>
                            <NavLink to="/settings" className="dropdown-item">
                                Settings
                            </NavLink>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4" onClick={logOut}>Log out</NavDropdown.Item>
                        </NavDropdown> : ""}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header