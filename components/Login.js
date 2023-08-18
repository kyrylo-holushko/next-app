import { Button, Modal, Form } from "react-bootstrap";
import { useContext } from 'react';
import { SetShowLoginContext } from "./Navigation";

export default function Signup(props){

    const setShow = useContext(SetShowLoginContext);

    const handleClose = () => setShow(false);

    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="usernameOrEmail">
                        <Form.Label>User Name or Email</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
                Log In
            </Button>
            </Modal.Footer>
        </Modal>
    )
}