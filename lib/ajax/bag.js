import { getToken } from '../authenticate';

export async function getBags() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_API_URL}/bags`, {
        method: "GET",
        headers: {
            "authorization": `JWT ${getToken()}`,
            "content-type": "application/json"
        }
    });
  
    const data = await res.json();
  
    if(res.status === 200){
        if(data==null)
            return []
        else
            return data.data;
    } else {
        throw new Error(data.message);
    } 

};

export async function createBag(form) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_API_URL}/bags`,{
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

//app.put('/api/bags/:id'

export async function editBag(form, bid) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_API_URL}/bags/${bid}`,{
        method: "PUT",
        body: JSON.stringify(form),
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

export async function deleteBag(bid) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_API_URL}/bags/${bid}`,{
        method: "DELETE",
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