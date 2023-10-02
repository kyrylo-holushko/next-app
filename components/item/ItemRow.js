import { Nav, Row } from "react-bootstrap"
import { useState } from "react";
import ItemDetails from "./ItemDetails";

export default function ItemRow(props) {

    const { iid, iname, idesc, priority } = props.item;
    const setItemId = props.setItemId;

    const [showItemDetails, setShowItemDetails] = useState(false);

    const handleShowDetails = () => setShowItemDetails(true);

    const handleSelect = (eventKey, event) => {
        event.stopPropagation();
        setItemId(iid);
        switch(eventKey){
            case "move":
                props.setShowItemMove(true);
                break;
            case "edit":
                props.setShowItemEdit(true);
                break;
            case "delete":
                props.setShowItemDelete(true);
                break;
        }
    };

    return (
        <>
            <tr key={props.key} onClick={handleShowDetails}>
                <td className="iname">{iname}</td>
                <td className="idesc">{idesc}</td>
                <td>{priority}</td>
                <td>
                    <Nav onSelect={handleSelect}>
                        <Nav.Item>
                                <Nav.Link eventKey="move"><u>Move</u></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                                <Nav.Link eventKey="edit"><u>Edit</u></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                                <Nav.Link eventKey="delete"><u>Delete</u></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </td>
            </tr>
            <ItemDetails show={showItemDetails} setShow={setShowItemDetails} item={props.item}/>
        </>
    )
};