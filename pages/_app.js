import Layout from '../components/Layout'
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, createContext } from "react";
import { Container } from 'react-bootstrap';
import RouteGuard from '../components/RouteGuard';
import { removeToken } from '../lib/authenticate';

export const BagContext = createContext();

export default function App({ Component, pageProps }) {

    const [bag, setBag] = useState(false);

    useEffect(()=>{
        import("bootstrap/dist/js/bootstrap");
        window.onbeforeunload = function(e){removeToken()};
    },[])
  
    return (<>
        <RouteGuard>
            <Layout>
                <Container>
                    <BagContext.Provider value={{bag, setBag}}>
                        <Component {...pageProps} />
                    </BagContext.Provider>
                </Container>
            </Layout>
        </RouteGuard>
    </>)
}
