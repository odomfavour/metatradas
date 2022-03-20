import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'

const Header = ({ detail }) => {
    const logOut = () => {
        localStorage.removeItem('userToken');
        window.location.replace('/login')
    }
    return (
        // <Navbar bg="light" variant="light">
        //     <Container>
        //         <Navbar.Brand href="/">MetaTradas</Navbar.Brand>
        //         <Nav className="ms-auto">
        //             <Nav.Link href="/activities">Activities</Nav.Link>
        //             <Nav.Link href="/subscription">Subscription</Nav.Link>
        //             <Nav.Link href="/login">Login</Nav.Link>
        //             <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        //                 <NavDropdown.Item href="/teams">Teams</NavDropdown.Item>
        //                 <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
        //                 <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        //                 <NavDropdown.Divider />
        //                 <NavDropdown.Item href="#action/3.4" onClick={logOut}>Log out</NavDropdown.Item>
        //             </NavDropdown>
        //         </Nav>
        //     </Container>
        // </Navbar>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">MetaTradas</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/activities">Activities</Nav.Link>
                        <Nav.Link href="/subscription">Subscription</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        {detail ? <NavDropdown title={'Hello ' + detail.username} id="basic-nav-dropdown" className='text-capitalize'>
                            <NavDropdown.Item href="/teams">Teams</NavDropdown.Item>
                            <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4" onClick={logOut}>Log out</NavDropdown.Item>
                        </NavDropdown>: ""}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header