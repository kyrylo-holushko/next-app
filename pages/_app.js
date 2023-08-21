import Layout from '../components/Layout'
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import { Container } from 'react-bootstrap';
import RouteGuard from '../components/RouteGuard';

export default function App({ Component, pageProps }) {
    useEffect(()=>{
      import("bootstrap/dist/js/bootstrap");
    },[])
  
    return (<>
        <RouteGuard>
            <Layout>
                <div className="bg-light">
                    <Container>
                        <Component {...pageProps} />
                    </Container>
                </div>
            </Layout>
        </RouteGuard>
    </>)
}
