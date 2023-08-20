import { Button, Modal, Form } from "react-bootstrap";
import { useContext, useState, useEffect } from 'react';
import { SetShowSignupContext } from "./Navigation";
import { defaultSignupErrors, formSignupValidator } from "../lib/formvalidators";

export default function Signup(props){

    const setShow = useContext(SetShowSignupContext);

    const defaultFormInput = {
        username: "",
        email: "",
        password: "",
        passwordConfirmed: ""
    };

    const defaultFormDirty = {
        username: false,
        email: false,
        password: false,
        passwordConfirmed: false
    };

    const [form, setForm] = useState(defaultFormInput);
    const [dirty, setDirty] = useState(defaultFormDirty);
    const [valid, setValid] = useState(false);
    const [errors, setErrors] = useState(defaultSignupErrors);

    useEffect(()=>{
        if(dirty)
            formSignupValidator(form, errors, setErrors, setValid);
        console.log(errors);
    }, [form]);

    const handleClose = () => {
        setForm(defaultFormInput);
        setErrors(defaultSignupErrors);
        setDirty(defaultFormDirty);
        setShow(false);
    }

    async function submitForm(e) {
        console.log("The form's data", form);
        console.log("Dirty State", dirty);
        if(valid){
            console.log("VALID FORM");
        }
        
    }

    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>User Name</Form.Label>                                                                                     
                        <Form.Control 
                            type="text"
                            onChange={e=>{
                                if(!dirty.username){
                                    setDirty(current=>({
                                    ...current,
                                    username: true
                                    }));
                                }                         
                                setForm(current=>({ 
                                ...current,
                                username: e.target.value
                            }))}} 
                            value={form.username}
                            isInvalid={dirty.username && (errors.username.empty || errors.username.notAlphanumeric || errors.username.maxlength)}        
                        />
                        <Form.Text className="error">
                            {dirty.username && errors.username.empty && "Required field"}
                            {dirty.username && errors.username.notAlphanumeric && "Username must be alphanumeric"}
                            {dirty.username && errors.username.notAlphanumeric && errors.username.maxlength && <br/>}
                            {dirty.username && errors.username.maxlength && "Maximum 15 characters"}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>                                                                                                             
                        <Form.Control 
                            type="email" 
                            onChange={e=>{
                                if(!dirty.email){
                                    setDirty(current=>({
                                    ...current,
                                    email: true
                                    }));
                                } 
                                setForm(current=>({ 
                                ...current,
                                email: e.target.value
                            }))}} 
                            value={form.email}
                            isInvalid={dirty.email && (errors.email.empty || errors.email.invalidEmail)}                                                          
                        />
                        <Form.Text className="error">
                            {dirty.email && errors.email.empty && "Required field"}
                            {dirty.email && errors.email.invalidEmail && "Invalid email format"}
                        </Form.Text>                                                                                
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>                                                                                    
                        <Form.Control 
                            type="password"                                                                 
                            onChange={e=>{
                                if(!dirty.password){
                                    setDirty(current=>({
                                    ...current,
                                    password: true
                                    }));
                                } 
                                setForm(current=>({ 
                                ...current,
                                password: e.target.value
                            }))}} 
                            value={form.password}
                            isInvalid={dirty.password && (errors.password.empty || errors.password.minlength)}                                                     
                        /> 
                        <Form.Text className="error">
                            {dirty.password && errors.password.empty && "Required Field"}
                            {dirty.password && errors.password.minlength && "Minimum 8 characters"}
                        </Form.Text>                                                                         
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>                                                                                   
                        <Form.Control 
                            type="password"                                                                   
                            onChange={e=>{
                                if(!dirty.passwordConfirmed){
                                    setDirty(current=>({
                                    ...current,
                                    passwordConfirmed: true
                                    }));
                                } 
                                setForm(current=>({ 
                                ...current,
                                passwordConfirmed: e.target.value
                            }))}} 
                            value={form.passwordConfirmed} 
                            isInvalid={dirty.passwordConfirmed && (errors.passwordConfirmed.empty || errors.passwordConfirmed.minlength)}                                                      
                        />
                        <Form.Text className="error">
                            {dirty.passwordConfirmed && errors.passwordConfirmed.empty && "Required Field"}
                            {dirty.passwordConfirmed && errors.passwordConfirmed.minlength && "Minimum 8 characters"}
                        </Form.Text>                                                       
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

//if(!dirty) setDirty(true);