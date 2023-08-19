import { Button, Modal, Form } from "react-bootstrap";
import { useContext, useState } from 'react';
import { SetShowSignupContext } from "./Navigation";

export default function Signup(props){

    const setShow = useContext(SetShowSignupContext);

    const defaultForm = {
        username: "",
        email: "",
        password: "",
        passwordConfirmed: ""
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
                        <Form.Label>User Name</Form.Label>                                                                                     
                        <Form.Control 
                            type="text"
                            onChange={e=>setForm(current=>({ 
                                ...current,
                                username: e.target.value
                            }))} 
                            value={form.username}                 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>                                                                                                             
                        <Form.Control 
                            type="email" 
                            onChange={e=>setForm(current=>({ 
                                ...current,
                                email: e.target.value
                            }))} 
                            value={form.email}                                                            
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
                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>                                                                                   
                        <Form.Control 
                            type="password"                                                                   
                            onChange={e=>setForm(current=>({ 
                                ...current,
                                passwordConfirmed: e.target.value
                            }))} 
                            value={form.passwordConfirmed}                                                        
                        />                                                          
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" type="button" onClick={submitForm}>
                Sign Up
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

//isInvalid={!(parseInt(bidAmount) > 0) && (bidAmount.length || formSubmitted)}

{/* <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback> */}