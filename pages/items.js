import { BagContext } from "./_app";
import { useContext, useEffect, useState } from "react";
import { getItems } from "../lib/ajax/item";
import { Container, Button, Table, Row, Col } from "react-bootstrap";
import ItemRow from "../components/item/ItemRow";
import ItemCreate from "../components/item/ItemCreate";
import ItemEdit from "../components/item/ItemEdit";
import ItemDelete from "../components/item/ItemDelete";
import ItemMove from "../components/item/ItemMove";
import ItemMoveAll from "../components/item/ItemMoveAll";

export default function Items(){

    const { bag } = useContext(BagContext);
    const bagId = bag.bid;
    const bagName = bag.bname;
    const [itemData, setItemData] = useState(false); //page data
    const [errMsg, setErrMsg] = useState(false);
    const [writeReq, setWriteReq] = useState(false);
    const [itemId, setItemId] = useState(false);
    const [showItemCreate, setShowItemCreate] = useState(false);
    const [showItemEdit, setShowItemEdit] = useState(false);
    const [showItemDelete, setShowItemDelete] = useState(false);
    const [showItemMove, setShowItemMove] = useState(false);
    const [showItemMoveAll, setShowItemMoveAll] = useState(false);

    const [page, setPage] = useState(1); //page state
    const [perPage, setPerPage] = useState(3);

    useEffect(()=>{
        getItems(bagId, page, perPage).then(items=>{
            setItemData(items);
            setErrMsg(false);
        }).catch(e=>{setItemData(false);setErrMsg(e.message)});           
        setWriteReq(false);
    },[writeReq]);

    const handleShowItemCreate = () => setShowItemCreate(true);
    const handleShowItemMoveAll = () => setShowItemMoveAll(true);

    return (
        <>
            <Container className="px-5">
                <Row>
                    <Col sm md lg className="my-auto pt-4"><h2 className="d-inline">{bagName?.toUpperCase()}</h2></Col>
                    <Col md lg className="pt-4">
                        <div className="float-end">
                            {!errMsg && <Button className="border-2" variant="outline-secondary" onClick={handleShowItemMoveAll} size="lg">Move All</Button>}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button className="border-2" variant="outline-secondary" onClick={handleShowItemCreate} size="lg">Add Item +</Button>
                        </div>
                    </Col>
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
                            <ItemRow key={i}
                            item={item} 
                            setItemId={setItemId} 
                            setShowItemEdit={setShowItemEdit} 
                            setShowItemDelete={setShowItemDelete} 
                            setShowItemMove={setShowItemMove}
                            />  
                        ))}
                    </tbody>
                </Table>
                </Row>}
            </Container>
            <ItemCreate show={showItemCreate} setShow={setShowItemCreate} setWrite={setWriteReq} bid={bagId}/>
            <ItemEdit show={showItemEdit} setShow={setShowItemEdit} setWrite={setWriteReq} iid={itemId}/>
            <ItemDelete show={showItemDelete} setShow={setShowItemDelete} setWrite={setWriteReq} iid={itemId}/>
            <ItemMove show={showItemMove} setShow={setShowItemMove} setWrite={setWriteReq} iid={itemId}/>
            <ItemMoveAll show={showItemMoveAll} setShow={setShowItemMoveAll} setWrite={setWriteReq} obid={bagId}/>
        </>
    )
}