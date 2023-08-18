import { Button, Modal, Form } from "react-bootstrap";
import { useContext, useState } from 'react';
import { SetShowLoginContext } from "./Navigation";

export default function Login(props){

    const setShow = useContext(SetShowLoginContext);

    const defaultForm = {
        usernameOrEmail: "",
        password: ""
    };

    const handleClose = () => {
        setForm(defaultForm);
        setShow(false);
    }

    const [form, setForm] = useState(defaultForm);

    async function submitForm(e) {
        console.log("The form's data", form);
    }

    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={e=>submitForm(e)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username Or Email</Form.Label>                                                                                     
                        <Form.Control 
                            type="text"
                            onChange={e=>setForm(current=>({ 
                                ...current,
                                usernameOrEmail: e.target.value
                            }))} 
                            value={form.username}                 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>                                                                                    
                        <Form.Control 
                            type="password"                                                                       
                            onChange={e=>setForm(current=>({ 
                                ...current,
                                password: e.target.value
                            }))} 
                            value={form.password}                                                        
                        />                                                                            
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" type="button" onClick={submitForm}>
                Log In
            </Button>
            </Modal.Footer>
        </Modal>
    )
}