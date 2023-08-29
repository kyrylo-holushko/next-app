import { Container, Form, Button } from "react-bootstrap";
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
    const [errors, setErrors] = useState(updateForm.defaultSignupErrors);
    const [valid, setValid] = useState(false);
    //const [responded, setResponded] = useState(false);
    //const [resMsg, setResMsg] = useState("");

    useEffect(()=>{
        if(Object.values(dirty).some(k=>k===true)) {
            signupForm.formErrorSetter(form, setErrors);
        }
    }, [form]);

    useEffect(()=>{
        signupForm.formValidator(errors, setValid);
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
                <h2 className="pt-4">My Profile</h2>
                <Form>
                    <Form.Group className="mb-3">
                    <Form.Label>User Name</Form.Label>
                    {formEnable ? <>                                                                                
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
                            defaultValue={readToken().username}
                            isInvalid={dirty.username && (errors.username.empty || errors.username.notAlphanumeric || errors.username.maxlength)}        
                        />
                        <Form.Text className="error">
                            {dirty.username && errors.username.empty && "Required field"}
                            {dirty.username && errors.username.notAlphanumeric && "Username must be alphanumeric"}
                            {dirty.username && errors.username.notAlphanumeric && errors.username.maxlength && <br/>}
                            {dirty.username && errors.username.maxlength && "Maximum 15 characters"}
                        </Form.Text></> 
                        : 
                        <Form.Control plaintext readOnly defaultValue={readToken().username} />
                    }
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    {formEnable ? <>                                                                                                            
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
                            defaultValue={readToken().email}
                            isInvalid={dirty.email && (errors.email.empty || errors.email.invalidEmail)}                                                          
                        />
                        <Form.Text className="error">
                            {dirty.email && errors.email.empty && "Required field"}
                            {dirty.email && errors.email.invalidEmail && "Invalid email format"}
                        </Form.Text></> 
                        : 
                        <Form.Control plaintext readOnly defaultValue={readToken().email} />
                    }                                                                                
                    </Form.Group>
                </Form>
                {!formEnable && <Button variant="primary" type="button" onClick={e=>{setFormEnable(true)}}>
                    Edit
                </Button>}
                {formEnable && <Button variant="primary" type="button" onClick={submitForm}>
                    Update
                </Button>}
            </Container>
        </>
    )
};