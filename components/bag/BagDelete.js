import { Button, Modal } from "react-bootstrap";
import { deleteBag } from "../../lib/ajax/bag";
import { useEffect, useState } from "react";
import { getItems } from "../../lib/ajax/item";
import { moveAllItems } from "../../lib/ajax/move";

export default function BagDelete(props){

    const setShow = props.setShow;
    const setWrite = props.setWrite;
    const bid = props.bag.bid;

    const [resMsg, setResMsg] = useState(false);
    const [hasItems, setHasItems] = useState(false);
    const [transfer, setTransfer] = useState(false);
    const [bagData, setBagData]= useState(false);
    const [bagOption, setBagOption] = useState();

    useEffect(()=>{
        getItems(bid).then(items=>{
            if(items) {
                setHasItems(true);
            }
            setErrMsg(false);
        }).catch(e=>{setItemData(false);setErrMsg(e.message)});           
        setWriteReq(false);
    },[props.show]);

    useEffect(()=>{
        getBags().then(bags=>{
            setBagOption(bags[0].bid);
            setBagData(bags);
            setResMsg(false);
        }).catch(e=>{setBagData(false);setResMsg(e.message)});
    }, [props.show]);

    const handleClose = () => {
        setShow(false);
        setHasItems(false);
        setTransfer(false);
        setBagData(false);
        if(resMsg) setResMsg(false);
    }

    async function submitForm(e) {
        if(transfer) {
            moveAllItems(bid, bagOption).then(()=>{
                deleteBag(bid).then(()=>{
                    handleClose();
                    setWrite(true);
                }).catch(e=>{setResMsg(e.message)});
            }).catch(e=>{setResMsg(e.message)});
        } else {
            deleteBag(bid).then(()=>{
                handleClose();
                setWrite(true);
            }).catch(e=>{setResMsg(e.message)});
        }
    }

    return (
        <Modal show={props.show} onHide={handleClose} size="sm" centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Delete Bag</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!resMsg ? <>
                    {(hasItems&&(bagData.length>1)) && 
                    <>
                        <h5>This bag is not empty. Would you like to transfer items before deletion?</h5>
                        <Form>
                        <Form.Check // prettier-ignore
                            type="checkbox"
                            label="Save bag's items in another bag"
                            defaultChecked={false}
                            onClick={(e) => {
                                setTransfer(e.target.checked);
                            }}
                        />
                        {transfer && <Form.Group className="mb-3">
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
                        </Form.Group>}
                        </Form>
                    </>
                    }
                    {(hasItems&&(bagData.length===1)) && 
                    <>
                        <h5>{hasItems && "This bag is not empty." }Are you sure you want to delete this bag?</h5>
                    </>
                    }
                </>   
            : resMsg}
            </Modal.Body>
            {!resMsg && <Modal.Footer>
            <Button variant="primary" type="button" onClick={submitForm}>
                Confirm
            </Button>
            </Modal.Footer>}
        </Modal>
    )
}