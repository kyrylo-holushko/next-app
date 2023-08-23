import { useEffect, useState } from "react"
import { getBags } from "../lib/ajax/bag"
import { Row } from "react-bootstrap";
import { Button } from "bootstrap";
import BagCard from "../components/bag/BagCard";
import BagEdit from "../components/bag/BagEdit";
import BagDelete from "../components/bag/BagDelete";
import BagCreate from "../components/bag/BagCreate";

export default function Bags(){

    //let bagData;

    const [bagData, setBagData]= useState(false);
    const [errMsg, setErrMsg] = useState(false);
    const [showBagCreate, setShowBagCreate] = useState(false);
    const [showBagEdit, setShowBagEdit] = useState(false);
    const [showBagDelete, setShowBagDelete] = useState(false);
    const [bagId, setBagId] = useState(false);
    const [writeReq, setWriteReq] = useState(false);

    const handleShowBagCreate = () => setShowBagCreate(true);
    const handleShowBagEdit = () => setShowBagEdit(true);
    const handleShowBagDelete = () => setShowBagDelete(true);

    useEffect(()=>{
        getBags().then(bags=>{
            setBagData(bags);
            //bagData = bags;
        }).catch(e=>{setErrMsg(e.message)});
    },[]);

    return (
        <>
            <Row className="gy-4" sm={1} md={2} lg={3}>
                {bagData && bagData.map((bag, i)=>{
                    return (<>
                    <Col key={`${i}`}>
                        <BagCard 
                            bag={bag} 
                            setShowBagEdit={setShowBagEdit} 
                            setShowBagDelete={setShowBagDelete}
                            setBag={setBagId}
                        />
                    </Col>
                    </>)
                })}
                <Button size="lg" onClick={handleShowBagCreate}>Create Bag +</Button>
                {errMsg && <h4>{errMsg}</h4>}
            </Row>
            <BagCreate show={showBagCreate} setShow={setShowBagCreate} setWrite={setWriteReq}></BagCreate>
            <BagEdit show={showBagEdit} setShow={setShowBagEdit} bid={bagId} setWrite={setWriteReq}></BagEdit>
            <BagDelete show={showBagDelete} setShow={setShowBagDelete} bid={bagId} setWrite={setWriteReq}></BagDelete>       
        </>
    )
}

{/* 







<BagCreate show={showBagCreate} setShow={setShowBagCreate} setWrite={setWriteReq}></BagCreate>
            <BagEdit show={showBagEdit} setShow={setShowBagEdit} bid={bagId} setWrite={setWriteReq}></BagEdit>
            <BagDelete show={showBagDelete} setShow={setShowBagDelete} bid={bagId} setWrite={setWriteReq}></BagDelete> */}