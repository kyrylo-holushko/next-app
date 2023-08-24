import { useEffect, useState, useContext } from "react"
import { getBags } from "../lib/ajax/bag"
import { Row, Col, Button, Container } from "react-bootstrap";
import BagCard from "../components/bag/BagCard";
import BagEdit from "../components/bag/BagEdit";
import BagDelete from "../components/bag/BagDelete";
import BagCreate from "../components/bag/BagCreate";
import { BagContext } from "./_app";

export default function Bags(){

    const [bagData, setBagData]= useState(false);
    const [errMsg, setErrMsg] = useState(false);
    const [showBagCreate, setShowBagCreate] = useState(false);
    const [showBagEdit, setShowBagEdit] = useState(false);
    const [showBagDelete, setShowBagDelete] = useState(false);
    const [writeReq, setWriteReq] = useState(false);
    const { bag, setBag } = useContext(BagContext);

    const handleShowBagCreate = () => setShowBagCreate(true);
    const handleShowBagEdit = () => setShowBagEdit(true);
    const handleShowBagDelete = () => setShowBagDelete(true);

    useEffect(()=>{
        getBags().then(bags=>{
            setBagData(bags);
            setErrMsg(false);
        }).catch(e=>{setBagData(false);setErrMsg(e.message)});           
        setWriteReq(false);
    },[writeReq]);

    return (
        <>
            <Container className="p-5">
                <Row className="gy-5" sm={1} md={2} lg={3}>
                    {bagData && bagData.map((bag, i)=>{
                        return (<>
                        <Col key={`${i}`} className="text-center">
                            <BagCard 
                                bag={bag} 
                                setShowBagEdit={setShowBagEdit} 
                                setShowBagDelete={setShowBagDelete}
                                setBag={setBag}
                            />
                        </Col>
                        </>)
                    })}
                    <Col className="text-center">
                        {errMsg && <h4 className="p-5">{errMsg}</h4>}
                        <Button variant="outline-secondary" size="lg" onClick={handleShowBagCreate} className="p-5 border-3">Create Bag <h2>+</h2></Button>
                    </Col>
                </Row>
            </Container>
            <BagCreate show={showBagCreate} setShow={setShowBagCreate} setWrite={setWriteReq}/>
            <BagEdit show={showBagEdit} setShow={setShowBagEdit} bag={bag} setWrite={setWriteReq}/>
            <BagDelete show={showBagDelete} setShow={setShowBagDelete} bag={bag} setWrite={setWriteReq}/>       
        </>
    )
}

{/* 







<BagCreate show={showBagCreate} setShow={setShowBagCreate} setWrite={setWriteReq}></BagCreate>
            <BagEdit show={showBagEdit} setShow={setShowBagEdit} bid={bagId} setWrite={setWriteReq}></BagEdit>
            <BagDelete show={showBagDelete} setShow={setShowBagDelete} bid={bagId} setWrite={setWriteReq}></BagDelete> */}