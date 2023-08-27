import { BagContext } from "./_app";
import { useContext, useEffect, useState } from "react";
import { getItems } from "../lib/ajax/item";
import { Container, Button, Table, Row, Col } from "react-bootstrap";
import ItemRow from "../components/item/ItemRow";
import ItemCreate from "../components/item/itemCreate";
import ItemEdit from "../components/item/itemEdit";
import ItemDelete from "../components/item/itemDelete";
import ItemMove from "../components/item/itemMove";

export default function Items(){

    const { bag } = useContext(BagContext);
    const bagId = bag.bid;
    const bagName = bag.bname;
    const [itemData, setItemData] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
    const [writeReq, setWriteReq] = useState(false);
    const [itemId, setItemId] = useState(false);
    const [showItemCreate, setShowItemCreate] = useState(false);
    const [showItemEdit, setShowItemEdit] = useState(false);
    const [showItemDelete, setShowItemDelete] = useState(false);
    const [showItemMove, setShowItemMove] = useState(false);

    useEffect(()=>{
        getItems(bagId).then(items=>{
            setItemData(items);
            setErrMsg(false);
        }).catch(e=>{setItemData(false);setErrMsg(e.message)});           
        setWriteReq(false);
    },[writeReq]);

    /* showItemDetails = () => {
        //show item modal
    }; */

    const handleShowItemDetails = () => { 
        //Show modal here with item details 
    };

    const handleShowItemCreate = () => setShowItemCreate(true);
    const handleShowItemEdit = () => setShowItemEdit(true);

    return (
        <>
            <style jsx>{`
				.idesclocal {
                    white-space: nowrap !important;
                    overflow: hidden !important;
                    text-overflow: ellipsis !important;
                }
			`}</style>
            <Container className="px-5">
                <Row>
                    <Col sm md lg className="my-auto pt-4"><h2 className="d-inline">{bagName?.toUpperCase()}</h2></Col>
                    <Col md lg className="pt-4"><Button className="border-2 float-end" variant="outline-secondary" onClick={handleShowItemCreate} size="lg">Add Item +</Button></Col>
                </Row>
                {errMsg && <h4 className="pt-4">{errMsg}</h4>}
                {itemData && <Row className="pt-4"> 
                <Table className="tablefixed" striped bordered hover>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {itemData.map((item, i) => (
                            <ItemRow key={i} /*onClick={showItemDetails}*/ item={item} setItemId={setItemId} setShowItemEdit={setShowItemEdit} setShowItemDelete={setShowItemDelete}/>  
                        ))}
                    </tbody>
                </Table>
                </Row>}
            </Container>
            <ItemCreate show={showItemCreate} setShow={setShowItemCreate} setWrite={setWriteReq} bid={bagId}/>
            <ItemEdit show={showItemEdit} setShow={setShowItemEdit} setWrite={setWriteReq} iid={itemId}/>
            <ItemDelete show={showItemDelete} setShow={setShowItemDelete} setWrite={setWriteReq} iid={itemId}/>
            <ItemMove show={showItemMove} setShow={setShowItemMove} setWrite={setWriteReq} iid={itemId}/>
        </>
    )
}