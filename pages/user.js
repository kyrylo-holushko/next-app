import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { readToken } from "../lib/authenticate";
import { updateUser } from "../lib/ajax/user";
import { updateForm } from "../lib/form/uservalidators";

export default function User(){

    const [formEnable, setFormEnable] = useState(false);

    useEffect(()=>{

    }, [formEnable]);

    const [form, setForm] = useState(updateForm.defaultFormInput);
    const [dirty, setDirty] = useState(updateForm.defaultFormDirty);
    const [errors, setErrors] = useState(updateForm.defaultUpdateErrors);
    const [valid, setValid] = useState(false);
    //const [responded, setResponded] = useState(false);
    //const [resMsg, setResMsg] = useState("");

    useEffect(()=>{
        if(Object.values(dirty).some(k=>k===true)) {
            updateForm.formErrorSetter(form, setErrors);
        }
    }, [form]);

    useEffect(()=>{
        updateForm.formValidator(errors, setValid);
    }, [errors]);

    /* useEffect(()=>{
        if(resMsg.length)
            setResponded(true);
    }, [resMsg]); */

    async function submitForm(e) {
        if(valid){
            updateUser(form).then(res=>{
                setResponded(true);
                setForm(signupForm.defaultFormInput);
                setErrors(signupForm.defaultSignupErrors);
                setDirty(signupForm.defaultFormDirty);
                setResponded(false);
            }).catch(e=>{setResMsg(e.message)});
        }      
    }

    return (
        <>
            <Container className="px-5">
                <div className="py-4 d-flex align-items-center">
                    <h2 className="pe-5 d-inline-block">My Profile</h2>
                    {!formEnable && <Button variant="outline-secondary" type="button" onClick={e=>{setFormEnable(true)}} size="sm">
                        Edit
                    </Button>}
                </div>
                <Form>
                    <Form.Group className="mb-3" as={Row}>
                    <Form.Label column sm="2">User Name:</Form.Label>
                    {formEnable ? <Col column sm="10">                                                                                
                        <Form.Control 
                            type="text"
                            onChange={e=>{
                                if(!dirty.username){
                                    setDirty(current=>({
                                    ...current,
                                    username: true
                                    }));
                                    console.log("Username, dirtied up", dirty.username);
                                }                         
                                setForm(current=>({ 
                                ...current,
                                username: e.target.value
                            }));console.log("Username, FORM", form.username);}} 
                            value={dirty.username ? form.username : readToken().username}
                            isInvalid={dirty.username && (errors.username.empty || errors.username.notAlphanumeric || errors.username.maxlength)}        
                        />
                        <Form.Text className="error">
                            {dirty.username && errors.username.empty && "Required field"}
                            {dirty.username && errors.username.notAlphanumeric && "Username must be alphanumeric"}
                            {dirty.username && errors.username.notAlphanumeric && errors.username.maxlength && <br/>}
                            {dirty.username && errors.username.maxlength && "Maximum 15 characters"}
                        </Form.Text></Col> 
                        : 
                        <Col column sm="10"><Form.Control plaintext readOnly defaultValue={readToken().username}/></Col>
                    }
                    </Form.Group>
                    <Form.Group className="mb-3" as={Row}>
                    <Form.Label column sm="2">Email:</Form.Label>
                    {formEnable ? <Col column sm="10">                                                                                                            
                        <Form.Control 
                            type="email" 
                            onChange={e=>{
                                if(!dirty.email){
                                    setDirty(current=>({
                                    ...current,
                                    email: true
                                    }));
                                    console.log("Email, dirtied up", dirty.email);
                                } 
                                setForm(current=>({ 
                                ...current,
                                email: e.target.value
                            }));console.log("Email, FORM", form.email);}} 
                            value={dirty.email ? form.email : readToken().email}
                            isInvalid={dirty.email && (errors.email.empty || errors.email.invalidEmail)}                                                          
                        />
                        <Form.Text className="error">
                            {dirty.email && errors.email.empty && "Required field"}
                            {dirty.email && errors.email.invalidEmail && "Invalid email format"}
                        </Form.Text></Col> 
                        : 
                        <Col column sm="10"><Form.Control plaintext readOnly defaultValue={readToken().email}/></Col>
                    }                                                                                
                    </Form.Group>
                </Form>
                {formEnable && <><br/><Button variant="primary" type="button" onClick={submitForm}>
                    Update
                </Button></>}
            </Container>
        </>
    )
};