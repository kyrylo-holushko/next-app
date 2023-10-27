import Layout from '../components/Layout'
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, createContext } from "react";
import { Container } from 'react-bootstrap';
import RouteGuard from '../components/RouteGuard';

export const BagContext = createContext();

export default function App({ Component, pageProps }) {

    const [bag, setBag] = useState(false);

    useEffect(()=>{
        import("bootstrap/dist/js/bootstrap");
        const bid = localStorage.getItem('bagId') || null;
        const bname = localStorage.getItem('bagName') || null;
        setBag({ bid, bname });
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
