import { BagContext } from "./_app";
import { useContext, useEffect, useState } from "react";
import { getItems } from "../lib/ajax/item";
import { Container, Button, Table, Row, Col, Pagination, Form } from "react-bootstrap";
import ItemRow from "../components/item/ItemRow";
import ItemCreate from "../components/item/ItemCreate";
import ItemEdit from "../components/item/ItemEdit";
import ItemDelete from "../components/item/ItemDelete";
import ItemMove from "../components/item/ItemMove";
import ItemMoveAll from "../components/item/ItemMoveAll";

export default function Items(){

    const { bag } = useContext(BagContext);
    const bagId = bag.bid;
    const bagName = bag.bname;
    const [itemData, setItemData] = useState(false); //page data
    const [errMsg, setErrMsg] = useState(false);
    const [writeReq, setWriteReq] = useState(false);
    const [itemId, setItemId] = useState(false);
    const [showItemCreate, setShowItemCreate] = useState(false);
    const [showItemEdit, setShowItemEdit] = useState(false);
    const [showItemDelete, setShowItemDelete] = useState(false);
    const [showItemMove, setShowItemMove] = useState(false);
    const [showItemMoveAll, setShowItemMoveAll] = useState(false);

    const [page, setPage] = useState(1); //page number
    const [perPage, setPerPage] = useState(3); //items per page
    const [nextItemsCount, setNextItemsCount] = useState(); //count the number of next items on next page

    const [order, setOrder] = useState({column: null, order: null}); //true Ascending order, false Descending order

    const [search, setSearch] = useState('');                    //if search false, means no search query
    const [filterPriority, setFilterPriority] = useState(0);    //if filters by specific priority number

    useEffect(()=>{
        getItems(bagId, page, perPage, search, filterPriority).then(items=>{
            setItemData(orderItems(items.slice(0,perPage),order)); //ordered on every data pull/page change
            setNextItemsCount(items.slice(perPage, perPage*2).length);
            setErrMsg(false);
        }).catch(e=>{setItemData(false);setErrMsg(e.message)});           
        setWriteReq(false);
    },[writeReq, page, perPage, order]);

    function orderItems(items, order){
        if(order.order === true) { //ASCENDING
            switch(order.column){
                case "name":
                    items.sort((a, b) => {
                        const nameA = a.iname.toUpperCase();
                        const nameB = b.iname.toUpperCase();
                        if (nameA < nameB) return -1;
                        if (nameA > nameB) return 1;
                        return 0;
                    });
                    break;
                case "description":
                    items.sort((a, b) => {
                        const nameA = a.idesc.toUpperCase();
                        const nameB = b.idesc.toUpperCase();
                        if (nameA < nameB) return -1;
                        if (nameA > nameB) return 1;
                        return 0;
                    });
                    break;
                case "priority":
                    items.sort((a, b) => a.priority - b.priority);
                    break;
            }
        }
        if(order.order === false) { //DESCENDING
            switch(order.column){
                case "name":
                    items.sort((a, b) => {
                        const nameA = a.iname.toUpperCase();
                        const nameB = b.iname.toUpperCase();
                        if (nameA > nameB) return -1;
                        if (nameA < nameB) return 1;
                        return 0;
                    });
                    break;
                case "description":
                    items.sort((a, b) => {
                        const nameA = a.idesc.toUpperCase();
                        const nameB = b.idesc.toUpperCase();
                        if (nameA > nameB) return -1;
                        if (nameA < nameB) return 1;
                        return 0;
                    });
                    break;
                case "priority":
                    items.sort((a, b) => b.priority - a.priority);
                    break;
            }
        }
        return items;
    };

    const handleShowItemCreate = () => setShowItemCreate(true);
    const handleShowItemMoveAll = () => setShowItemMoveAll(true);

    function previousPage() {
        if(page>1){
          setPage(page-1);
        }
    }
    
    function nextPage() {
        if(nextItemsCount>0) {
          setPage(page+1);
        }
    }

    function orderColumn(column){
        console.log("Current Order DIrection", order.order);
        switch(order.order){
            case null:
                setOrder({column: column, order: true});
                break;
            case true:
                setOrder({column: column, order: false});
                break;
            case false:
                setOrder({column: column, order: null});
                break;
        }
    }

    return (
        <>
            <Container className="px-5">
                <Row>
                    <Col sm md lg className="my-auto pt-4">
                        <h2 className="d-inline">{bagName?.toUpperCase()}</h2>
                        <Form className="d-inline-block ps-5">
                            <Form.Group as={Row}>
                                <Form.Label column sm="auto">Results per page:</Form.Label>
                                <Col>
                                <Form.Control
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
                                <Form.Control 
                                    as="search"
                                    value={search}
                                    onChange={e=>{
                                        setSearch(e.target.value);
                                    }}
                                    defaultValue={search}
                                    size="sm"
                                />
                                <Button variant="primary" type="button" size="sm">Search</Button>
                                <Form.Label>Priority Filter</Form.Label>                                                                                    
                                <Form.Control 
                                    type="number" 
                                    min="1"
                                    max="10"                                                             
                                    onChange={e=>{
                                        setFilterPriority(e.target.value);
                                    }}
                                    value={filterPriority!==0 ? filterPriority : 'None'}
                                    defaultValue={'None'}                                                     
                                /> 
                                <Form.Text className="error">
                                    {/*dirty.priority && errors.priority.notNumericAndWhole && "Must be a round number"*/}
                                    {/*dirty.priority && errors.priority.minMax && "Priority is from 1 to 10"*/}
                                </Form.Text>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col md lg className="pt-4">
                        <div className="float-end">
                            {!errMsg && <Button className="border-2" variant="outline-secondary" onClick={handleShowItemMoveAll} size="lg">Move All</Button>}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button className="border-2" variant="outline-secondary" onClick={handleShowItemCreate} size="lg">Add Item +</Button>
                        </div>
                    </Col>
                </Row>
                {errMsg && <h4 className="pt-4">{errMsg}</h4>}
                {itemData && <Row className="pt-4"> 
                <Table className="tablefixed" striped bordered hover>
                    <thead>
                    <tr>
                        <th onClick={e=>{orderColumn("name")}}>Name</th>
                        <th onClick={e=>{orderColumn("description")}}>Description</th>
                        <th onClick={e=>{orderColumn("priority")}}>Priority</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {itemData.map((item, i) => (
                            <ItemRow key={i}
                            item={item} 
                            setItemId={setItemId} 
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
            <ItemCreate show={showItemCreate} setShow={setShowItemCreate} setWrite={setWriteReq} bid={bagId}/>
            <ItemEdit show={showItemEdit} setShow={setShowItemEdit} setWrite={setWriteReq} iid={itemId}/>
            <ItemDelete show={showItemDelete} setShow={setShowItemDelete} setWrite={setWriteReq} iid={itemId}/>
            <ItemMove show={showItemMove} setShow={setShowItemMove} setWrite={setWriteReq} iid={itemId}/>
            <ItemMoveAll show={showItemMoveAll} setShow={setShowItemMoveAll} setWrite={setWriteReq} obid={bagId}/>
        </>
    )
}