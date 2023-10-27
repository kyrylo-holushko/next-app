import { Modal, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
//import { detectMimeType } from 'type-files';
//import {fileTypeFromBuffer} from 'file-type';

export default function ItemDetails(props) {

    //const { iname, image, idesc, priority } = props.item;
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

    /* async function imgSource(image) {
        //const mimeType = await fileTypeFromBuffer(props.item.image).mime;
        //const imageBase64 = Buffer.from(props.item.image).toString('base64');
        return `data:image/jpeg;base64,${imageBase64}`
    } */

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