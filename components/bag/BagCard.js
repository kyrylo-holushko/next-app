import { Card, Button, Nav } from "react-bootstrap";
import { useRouter } from "next/router";

export default function BagCard(props){

    const router = useRouter();

    const { bid, bname } = props.bag;
    const setBag = props.setBag;

    const handleSelect = (eventKey) => {
        setBag(bid);
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
        setBag(bid);
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


{/* <Card>
          <Card.Img src={data.primaryImageSmall ? data.primaryImageSmall : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"} alt="Card image" />
          <Card.Body>
            <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
            <Card.Text>
              <strong>Date: </strong>{data.objectDate ? data.objectDate : "N/A"}<br/>
              <strong>Classification: </strong>{data.classification ? data.classification : "N/A"}<br/>
              <strong>Medium: </strong>{data.medium ? data.medium : "N/A"}<br/><br/>
            </Card.Text>
            <Link href={`/artwork/${encodeURIComponent(props.objectID)}`} passHref><Button variant="outline-dark">ID: {props.objectID}</Button></Link>
          </Card.Body>     
        </Card> */}