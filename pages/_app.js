import Layout from '../components/Layout'
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import { Container } from 'react-bootstrap';
import RouteGuard from '../components/RouteGuard';
import { getToken } from '../lib/authenticate';

export default function App({ Component, pageProps }) {
    useEffect(()=>{
      import("bootstrap/dist/js/bootstrap");
    },[])
  
    return (<>
        <RouteGuard>
            <Layout>
                <SWRConfig 
                    value={{fetcher: async url => {
                    const res = await fetch(url, {method: "GET",
                    headers: {
                        "authorization": `JWT ${getToken()}`,
                        "content-type": "application/json"
                    }});
                    if (!res.ok) {
                        const error = new Error('An error occurred while fetching the data.')
                        error.info = await res.json()
                        error.status = res.status
                        throw error
                    }
                    return res.json()
                    }
                    }}>
                    <Container>
                        <Component {...pageProps} />
                    </Container>
                </SWRConfig>
            </Layout>
        </RouteGuard>
    </>)
}
