import { Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { itemForm } from "../../lib/form/itemvalidators";
import { createItem } from "../../lib/ajax/item";

export default function ItemCreate(props){

    const setShow = props.setShow;
    const setWrite = props.setWrite;

    const [form, setForm] = useState(itemForm.defaultFormInput);
    const [dirty, setDirty] = useState(itemForm.defaultFormDirty);
    const [errors, setErrors] = useState(itemForm.defaultSignupErrors);
    const [valid, setValid] = useState(false);
    //const [responded, setResponded] = useState(false);
    const [resMsg, setResMsg] = useState(false);

    useEffect(()=>{
        if(Object.values(dirty).some(k=>k===true)) {
            itemForm.formErrorSetter(form, setErrors);
        }
    }, [form]);

    useEffect(()=>{
        itemForm.formValidator(errors, setValid);
    }, [errors]);

    /* useEffect(()=>{
        if(resMsg.length)
            setResponded(true);
    }, [resMsg]); */

    const handleClose = () => {
        setShow(false);
        setForm(itemForm.defaultFormInput);
        setErrors(itemForm.defaultSignupErrors);
        setDirty(itemForm.defaultFormDirty);
        if(resMsg) setResMsg(false);
    }

    async function submitForm(e) {
        if(valid){
            createItem(form).then(res=>{
                handleClose();
                setWrite(true);
            }).catch(e=>{setResMsg(e.message)});
        }      
    }

    return (
        <Modal show={props.show} onHide={handleClose} size="sm" centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Create Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!resMsg ? <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Item Name</Form.Label>                                                                                    
                        <Form.Control 
                            type="text"                                                                 
                            onChange={e=>{
                                if(!dirty.password){
                                    setDirty(current=>({
                                    ...current,
                                    iname: true
                                    }));
                                } 
                                setForm(current=>({ 
                                ...current,
                                iname: e.target.value
                            }))}} 
                            value={form.iname}
                            isInvalid={dirty.iname && (errors.iname.empty || errors.iname.maxlength)}                                                     
                        /> 
                        <Form.Text className="error">
                            {dirty.iname && errors.iname.empty && "Required Field"}
                            {dirty.iname && errors.iname.maxlength && "Maximum 50 characters"}
                        </Form.Text>                                                                         
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Item Description</Form.Label>                                                                                    
                        <Form.Control 
                            as="textarea" 
                            rows={5}                                                                 
                            onChange={e=>{
                                if(!dirty.password){
                                    setDirty(current=>({
                                    ...current,
                                    idesc: true
                                    }));
                                } 
                                setForm(current=>({ 
                                ...current,
                                idesc: e.target.value
                            }))}} 
                            value={form.idesc}
                            isInvalid={dirty.idesc && errors.idesc.maxlength}                                                     
                        /> 
                        <Form.Text className="error">
                            {dirty.idesc && errors.idesc.maxlength && "Maximum 500 characters"}
                        </Form.Text>                                                                         
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Item Priority</Form.Label>                                                                                    
                        <Form.Control 
                            type="number"                                                              
                            onChange={e=>{
                                if(!dirty.password){
                                    setDirty(current=>({
                                    ...current,
                                    priority: true
                                    }));
                                } 
                                setForm(current=>({ 
                                ...current,
                                priority: e.target.value
                            }))}} 
                            value={form.idesc}
                            isInvalid={dirty.priority && (errors.priority.notNumericAndWhole||errors.priority.minMax)}                                                     
                        /> 
                        <Form.Text className="error">
                            {dirty.priority && errors.priority.notNumericAndWhole && "Must be a round number"}
                            {dirty.priority && errors.priority.minMax && "Priority is from 1 to 10"}
                        </Form.Text>                                                                         
                    </Form.Group>
                </Form> : resMsg}
            </Modal.Body>
            {!resMsg && <Modal.Footer>
            <Button variant="primary" type="button" onClick={submitForm}>
                Create Item
            </Button>
            </Modal.Footer>}
        </Modal>
    )
}