import { Container, Form, Button, Row, Col, Nav } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { readToken } from "../lib/authenticate";
import { updateUser, generateResetLink } from "../lib/ajax/user";
import { updateForm } from "../lib/form/uservalidators";
import { NavContext } from "../components/Layout";
import Delete from "../components/Delete";
import * as email from 'email-validator';

export default function User(){

    const defaultFormInput = {username: readToken()?.username, email: readToken()?.email};
    const [form, setForm] = useState(defaultFormInput);
    const [dirty, setDirty] = useState(updateForm.defaultFormDirty);
    const [errors, setErrors] = useState(updateForm.defaultUpdateErrors);
    const [valid, setValid] = useState(false);
    const [formEnable, setFormEnable] = useState(false);
    const { navUpdate, setNavUpdate } = useContext(NavContext);
    const [resMsg, setResMsg] = useState(false);
    const [showUserDelete, setShowUserDelete] = useState(false);

    const [showRecoveryEmailForm, setShowRecoveryEmailForm] = useState(false);
    const [recoveryEmailFormInput, setRecoveryEmailFormInput] = useState(false);
    const [dirtyEmail, setDirtyEmail] = useState(false);
    const [emailResMsg, setEmailResMsg] = useState(false);


    useEffect(()=>{
        if(Object.values(dirty).some(k=>k===true)) {
            updateForm.formErrorSetter(form, setErrors);
        }
    }, [form]);

    useEffect(()=>{
        updateForm.formValidator(errors, setValid);
    }, [errors]);

    useEffect(()=>{
        setValid(false);
        setFormEnable(false);
        setShowRecoveryEmailForm(false);
        setRecoveryEmailFormInput(false);
        setDirtyEmail(false);
    }, []);

    async function submitForm(e) {
        if(valid){
            updateUser(form).then(res=>{
                setNavUpdate(true);
                setFormEnable(false);
                setForm(defaultFormInput);
                setValid(false);
                setErrors(updateForm.defaultUpdateErrors);
                setDirty(updateForm.defaultFormDirty);             
            }).catch(e=>{setResMsg(e.message)});
        }      
    }

    const handleShowUserDelete = () => setShowUserDelete(true);

    async function resetPassword(e) {
        if(recoveryEmailFormInput.length && email.validate(recoveryEmailFormInput)){
            generateResetLink(recoveryEmailFormInput).then((msg)=>{
                setEmailResMsg(msg);
            }).catch(e=>{setResMsg(e.message)});
        }
    }

    return (
        <>
            <Container className="px-5">
                <div className="py-4 d-flex align-items-center">
                    <h2 className="pe-5 d-inline-block">My Profile</h2>
                    {!formEnable && <>
                    <Button variant="outline-danger" type="button" onClick={handleShowUserDelete} size="sm">
                        Delete
                    </Button>
                    &nbsp;&nbsp;
                    <Button variant="outline-secondary" type="button" onClick={e=>{setFormEnable(true);setResMsg(false);}} size="sm">
                        Edit
                    </Button>
                    </>}
                    {formEnable && <Button variant="outline-secondary" type="button" onClick={e=>{setFormEnable(false);setDirty(updateForm.defaultFormDirty);}} size="sm">
                        Revert
                    </Button>}
                </div>
                <Form>
                    <Form.Group className="mb-3" as={Row}>
                    <Form.Label column sm="2"><b>User Name:</b></Form.Label>
                    {formEnable ? <Col column sm="10">                                                                                
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
                            value={dirty.username ? form.username : readToken()?.username}
                            isInvalid={dirty.username && (errors.username.empty || errors.username.notAlphanumeric || errors.username.maxlength)}        
                        />
                        <Form.Text className="error">
                            {dirty.username && errors.username.empty && "Required field"}
                            {dirty.username && errors.username.notAlphanumeric && "Username must be alphanumeric"}
                            {dirty.username && errors.username.notAlphanumeric && errors.username.maxlength && <br/>}
                            {dirty.username && errors.username.maxlength && "Maximum 15 characters"}
                        </Form.Text></Col> 
                        : 
                        <Col column sm="10"><Form.Control plaintext readOnly value={readToken()?.username}/></Col>
                    }
                    </Form.Group>
                    <Form.Group className="mb-3" as={Row}>
                    <Form.Label column sm="2"><b>Email:</b></Form.Label>
                    {formEnable ? <Col column sm="10">                                                                                                            
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
                            value={dirty.email ? form.email : readToken()?.email}
                            isInvalid={dirty.email && (errors.email.empty || errors.email.invalidEmail)}                                                          
                        />
                        <Form.Text className="error">
                            {dirty.email && errors.email.empty && "Required field"}
                            {dirty.email && errors.email.invalidEmail && "Invalid email format"}
                        </Form.Text></Col> 
                        : 
                        <Col column sm="10"><Form.Control plaintext readOnly value={readToken()?.email}/></Col>
                    }                                                                                
                    </Form.Group>
                </Form>
                {resMsg && <h6 className="error">{resMsg}</h6>}
                {formEnable && <><br/><Button variant="primary" type="button" onClick={submitForm} disabled={!valid}>
                    Update
                </Button></>}
                <br/>
                <br/>
                <Nav.Link href="#" onClick={e=>{setShowRecoveryEmailForm(true)}}>
                    <u>Reset Password</u>
                </Nav.Link>
                <br/>
                {showRecoveryEmailForm &&
                <>
                <Form>
                    <Form.Group className="mb-3" as={Row}>
                    <Col column sm="10">                                                                                                            
                        <Form.Control 
                            type="email" 
                            onChange={e=>{
                                setDirtyEmail(true);
                                setRecoveryEmailFormInput(e.target.value);
                            }}
                            value={recoveryEmailFormInput ? recoveryEmailFormInput : ""}
                            isInvalid={dirtyEmail && (!recoveryEmailFormInput.length || !email.validate(recoveryEmailFormInput))}                                                          
                        />
                        <Form.Text className="error">
                            {dirtyEmail && 
                            (((!email.validate(recoveryEmailFormInput) && recoveryEmailFormInput.length) && "Invalid email format")
                            ||
                            ((!recoveryEmailFormInput.length) && "Required field"))
                            }                        
                        </Form.Text>
                    </Col>                                                    
                    </Form.Group>
                </Form>
                {emailResMsg ? <h4>{emailResMsg}</h4> : <Button variant="primary" type="button" onClick={resetPassword} disabled={(!recoveryEmailFormInput.length || !email.validate(recoveryEmailFormInput))}>
                    Send Reset Link
                </Button>}
                </> 
                }
            </Container>
            <Delete show={showUserDelete} setShow={setShowUserDelete}/>
        </>
    )
};