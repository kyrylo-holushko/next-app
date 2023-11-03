import { BagContext } from "./_app";
import { useContext, useEffect, useState } from "react";
import { getItems } from "../lib/ajax/item";
import { Container, Button, Table, Row, Col, Pagination, Form } from "react-bootstrap";
import ItemRow from "@/components/item/ItemRow";
import ItemCreate from "@/components/item/itemCreate";
import ItemEdit from "@/components/item/itemEdit";
import ItemDelete from "@/components/item/itemDelete";
import ItemMove from "@/components/item/itemMove";
import ItemMoveAll from "@/components/item/itemMoveAll";

export default function Items(){

    const { bag } = useContext(BagContext);
    const [itemData, setItemData] = useState(false); //page data
    const [errMsg, setErrMsg] = useState(false);
    const [writeReq, setWriteReq] = useState(false);
    const [itemSelected, setItemSelected] = useState(false);
    const [showItemCreate, setShowItemCreate] = useState(false);
    const [showItemEdit, setShowItemEdit] = useState(false);
    const [showItemDelete, setShowItemDelete] = useState(false);
    const [showItemMove, setShowItemMove] = useState(false);
    const [showItemMoveAll, setShowItemMoveAll] = useState(false);

    const [page, setPage] = useState(1); //page number
    const [perPage, setPerPage] = useState(3); //items per page
    const [nextItemsCount, setNextItemsCount] = useState(); //count the number of next items on next page

    const [order, setOrder] = useState({column: null, order: null});

    const [searchString, setSearchString] = useState('');                    //if search false, means no search query
    const [filterPriority, setFilterPriority] = useState(0);    //if filters by specific priority number
    const [showFilter, setShowFilter] = useState(false);
    const [searchGo, setSearchGo] = useState(false);
    const [searchClear, setSearchClear] = useState(false);
    const [lastRow, setLastRow] = useState(false);
    const [itemDel, setItemDel] = useState(false);

    useEffect(()=>{
        if(lastRow && page>1 && itemDel){       
            setPage(page-1);
            setLastRow(false);
        }
        if(!(lastRow && itemDel)){
        getItems(bag.bid, page, perPage, searchString, filterPriority, order).then(items=>{
            const itemsA = items.slice(0,perPage);
            const itemsB = items.slice(perPage, perPage*2);
            console.log("Items A", itemsA);
            setItemData(itemsA);
            if(items.length===1){
                setLastRow(true);
            } else {
                setLastRow(false);
            }
            setNextItemsCount(itemsB.length);
            setSearchGo(false);
            setSearchClear(false);
            if(itemDel){setItemDel(false)}
            setErrMsg(false);
        }).catch(e=>{setItemData(false);setErrMsg(e.message)});}           
        setWriteReq(false);
    },[writeReq, page, perPage, order, filterPriority, searchGo, searchClear]);

    useEffect(()=>{
        setPage(1);
    },[perPage]);

    const handleShowItemCreate = () => setShowItemCreate(true);
    const handleShowItemMoveAll = () => setShowItemMoveAll(true);

    function previousPage() {
        if(page>1){
            setPage(page-1);
        }
    }
    
    function nextPage() {
        if(nextItemsCount>0){
            setPage(page+1);
        }
    }

    function orderColumn(column){
        console.log("Current Order Direction", order.order);
        switch(order.order){
            case null:
                setOrder({column: column, order: "ASC"});
                break;
            case "ASC":
                setOrder({column: column, order: "DESC"});
                break;
            case "DESC":
                setOrder({column: column, order: null});
                break;
        }
    }

    return (
        <>
            <Container className="px-5">
                <Row sm md lg className="my-auto">
                    <Col sm="auto" className="pt-4"> 
                        <h2 className="d-inline">{bag.bname?.toUpperCase()}</h2>
                    </Col>
                    
                    <Col sm="auto" md lg className="pt-4">
                        <div className="float-end">
                            {!errMsg && <Button className="border-2" variant="outline-secondary" onClick={handleShowItemMoveAll} size="lg">Move All</Button>}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button className="border-2" variant="outline-secondary" onClick={handleShowItemCreate} size="lg">Add Item +</Button>
                        </div>
                    </Col>
                </Row>
                <Form className="d-inline-block ps-5">
                    <Form.Group as={Row}>
                        <Col sm="auto" className="pt-3">
                            <Form.Label column sm="auto">Results per page:</Form.Label>
                        </Col>
                        <Col sm="auto" className="pt-3">
                            <Form.Control
                                size="sm"
                                as="select"
                                value={perPage}
                                onChange={e=>{
                                    setPerPage(e.target.value);
                                }}
                                defaultValue={perPage}
                                className="form-select"
                                
                            >
                                <option value="3">3</option>
                                <option value="5">5</option>
                            </Form.Control>
                        </Col>
                        <Col sm className="pt-3">
                        <Form.Control 
                            type="search"
                            onChange={e=>{
                                setSearchString(e.target.value);
                                if(!e.target.value)
                                    setSearchClear(true);
                            }}
                            className="d-inline-block"
                        />
                        </Col>
                        <Col sm="auto" className="pt-3">
                        <Button className="d-inline-block" 
                            variant="primary" 
                            type="button" 
                            onClick={e=>{setSearchGo(true)}}
                        >Search</Button>
                        </Col>
                        <Col sm className="pt-3">
                            <Form.Check
                                type="checkbox"
                                label="Priority Filter"
                                defaultChecked={false}
                                onClick={(e) => {
                                    if(e.target.checked){
                                        setFilterPriority(1);
                                        setShowFilter(true);
                                    } else {
                                        setFilterPriority(0);
                                        setShowFilter(false);
                                    }
                                }}
                                className="d-inline-block"
                            /> 
                        </Col>
                        <Col sm="auto" className="pt-3">                                                                
                            {showFilter && <Form.Control 
                                type="number" 
                                min="1"
                                max="10"                                                             
                                onChange={e=>{
                                    setFilterPriority(e.target.value);
                                }}
                                value={filterPriority}
                                defaultValue={filterPriority}
                                className="d-inline-block"                                                                                   
                            />}
                        </Col> 
                    </Form.Group>
                </Form>
                {errMsg && <h4 className="pt-4">{errMsg}</h4>}
                {itemData && <Row className="pt-4"> 
                <Table className="tablefixed" striped bordered hover>
                    <thead>
                    <tr>
                        <th onClick={e=>{orderColumn("iname")}}>Name</th>
                        <th onClick={e=>{orderColumn("idesc")}}>Description</th>
                        <th onClick={e=>{orderColumn("priority")}}>Priority</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {itemData.map((item, i) => (
                            <ItemRow key={i}
                            item={item} 
                            setItemSelected={setItemSelected} 
                            setShowItemEdit={setShowItemEdit} 
                            setShowItemDelete={setShowItemDelete} 
                            setShowItemMove={setShowItemMove}
                            />  
                        ))}
                    </tbody>
                </Table>
                <Pagination>
                    <Pagination.Prev onClick={previousPage} disabled={!(page>1)}/>
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next onClick={nextPage} disabled={!(nextItemsCount>0)}/>
                </Pagination>
                </Row>
            }
            </Container>
            <ItemCreate show={showItemCreate} setShow={setShowItemCreate} setWrite={setWriteReq} bid={bag.bid}/>
            <ItemEdit show={showItemEdit} setShow={setShowItemEdit} setWrite={setWriteReq} item={itemSelected}/>
            <ItemDelete show={showItemDelete} setShow={setShowItemDelete} setWrite={setWriteReq} iid={itemSelected.iid} setDelete={setItemDel}/>
            <ItemMove show={showItemMove} setShow={setShowItemMove} setWrite={setWriteReq} iid={itemSelected.iid} bid={bag.bid} setPage={setPage}/>
            <ItemMoveAll show={showItemMoveAll} setShow={setShowItemMoveAll} setWrite={setWriteReq} obid={bag.bid} bid={bag.bid} setPage={setPage}/>
        </>
    )
}