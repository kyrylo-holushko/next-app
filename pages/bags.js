import useSWR from 'swr';
import { useEffect, useState } from "react"
//const fetcher = (url) => fetch(url).then((res) => res.json()); 
//import { getBags } from "../lib/ajax/bag";
import { useSWRConfig } from 'swr'
 

  
 

export default function Bags(){
    //const { data, error } = useSWR('getbags', fetcher);
    const { fetcher } = useSWRConfig();
    const { data, errors } = useSWR(`${process.env.NEXT_PUBLIC_LOCALHOST_API_URL}/bags`, fetcher);

    return (
        <>
            <h1>All the user's bags</h1>
        </>
    )
}