import { getBags } from "../../lib/ajax/bag";
import { Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { moveAllItems } from "../../lib/ajax/move";

export default function ItemMoveAll(props){

    const setShow = props.setShow;
    const setWrite = props.setWrite;
    const setPage = props.setPage;
    const oldBag = props.obid;

    const [bagData, setBagData]= useState(false);
    const [resMsg, setResMsg] = useState(false);
    const [bagOption, setBagOption] = useState(null);

    useEffect(()=>{
        getBags().then(bags=>{
            let bagsFiltered = bags.filter((bag) => bag.bid !== oldBag);
            setBagOption(bagsFiltered[0].bid);
            setBagData(bagsFiltered);
            setResMsg(false);
        }).catch(e=>{setBagData(false);setResMsg(e.message)});           
        setWrite(false);
    },[props.show]);

    const handleClose = () => {
        setShow(false);
        if(resMsg) setResMsg(false);
    }

    async function submitForm(e) {
        moveAllItems(oldBag, bagOption).then(()=>{
            setPage(1);
            setWrite(true);
            handleClose();
        }).catch(e=>{setResMsg(e.message)});
    }

    return (
        <Modal show={props.show} onHide={handleClose} centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Move All Items</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!resMsg ?  
                <Form>
                    {(bagData.length>0) ? <Form.Group className="mb-3">
                        <Form.Label>Select bag to transfer to:</Form.Label>
                        <Form.Control
                            as="select"
                            value={bagOption}
                            onChange={e=>{
                                setBagOption(e.target.value);
                            }}
                            defaultValue={bagOption}
                        >
                        {bagData.map((bag, i) => {
                            return <option value={bag.bid} key={i}>{bag.bname}</option>;
                        })}
                        </Form.Control>
                    </Form.Group> : <Form.Text>You only have one bag.</Form.Text>}
                </Form>: resMsg}
            </Modal.Body>
            {!resMsg && (bagData.length>0) && <Modal.Footer>
            <Button variant="primary" type="button" onClick={submitForm}>
                Transfer
            </Button>
            </Modal.Footer>}
        </Modal>
    )
}