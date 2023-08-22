import { Button, Modal, Form } from "react-bootstrap";
import { useContext, useState, useEffect } from 'react';
import { loginForm } from "../lib/form/uservalidators";
import { authenticateUser } from "../lib/ajax/user";
import { readToken } from "../lib/authenticate";
import { SetUserContext } from "./RouteGuard";
import { useRouter } from "next/router";

export default function Signup(props){

    const router = useRouter();
    const setShow = props.setShow;
    const setUser = useContext(SetUserContext);
    var apiResMsg = "";
    const [form, setForm] = useState(loginForm.defaultFormInput);
    const [dirty, setDirty] = useState(loginForm.defaultFormDirty);
    const [errors, setErrors] = useState(loginForm.defaultSignupErrors);
    const [valid, setValid] = useState(false);
    const [responded, setResponded] = useState(false);
    const [resMsg, setResMsg] = useState("");

    useEffect(()=>{
        if(Object.values(dirty).some(k=>k===true)) {
            loginForm.formErrorSetter(form, setErrors);
        }
        console.log(errors);
    }, [form]);

    useEffect(()=>{
        loginForm.formValidator(errors, setValid);
    }, [errors]);

    useEffect(()=>{
        if(resMsg.length)
            setResponded(true);
    }, [resMsg]);

    const handleClose = () => {
        setShow(false);
        setForm(loginForm.defaultFormInput);
        setErrors(loginForm.defaultSignupErrors);
        setDirty(loginForm.defaultFormDirty);
        setResponded(false);
        setResMsg("");
    }

    async function submitForm(e) {
        console.log("The form's data", form);
        console.log("Dirty State", dirty);
        console.log("The Error state", errors);
        console.log("The Valid state", valid);
        if(valid){  
            console.log("VALID FORM");
            authenticateUser(form).then(res=>{
                handleClose();
                setUser(readToken()); 
                router.push("/bags");
            }).catch(e=>{setResMsg(e.message)});
        }      
    }

    return (
        <Modal show={props.show} onHide={handleClose} size={responded && "sm"}>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!responded && <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>User Name or Email</Form.Label>                                                                                     
                        <Form.Control 
                            type="text"
                            onChange={e=>{
                                if(!dirty.usernameOrEmail){
                                    setDirty(current=>({
                                    ...current,
                                    usernameOrEmail: true
                                    }));
                                }                         
                                setForm(current=>({ 
                                ...current,
                                usernameOrEmail: e.target.value
                            }))}} 
                            value={form.username}
                            isInvalid={dirty.usernameOrEmail && errors.usernameOrEmail.empty}        
                        />
                        <Form.Text className="error">
                            {dirty.usernameOrEmail && errors.usernameOrEmail.empty && "Required field"}
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
                            isInvalid={dirty.password && errors.password.empty}                                                     
                        /> 
                        <Form.Text className="error">
                            {dirty.password && errors.password.empty && "Required Field"}
                        </Form.Text>                                                                         
                    </Form.Group>
                </Form>}
                {responded && resMsg}
            </Modal.Body>
            {!responded && <Modal.Footer>
            <Button variant="primary" type="button" onClick={submitForm}>
                Log In
            </Button>
            </Modal.Footer>}
        </Modal>
    )
}