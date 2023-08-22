import { useEffect, useState } from "react"
import { getBags } from "../lib/ajax/bag"
import { Row } from "react-bootstrap";
import BagCard from "../components/BagCard";
import { Button } from "bootstrap";

export default function Bags(){

    const[bags, setBags]= useState(false);
    const[errMsg, setErrMsg] = useState(false);

    useEffect(()=>{
        getBags().then(bags=>{
            setBags(bags);
        }).catch(e=>{setErrMsg(e.message)});
    },[]);

    return (
        <>
            <Row className="gy-4" sm={1} md={2} lg={3}>
                {bags && bags.map((bag, i)=>{
                    return (<>
                    <Col key={`${i}`}>
                        <BagCard bid={`${bag.bid}`}/>
                    </Col>
                    </>)
                })}
                <Button size="lg">Create Bag +</Button>
                {errMsg && <h4>{errMsg}</h4>}
            </Row>
        </>
    )
}