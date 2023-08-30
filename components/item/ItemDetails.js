import { Modal, Card } from "react-bootstrap";

export default function ItemDetails(props) {

    const { iname, idesc, priority } = props.item;
    const setShow = props.setShow;

    const handleClose = () => {
        setShow(false);
    }

    return (
        <>
            <Modal show={props.show} onHide={handleClose} centered>
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title>{props.item?.iname}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card className="bg-light">
                        <Card.Body>
                            {props.item?.idesc}
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer className="justify-content-start">
                    <h5 className="d-block">Priority: {props.item?.priority}</h5>
                </Modal.Footer>
            </Modal>
        </>
    )

};