import { getToken } from '../authenticate';

export async function moveItem(bid, iid) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_API_URL}/move/item/${iid}`,{
        method: "PUT",
        body: JSON.stringify({ nbid: bid }),
        headers: {
            "authorization": `JWT ${getToken()}`,
            "content-type": "application/json"
        }
    });

    const data = await res.json();

    if(res.status === 200){
        return data;
    } else {
        throw new Error(data.message);
    } 
    
};

export async function moveAllItems(obid, nbid) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_API_URL}/move/items`,{
        method: "PUT",
        body: JSON.stringify({ obid: obid, nbid: nbid }),
        headers: {
            "authorization": `JWT ${getToken()}`,
            "content-type": "application/json"
        }
    });

    const data = await res.json();

    if(res.status === 200){
        return data;
    } else {
        throw new Error(data.message);
    }

};



