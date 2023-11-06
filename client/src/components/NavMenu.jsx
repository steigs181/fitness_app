import React from 'react'
import '../App.css'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/esm/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'

const NavMenu = () => {
    const handleLogout = (e) => {
        axios
    .post("http://localhost:8000/api/logout")
    .then((res) => {
        console.log("Successfully logged out!");
        setUser({});
        navigate("/login"); 
    })
    .catch((err) => {
      console.error("Error logging out:", err);
      // Handle the error, e.g., show an error message to the user
    });
    }

  return (
    <Navbar fixed="top" bg="dark" id='nav'>
        <Container fluid>
            <Navbar.Brand href='/dashboard' className='navbar-main'>
                <img src="https://images.pexels.com/photos/1092885/pexels-photo-1092885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="B"
                width="30"
                height="30"
                /> {'  '}
                FitnessNFriend
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='navbarScroll' />
            <Navbar.Collapse id='navbarScroll'>
                <Nav
                    className='me-auto my-2 my-lg-0'
                    style={{maxHeight: '100px'}}
                    navbarScroll
                    id='nav-drop'
                >
                    <NavDropdown title="Are you a member?" id="navbarScrollingDropDown">
                        <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => handleLogout} href="/login">Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavMenu