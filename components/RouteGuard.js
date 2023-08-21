import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../lib/authenticate';
import { createContext } from 'react';

export const UserContext = createContext();
export const SetUserContext = createContext();

const PUBLIC_PATHS = ['/', '/_error'];

export default function RouteGuard(props) {

    const router = useRouter();

    const [user, setUser] = useState({});
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
    //if(isAuthenticated()) updateAtoms(); //pulling upon authetication
        authCheck(router.pathname);
        router.events.on('routeChangeComplete', authCheck)

        return () => {
            router.events.off('routeChangeComplete', authCheck);
        }
    }, []);

    function authCheck(url) {
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            setAuthorized(false);
            router.push("/");
        } else {
        setAuthorized(true);
        }
    }

    return (
        <>
            <SetUserContext.Provider value={setUser}>
                <UserContext.Provider value={user}>
                    {authorized && props.children}
                </UserContext.Provider>
            </SetUserContext.Provider>
        </>
    )
}