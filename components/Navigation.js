import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { tempAtom } from "../store";
import { useState, createContext } from 'react';
import Signup from "./Signup";

export const SetShowContext = createContext();

export default function MainNav() {

    const [token, setToken] = useAtom(tempAtom);

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

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
                            {!token && <Button variant="outline-light" onClick={(e)=>{setToken(true)}}>Login</Button>}
                            {!token && <Button variant="outline-light" className="ms-2" onClick={handleShow}>Sign Up</Button>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <SetShowContext.Provider value={setShow}>
                <Signup show={show}/>
            </SetShowContext.Provider>
        </>
    )
}

//className="justify-content-between"