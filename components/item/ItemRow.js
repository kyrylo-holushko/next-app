import { Nav, Row } from "react-bootstrap"

export default function ItemRow(props) {

    const { iid, iname, idesc, priority } = props.item;

    const handleSelect = (eventKey) => {
        setItem(iid);
        switch(eventKey){
            case "edit":
                //props.setShowBagEdit(true);
                break;
            case "delete":
                //props.setShowBagDelete(true);
                break;
        }
    };

    return (
        <>
            <style jsx>{`
				.idesclocal {
                    white-space: nowrap !important;
                    overflow: hidden !important;
                    text-overflow: ellipsis !important;
                }
                .wdesc {
                    width: 1px;
                }
			`}</style>
            <tr key={props.key} onClick={e=>{showItemDetails}}>
                <td className="iname">{iname}</td>
                <td className="idesc">{idesc}</td>
                <td>{priority}</td>
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
        </>
    )

};