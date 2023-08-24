import Navigation from "./Navigation";
import { useState, createContext } from "react";

export const NavContext = createContext();

export default function Layout(props) {

    const [navUpdate, setNavUpdate] = useState(false);

    return (
        <>
            <NavContext.Provider value={{navUpdate, setNavUpdate}}>
                <Navigation/>
                {props.children}
            </NavContext.Provider>
        </>
    )
}