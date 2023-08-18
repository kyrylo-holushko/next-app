import Layout from '../components/Layout'
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import { Container } from 'react-bootstrap';

export default function App({ Component, pageProps }) {
    useEffect(()=>{
      import("bootstrap/dist/js/bootstrap");
    },[])
  
    return (<>
        <Layout>
            <div className="bg-light">
                <Container>
                    <Component {...pageProps} />
                </Container>
            </div>
        </Layout>
    </>)
}
