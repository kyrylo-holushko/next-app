import { Button, Modal, Form } from "react-bootstrap";
//import { useState } from "react";
import { useContext } from 'react';
import { SetShowContext } from "./Navigation";

export default function Signup(props){

    const setShow = useContext(SetShowContext);

    const handleClose = () => setShow(false);

    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="passwordConfirmed">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
                Sign Up
            </Button>
            </Modal.Footer>
        </Modal>
    )

}