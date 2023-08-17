import { Container } from "react-bootstrap";
import Navigation from "./Navigation";

export default function Layout(props) {
    return (
        <>
            <Navigation/>
            {props.children}      
        </>
    )
}