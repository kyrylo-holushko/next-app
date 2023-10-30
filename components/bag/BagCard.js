import { Card, Button, Nav } from "react-bootstrap";
import { useRouter } from "next/router";

export default function BagCard(props){

    const router = useRouter();

    const { bid, bname } = props.bag;
    const setBag = props.setBag;

    const handleSelect = (eventKey) => {
        setBag({ bid, bname });
        switch(eventKey){
            case "edit":
                props.setShowBagEdit(true);
                break;
            case "delete":
                props.setShowBagDelete(true);
                break;
        }
    };

    const openBag = () => {
        setBag({ bid, bname });
        localStorage.setItem('bagId', bid);
        localStorage.setItem('bagName', bname);
        router.push("/items");
    };

    return (
        <>
            <Card>
                <Card.Header>
                    <Nav onSelect={handleSelect} className="justify-content-end">
                        <Nav.Item>
                            <Nav.Link eventKey="edit"><u>Edit</u></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="delete"><u>Delete</u></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{bname ? bname : null}</Card.Title>         
                </Card.Body>
                <Card.Footer className="text-center">
                    <Button variant="primary" onClick={openBag}>OPEN</Button>
                </Card.Footer>
            </Card>
        </>
    )
};