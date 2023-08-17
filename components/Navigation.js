import { Container, Navbar, Nav } from "react-bootstrap";

export default function MainNav() {
    return (
        <>
            <Navbar expand="lg" bg="secondary" data-bs-theme="dark">
                <Container className="px-4">
                    <Navbar.Brand href="#">USERNAME</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                        <Nav className="me-auto">
                            <Nav.Link href="#bags">Bags</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#settings">Settings</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}