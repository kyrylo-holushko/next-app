import { Form, Button, Row, Col, Nav } from "react-bootstrap";
import * as email from 'email-validator';
import { generateResetLink } from "../lib/ajax/user";
import { useState, useEffect } from "react";


export default function PasswordReset() {

    const [showRecoveryEmailForm, setShowRecoveryEmailForm] = useState(false);
    const [recoveryEmailFormInput, setRecoveryEmailFormInput] = useState(false);
    const [dirtyEmail, setDirtyEmail] = useState(false);
    const [emailResMsg, setEmailResMsg] = useState(false);

    useEffect(()=>{
        setShowRecoveryEmailForm(false);
        setRecoveryEmailFormInput(false);
        setDirtyEmail(false);
        setEmailResMsg(false);
    }, []);

    async function resetPassword(e) {
        if(recoveryEmailFormInput.length && email.validate(recoveryEmailFormInput)){
            generateResetLink(recoveryEmailFormInput).then((msg)=>{
                setEmailResMsg(msg);
            }).catch(e=>{setResMsg(e.message)});
        }
    }

    return (
        <>
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
        </>
    )
}