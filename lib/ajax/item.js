import { getToken } from '../authenticate';

export async function getItems(bid, page, perPage, search, filterPriority, order) {

    let fetchStr = `${process.env.NEXT_PUBLIC_LOCALHOST_API_URL}/items?bag=${bid}&page=${page}&perPage=${perPage}`;
    if(search) 
        fetchStr = fetchStr.concat('',`&search=${search}`);
    if(filterPriority) 
        fetchStr = fetchStr.concat('',`&filterPriority=${filterPriority}`);
    if(order.order!==null)
        fetchStr = fetchStr.concat('', `&column=${order.column}&order=${order.order}`);

    const res = await fetch(fetchStr, {
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

//app.put('/api/items/:id

export async function editItem(form, iid) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_API_URL}/items/${iid}`,{
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

export async function deleteItem(iid) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_API_URL}/items/${iid}`,{
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