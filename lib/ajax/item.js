import { getToken } from '../authenticate';

export async function getItems(bid) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_API_URL}/items?bag=${bid}`, {
        method: "GET",
        headers: {
            "authorization": `JWT ${getToken()}`,
            "content-type": "application/json"
        }
    });
  
    const data = await res.json();
  
    if(res.status === 200){
        if(data==null)
            return false;
        else
            return data.data;
    } else {
        throw new Error(data.message);
    } 

};


export async function createItem(form) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_API_URL}/items`,{
        method: "POST",
        body: JSON.stringify(form),
        headers: {
            "authorization": `JWT ${getToken()}`,
            "content-type": "application/json"
        }
    });

    const data = await res.json();

    if(res.status === 201){
        return data;
    } else {
        throw new Error(data.message);
    } 

};

