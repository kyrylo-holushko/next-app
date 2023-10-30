import { getToken } from '../authenticate';

export async function getItems(bid, page, perPage, search, filterPriority, order) {

    let fetchStr = `${process.env.NEXT_PUBLIC_LOCALHOST_API_URL}/items?bag=${bid}&page=${page}&perPage=${perPage}&column=${order.column}&order=${order.order}`;
    if(search) 
        fetchStr = fetchStr.concat('',`&search=${search}`);
    if(filterPriority) 
        fetchStr = fetchStr.concat('',`&filterPriority=${filterPriority}`);

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
    let formData = new FormData();
    Object.keys(form).forEach(key => {
        console.log(key, form[key]);
        formData.append(key, form[key]);
    });
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_API_URL}/items`,{
        method: "POST",
        body: formData,
        headers: {
            "authorization": `JWT ${getToken()}`
        }
    });

    const data = await res.json();

    if(res.status === 201){
        return data;
    } else {
        throw new Error(data.message);
    } 

};

export async function editItem(form, iid) {
    let formData = new FormData();
    Object.keys(form).forEach(key => {
        console.log(key, form[key]);
        formData.append(key, form[key]);
    });
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_API_URL}/items/${iid}`,{
        method: "PUT",
        body: formData,
        headers: {
            "authorization": `JWT ${getToken()}`
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