import { Button, Modal, Form } from "react-bootstrap";
import { useContext, useState, useEffect } from 'react';
import { loginForm } from "../lib/form/uservalidators";
import { authenticateUser } from "../lib/ajax/user";
import { useRouter } from "next/router";
import { NavContext } from "./Layout";

export default function Signup(props){

    const router = useRouter();
    const setShow = props.setShow;
    const { setNavUpdate } = useContext(NavContext);

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

    useEffect(()=>{
        setValid(false);
    },[props.show]);

    const handleClose = () => {
        setShow(false);
        setForm(loginForm.defaultFormInput);
        setErrors(loginForm.defaultSignupErrors);
        setDirty(loginForm.defaultFormDirty);
        setResponded(false);
        setResMsg("");
    }

    async function submitForm(e) {
        if(valid){  
            authenticateUser(form).then(res=>{
                handleClose();
                setNavUpdate(true); 
                router.push("/bags");
            }).catch(e=>{setResMsg(e.message)});
        }      
    }

    return (
        <Modal show={props.show} onHide={handleClose} size={responded && "sm"} centered>
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
            <Button variant="primary" type="button" onClick={submitForm} disabled={!valid}>
                Log In
            </Button>
            </Modal.Footer>}
        </Modal>
    )
}