import React from "react";
import { Navbar, Container } from "react-bootstrap";

import logo from "../Images/iconkhd.png"

const NavBar = () => {
    
    return(
        <Navbar bg="dark" variant="dark" style={{marginBottom: 10}}>
        <Container>
            <Navbar.Brand href="#challenge">
                <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
            Challenge React
            </Navbar.Brand>
        </Container>
    </Navbar>
    )
}

export default NavBar