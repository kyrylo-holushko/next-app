import { Button, Modal } from "react-bootstrap";
import { deleteItem } from "../../lib/ajax/item";
import { useState } from "react";

export default function ItemDelete(props){

    const setShow = props.setShow;
    const setWrite = props.setWrite;
    const itemId = props.iid;
    const setDelete = props.setDelete;

    const [resMsg, setResMsg] = useState(false);

    const handleClose = () => {
        setShow(false);
        if(resMsg) setResMsg(false);
    }

    async function submitForm(e) {
        deleteItem(itemId).then(()=>{
            handleClose();
            setDelete(true);
            setWrite(true);
        }).catch(e=>{setResMsg(e.message)});  
    }

    return (
        <Modal show={props.show} onHide={handleClose} size="sm" centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Delete Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!resMsg ? <h5>Are you sure you want to delete this item?</h5> : resMsg}
            </Modal.Body>
            {!resMsg && <Modal.Footer>
            <Button variant="primary" type="button" onClick={submitForm}>
                Confirm
            </Button>
            </Modal.Footer>}
        </Modal>
    )
}