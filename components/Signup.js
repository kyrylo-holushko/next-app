import { Button, Modal, Form } from "react-bootstrap";
import { useContext, useState, useEffect } from 'react';
import { SetShowSignupContext } from "./Navigation";
import * as email from 'email-validator';

export default function Signup(props){

    const setShow = useContext(SetShowSignupContext);

    const defaultForm = {
        username: "",
        email: "",
        password: "",
        passwordConfirmed: ""
    };

    const defaultErrors = {
        username: {
            empty: false,
            maxlength: false,
            notAlphanumeric: false
        },
        email: {
            empty: false,
            invalidEmail: false
        },
        password: {
            empty: false,
            minlength: false
        },
        passwordConfirmed: {
            empty: false,
            minlength: false
        }
    };

    /* this.state = {
        food: {
          sandwich: {
            capsicum: true,
            crackers: true,
            mayonnaise: true
          },
          pizza: {
            jalapeno: true,
            extraCheese: false
          }
        }
      } */


    /* this.setState(prevState => ({
        food: {
          ...prevState.food,           // copy all other key-value pairs of food object
          pizza: {                     // specific object of food object
            ...prevState.food.pizza,   // copy all pizza key-value pairs
            extraCheese: true          // update value of specific key
          }
        }
    })) */

    //setForm(current=>({ ...current, passwordConfirmed: e.target.value }))
    function formValidator(currentForm){
        Object.entries(currentForm).forEach(([key,val])=>{
            switch(key){
                case 'username':
                    if(val.length){
                        setErrors(current=>({
                            ...current,
                            username: {
                                ...current.username,
                                empty: false
                            }
                        }));
                        //errors.username.empty = false;
                        if(val.length>15)
                        //
                            errors.username.maxlength = true;
                        else
                        //
                            errors.username.maxlength = false;

                        if(!/^[a-zA-Z0-9]+$/.test(val))
                        //
                            errors.username.notAlphanumeric = true;
                        else
                        //
                            errors.username.notAlphanumeric = false;
                    } else {
                        //
                        errors.username.empty = true;
                    }   
                    break;
                case 'email':
                    if(val.length){
                        //
                        errors.email.empty = false;
                        if(!email.validate(val))
                        //
                            errors.email.invalidEmail = true;
                        else
                        //
                            errors.email.invalidEmail = false;
                    } else {
                        //
                        errors.email.empty = true;
                    } 
                    break;
                case 'password':
                    if(val.length){
                        //
                        errors.password.empty = false;
                        if(val.length<8)
                        //
                            errors.password.minlength=true;
                        else
                        //
                            errors.password.minlength=false;
                    } else {
                        //
                        errors.password.empty = true;
                    }
                    break;
                case 'passwordConfirmed':
                    if(val.length){
                        errors.passwordConfirmed.empty = false;
                        if(val.length<8)
                            errors.passwordConfirmed.minlength=true;
                        else
                            errors.passwordConfirmed.minlength=false;
                    } else {
                        errors.passwordConfirmed.empty = true;
                    }
                    break;
            }
        });

        if(errors)
            setValid(false);
        else
            setValid(true);
    };

    const [form, setForm] = useState(defaultForm);
    const [dirty, setDirty] = useState(false);
    const [valid, setValid] = useState(false);
    const [errors, setErrors] = useState(defaultErrors);

    useEffect(()=>{
        if(dirty)
            formValidator(form);
        console.log(errors);
    }, [form]);

    const handleClose = () => {
        setForm(defaultForm);
        setDirty(false);
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
                                if(!dirty) setDirty(true);                         
                                setForm(current=>({ 
                                ...current,
                                username: e.target.value
                            }))}} 
                            value={form.username}
                            isInvalid={true}        
                        />
                        <Form.Text>
                            {true && "Testing Something Too"}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>                                                                                                             
                        <Form.Control 
                            type="email" 
                            onChange={e=>{
                                if(!dirty) setDirty(true);
                                setForm(current=>({ 
                                ...current,
                                email: e.target.value
                            }))}} 
                            value={form.email}                                                           
                        />                                                                                
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>                                                                                    
                        <Form.Control 
                            type="password"                                                                 
                            onChange={e=>{
                                if(!dirty) setDirty(true);
                                setForm(current=>({ 
                                ...current,
                                password: e.target.value
                            }))}} 
                            value={form.password}                                                     
                        />                                                                          
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>                                                                                   
                        <Form.Control 
                            type="password"                                                                   
                            onChange={e=>{
                                if(!dirty) setDirty(true);
                                setForm(current=>({ 
                                ...current,
                                passwordConfirmed: e.target.value
                            }))}} 
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