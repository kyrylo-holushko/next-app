import { Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { bagForm } from "../../lib/form/bagvalidators";
import { createBag } from "../../lib/ajax/bag";

export default function BagCreate(props){

    const setShow = props.setShow;
    const setWrite = props.setWrite;

    const [form, setForm] = useState(bagForm.defaultFormInput);
    const [dirty, setDirty] = useState(bagForm.defaultFormDirty);
    const [errors, setErrors] = useState(bagForm.defaultSignupErrors);
    const [valid, setValid] = useState(false);
    const [resMsg, setResMsg] = useState(false);

    useEffect(()=>{
        if(Object.values(dirty).some(k=>k===true)) {
            bagForm.formErrorSetter(form, setErrors);
        }
    }, [form]);

    useEffect(()=>{
        bagForm.formValidator(errors, setValid);
    }, [errors]);

    useEffect(()=>{
        setValid(false);
    },[props.show]);

    const handleClose = () => {
        setShow(false);
        setForm(bagForm.defaultFormInput);
        setErrors(bagForm.defaultSignupErrors);
        setDirty(bagForm.defaultFormDirty);
        if(resMsg) setResMsg(false);
    }

    async function submitForm(e) {
        if(valid){
            createBag(form).then(res=>{
                handleClose();
                setWrite(true);
            }).catch(e=>{setResMsg(e.message)});
        }      
    }

    return (
        <Modal show={props.show} onHide={handleClose} size="sm" centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Create Bag</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!resMsg ? <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Bag Name</Form.Label>                                                                                    
                        <Form.Control 
                            type="text"                                                                 
                            onChange={e=>{
                                if(!dirty.password){
                                    setDirty(current=>({
                                    ...current,
                                    bname: true
                                    }));
                                } 
                                setForm(current=>({ 
                                ...current,
                                bname: e.target.value
                            }))}} 
                            value={form.bname}
                            isInvalid={dirty.bname && (errors.bname.empty || errors.bname.maxlength)}                                                     
                        /> 
                        <Form.Text className="error">
                            {dirty.bname && errors.bname.empty && "Required Field"}
                            {dirty.bname && errors.bname.maxlength && "Maximum 20 characters"}
                        </Form.Text>                                                                         
                    </Form.Group>
                </Form> : resMsg}
            </Modal.Body>
            {!resMsg && <Modal.Footer>
            <Button variant="primary" type="button" onClick={submitForm} disabled={!valid}>
                Create Bag
            </Button>
            </Modal.Footer>}
        </Modal>
    )
}