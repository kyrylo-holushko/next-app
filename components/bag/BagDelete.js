import { Button, Modal } from "react-bootstrap";
import { deleteBag } from "../../lib/ajax/bag";
import { useState } from "react";

export default function BagDelete(props){

    const setShow = props.setShow;
    //const setWrite = props.setWrite;
    const bid = props.bag.bid;

    const [resMsg, setResMsg] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    async function submitForm(e) {
        deleteBag(bid).then(()=>{
            handleClose();
            props.setWrite(true);
        }).catch(e=>{setResMsg(e.message)});  
    }

    return (
        <Modal show={props.show} onHide={handleClose} size="sm" centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Delete Bag</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {resMsg ? resMsg : <h5>Are you sure you want to delete this bag?</h5>}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" type="button" onClick={submitForm}>
                Confirm
            </Button>
            </Modal.Footer>
        </Modal>
    )
}