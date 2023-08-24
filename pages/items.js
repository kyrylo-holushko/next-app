import { BagContext } from "./_app";
import { useContext, useEffect, useState } from "react";
import { getItems } from "../lib/ajax/item";
import { Container, Button, Table, Nav } from "react-bootstrap";

export default function Items(){

    const { bag } = useContext(BagContext);
    const bid = bag.bid;
    const bagName = bag.bname;
    const [itemData, setItemData] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
    const [writeReq, setWriteReq] = useState(false);
    const [item, setItem] = useState(false);

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

    function showItemDetails() {
        //Show modal here with item details
    };

    const handleSelect = (eventKey) => {
        setItem({ bid, bname });
        switch(eventKey){
            case "edit":
                props.setShowBagEdit(true);
                break;
            case "delete":
                props.setShowBagDelete(true);
                break;
        }
    };

    return (
        <>
            <Container className="p-5">
                <h1>{bagName}</h1>
                <Button>Add Item +</Button>
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
                            <tr key={i} onClick={e=>{showItemDetails}}>
                                <td>{item.iname}</td>
                                <td>{item.idesc}</td>
                                <td>{item.priority}</td>
                                <td>
                                    <Nav onSelect={handleSelect}>
                                        <Nav.Item>
                                            <Nav.Link eventKey="edit"><u>Edit</u></Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="delete"><u>Delete</u></Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </td>
                            </tr> 
                        ))}
                    </tbody>
                </Table>}
            </Container>
        </>
    )
}