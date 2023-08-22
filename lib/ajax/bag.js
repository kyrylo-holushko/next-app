/* import useSWR from 'swr';
import { getToken } from '../authenticate';

export async function getBags() {

    const req = {
        method: "GET",
        headers: {
            "authorization": `JWT ${getToken()}`,
            "content-type": "application/json"
        }
    };
    const fetcher = async url => {
        const res = await fetch(url, req);
        if(res.status===200){
            return res.json();
        } else {
            throw new Error(res.message);
        }
    };
    const { data, error } = useSWR('getbags', fetcher);
    return data.data;

} */