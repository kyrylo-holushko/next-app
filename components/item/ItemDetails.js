import { Modal, Card } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function ItemDetails(props) {

    const setShow = props.setShow;
    
    const handleClose = () => {
        setSrc(null);
        setShow(false);
    }

    const [src, setSrc] = useState(null);

    useEffect(()=>{
        console.log("MIMETYPE", props.item?.mimetype);
        console.log("BASE64 IMAGE", props.item?.image);
        if(props.item.image!==null){
            setSrc(`data:${props.item.mimetype};base64,${props.item.image}`);
        }
    },[props.show]);

    return (
        <>
            <Modal show={props.show} onHide={handleClose} centered>
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title>{props.item?.iname}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card className="bg-light">
                        {props.item.image && <Card.Img variant="top" src={src} width={100}/>}
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