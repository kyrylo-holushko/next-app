import { Container, Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { useState, useEffect, useContext } from 'react';
import Signup from "./Signup";
import Login from "./Login";
import { isAuthenticated, removeToken, readToken } from "../lib/authenticate";
import Link from "next/link";
import { useRouter } from "next/router";
import { NavContext } from "./Layout";

export default function MainNav() {

    const router = useRouter();
    const token = isAuthenticated();
    const { navUpdate, setNavUpdate } = useContext(NavContext);

    const [showSignup, setShowSignup] = useState(false); 
    const [showLogin, setShowLogin] = useState(false);   

    const handleShowSignup = () => setShowSignup(true);
    const handleShowLogin = () => setShowLogin(true);

    useEffect(()=>{
        setNavUpdate(false);
    }, [navUpdate]);

    function logout() {
        removeToken();
        setNavUpdate(true);
        router.push("/");
    };

    return (
        <>
            <Navbar expand="lg" bg="secondary" data-bs-theme="dark">
                <Container className="px-4">
                    {token && <Navbar.Brand href="#">{readToken().username.toUpperCase()}</Navbar.Brand>}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {token && <Link href="/bags" legacyBehavior passHref><Nav.Link href="#bags">Bags</Nav.Link></Link>}
                        </Nav>
                        <Nav className="ms-auto">
                            {token && <NavDropdown title="Settings " id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={(e)=>{router.push("/user")}}>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={(e)=>{logout()}}>Logout</NavDropdown.Item>
                            </NavDropdown>}
                            {!token && <Button variant="outline-light" onClick={handleShowLogin}>Login</Button>}
                            {!token && <Button variant="outline-light" className="ms-2" onClick={handleShowSignup}>Sign Up</Button>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>      
            <Login show={showLogin} setShow={setShowLogin}/>
            <Signup show={showSignup} setShow={setShowSignup}/>
        </>
    )
}        