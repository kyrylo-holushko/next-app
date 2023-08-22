import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from 'react';
import Signup from "./Signup";
import Login from "./Login";
import { isAuthenticated, removeToken } from "../lib/authenticate"; // use remove for logout
import { UserContext } from "./RouteGuard";
import Link from "next/link";

/* export const SetShowSignupContext = createContext();
export const SetShowLoginContext = createContext(); */

export default function MainNav() {

    const token = isAuthenticated();
    const user = useContext(UserContext);

    const [showSignup, setShowSignup] = useState(false); //Was missing 
    const [showLogin, setShowLogin] = useState(false);    //was missing

    const handleShowSignup = () => setShowSignup(true);
    const handleShowLogin = () => setShowLogin(true);

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(()=>{
        if((user.username!==undefined) && token)
            setLoggedIn(true);
    }, [user]);

    return (
        <>
            <Navbar expand="lg" bg="secondary" data-bs-theme="dark">
                <Container className="px-4">
                    {loggedIn && <Navbar.Brand href="#">{user.username.toUpperCase()}</Navbar.Brand>}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {loggedIn && <Link href="/bags" legacyBehavior passHref><Nav.Link href="#bags">Bags</Nav.Link></Link>}
                        </Nav>
                        <Nav className="ml-auto">
                            {loggedIn && <Nav.Link href="#settings">Settings</Nav.Link>}
                            {!loggedIn && <Button variant="outline-light" onClick={handleShowLogin}>Login</Button>}
                            {!loggedIn && <Button variant="outline-light" className="ms-2" onClick={handleShowSignup}>Sign Up</Button>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>      
            <Login show={showLogin} setShow={setShowLogin}/>
            <Signup show={showSignup} setShow={setShowSignup}/>
        </>
    )
}