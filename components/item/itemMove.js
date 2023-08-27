import { getBags } from "../lib/ajax/bag"






import { Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { itemForm } from "../../lib/form/itemvalidators";
import { editItem } from "../../lib/ajax/item";

export default function ItemMove(props){

    const setShow = props.setShow;
    const setWrite = props.setWrite;
    const itemId = props.iid;

    const [bagData, setBagData]= useState(false);
    //const [form, setForm] = useState(itemForm.defaultFormInput);
    //const [dirty, setDirty] = useState(itemForm.defaultFormDirty);
    //const [errors, setErrors] = useState(itemForm.defaultSignupErrors);
    //const [valid, setValid] = useState(false);
    const [resMsg, setResMsg] = useState(false);

    /* useEffect(()=>{
        if(Object.values(dirty).some(k=>k===true)) {
            itemForm.formErrorSetter(form, setErrors);
        }
    }, [form]); */

    /* useEffect(()=>{
        itemForm.formValidator(errors, setValid);
    }, [errors]); */

    useEffect(()=>{
        getBags().then(bags=>{
            setBagData(bags);
            setErrMsg(false);
        }).catch(e=>{setBagData(false);setErrMsg(e.message)});           
        setWriteReq(false);
    },[writeReq]);

    const handleClose = () => {
        setShow(false);
        //setForm(itemForm.defaultFormInput);
        //setErrors(itemForm.defaultSignupErrors);
        setDirty(itemForm.defaultFormDirty);
        if(resMsg) setResMsg(false);
    }

    async function submitForm(e) {
        if(valid){
            editItem(form, itemId).then(res=>{
                handleClose();
                setWrite(true);
            }).catch(e=>{setResMsg(e.message)});
        }      
    }

    return (
        <Modal show={props.show} onHide={handleClose} size="sm" centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Move Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!resMsg ?  
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Select bag to transfer to:</Form.Label>
                        <Form.Control
                            as="select"
                            value={type}
                            onChange={e=>{
                                //e.target.value
                            }}
                        >
                        {bagData.map((bag, i) => (
                            <option value={bag.bid} key={i}>{bag.bname}</option> 
                        ))}
                        </Form.Control>
                    </Form.Group>
                </Form>: resMsg}
            </Modal.Body>
            {!resMsg && <Modal.Footer>
            <Button variant="primary" type="button" onClick={submitForm}>
                Transfer
            </Button>
            </Modal.Footer>}
        </Modal>
    )
}