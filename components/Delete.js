import { Button, Modal } from "react-bootstrap";
//import { deleteItem } from "../../lib/ajax/item";
import { deleteUser } from "../lib/ajax/user";
import { useState, useContext } from "react";
import { readToken, removeToken } from "../lib/authenticate";
import { useRouter } from "next/router";
import { NavContext } from "./Layout";

export default function Delete(props){

    const setShow = props.setShow;
    const userId = readToken()?.uid;
    const router = useRouter();

    const { navUpdate, setNavUpdate } = useContext(NavContext);
    const [resMsg, setResMsg] = useState(false);

    const handleClose = () => {
        setShow(false);
        if(resMsg) setResMsg(false);
    }

    async function submitForm(e) {
        deleteUser(userId).then(()=>{
            handleClose();
            logout();
        }).catch(e=>{setResMsg(e.message)});  
    }

    function logout() {
        removeToken();
        setNavUpdate(true);
        router.push("/");
    };

    return (
        <Modal show={props.show} onHide={handleClose} size="sm" centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!resMsg ? <h5>Are you sure you want to delete this account?<br/><br/>
                <em className="error">This is a permanent deletion!</em>
                </h5> : resMsg}
            </Modal.Body>
            {!resMsg && <Modal.Footer>
            <Button variant="primary" type="button" onClick={submitForm}>
                Confirm
            </Button>
            </Modal.Footer>}
        </Modal>
    )
}