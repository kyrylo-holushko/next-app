import { Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { signupForm } from "../lib/form/uservalidators";
import { registerUser } from "../lib/ajax/user";

export default function Signup(props){

    const setShow = props.setShow;

    const [form, setForm] = useState(signupForm.defaultFormInput);
    const [dirty, setDirty] = useState(signupForm.defaultFormDirty);
    const [errors, setErrors] = useState(signupForm.defaultSignupErrors);
    const [valid, setValid] = useState(false);
    const [responded, setResponded] = useState(false);
    const [resMsg, setResMsg] = useState("");

    useEffect(()=>{
        if(Object.values(dirty).some(k=>k===true)) {
            signupForm.formErrorSetter(form, setErrors);
        }
    }, [form]);

    useEffect(()=>{
        signupForm.formValidator(errors, setValid);
    }, [errors]);

    useEffect(()=>{
        if(resMsg.length)
            setResponded(true);
    }, [resMsg]);

    const handleClose = () => {
        setShow(false);
        setForm(signupForm.defaultFormInput);
        setErrors(signupForm.defaultSignupErrors);
        setDirty(signupForm.defaultFormDirty);
        setResponded(false);
        setResMsg("");
    }

    async function submitForm(e) {
        if(valid){
            registerUser(form).then(res=>{
                setResMsg(`${res.message}: ${res.data.username}`);
            }).catch(e=>{setResMsg(e.message)});
        }      
    }

    return (
        <Modal show={props.show} onHide={handleClose} size={responded && "sm"} centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!responded && <Form>
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
                            isInvalid={dirty.passwordConfirmed && (errors.passwordConfirmed.empty || errors.passwordConfirmed.minlength || errors.passwordConfirmed.notMatching)}                                                      
                        />
                        <Form.Text className="error">
                            {dirty.passwordConfirmed && errors.passwordConfirmed.empty && "Required Field"}
                            {dirty.passwordConfirmed && errors.passwordConfirmed.minlength && "Minimum 8 characters"}
                            {dirty.passwordConfirmed && errors.passwordConfirmed.minlength && errors.passwordConfirmed.notMatching && <br/>}
                            {dirty.passwordConfirmed && errors.passwordConfirmed.notMatching && "Passwords entered do not match"}
                        </Form.Text>                                                       
                    </Form.Group>
                </Form>}
                {responded && resMsg}
            </Modal.Body>
            {!responded && <Modal.Footer>
            <Button variant="primary" type="button" onClick={submitForm}>
                Sign Up
            </Button>
            </Modal.Footer>}
        </Modal>
    )
}