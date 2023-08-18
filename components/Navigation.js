import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { tempAtom } from "../store";
import { useState, createContext } from 'react';
import Signup from "./Signup";
import Login from "./Login";

export const SetShowSignupContext = createContext();
export const SetShowLoginContext = createContext();

export default function MainNav() {

    const [token, setToken] = useAtom(tempAtom);

    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const handleShowSignup = () => setShowSignup(true);
    const handleShowLogin = () => setShowLogin(true);

    return (
        <>
            <Navbar expand="lg" bg="secondary" data-bs-theme="dark">
                <Container className="px-4">
                    {token && <Navbar.Brand href="#">USERNAME</Navbar.Brand>}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {token && <Nav.Link href="#bags">Bags</Nav.Link>}
                        </Nav>
                        <Nav className="ml-auto">
                            {token && <Nav.Link href="#settings">Settings</Nav.Link>}
                            {!token && <Button variant="outline-light" onClick={handleShowLogin}>Login</Button>}
                            {!token && <Button variant="outline-light" className="ms-2" onClick={handleShowSignup}>Sign Up</Button>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <SetShowSignupContext.Provider value={setShowSignup}>
                <Signup show={showSignup}/>
            </SetShowSignupContext.Provider>
            <SetShowLoginContext.Provider value={setShowLogin}>
                <Login show={showLogin}/>
            </SetShowLoginContext.Provider>
        </>
    )
}

//className="justify-content-between"