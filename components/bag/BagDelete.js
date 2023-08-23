import { Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { deleteBag } from "../../lib/ajax/bag";

export default function BagDelete(props){

    const setShow = props.setShow;
    const setWrite = props.setWrite;
    const bid = props.bid;

    const [responded, setResponded] = useState(false);
    const [resMsg, setResMsg] = useState("");

    useEffect(()=>{
        if(resMsg.length)
            setResponded(true);
    }, [resMsg]);

    const handleClose = () => {
        setShow(false);
        setResponded(false);
        setResMsg("");
    }

    async function submitForm(e) {
        deleteBag(bid).then(res=>{
            setResMsg(`${res.message}: ${res.data.bname}`);
            setWrite(true);
        }).catch(e=>{setResMsg(e.message)});  
    }

    return (
        <Modal show={props.show} onHide={handleClose} size="sm" centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Delete Bag</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!responded && <h5>Are you sure you want to delete this bag?</h5>}
                {responded && resMsg}
            </Modal.Body>
            {!responded && <Modal.Footer>
            <Button variant="primary" type="button" onClick={submitForm}>
                Confirm
            </Button>
            </Modal.Footer>}
        </Modal>
    )
}