import { BagContext } from "./_app";
import { useContext, useEffect, useState } from "react";
import { getItems } from "../lib/ajax/item";
import { Container, Button, Table, Nav } from "react-bootstrap";
import ItemRow from "../components/item/ItemRow";
import ItemCreate from "../components/item/itemCreate";

export default function Items(){

    const { bag } = useContext(BagContext);
    const bid = bag.bid;
    const bagName = bag.bname;
    const [itemData, setItemData] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
    const [writeReq, setWriteReq] = useState(false);
    const [item, setItem] = useState(false);
    const [showItemCreate, setShowItemCreate] = useState(false);

    useEffect(()=>{
        getItems(bagId).then(items=>{
            setItemData(items);
            setErrMsg(false);
        }).catch(e=>{setBagData(false);setErrMsg(e.message)});           
        setWriteReq(false);
    },[writeReq]);

    /* showItemDetails = () => {
        //show item modal
    }; */

    const handleShowItemDetails = () => { 
        //Show modal here with item details 
    };

    const handleShowItemCreate = () => setShowItemCreate(true);

    return (
        <>
            <Container className="p-5">
                <h1>{bagName}</h1>
                <Button variant="outline-secondary" onClick={handleShowItemCreate}>Add Item +</Button>
                {errMsg && <h4 className="p-5">{errMsg}</h4>}
                {itemData && <Table>
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
                            <ItemRow key={i} /*onClick={showItemDetails}*/ item={item}/>  
                        ))}
                    </tbody>
                </Table>}
            </Container>
            <ItemCreate show={showItemCreate} setShow={setShowItemCreate} setWrite={setWriteReq}/>
        </>
    )
}