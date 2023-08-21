export async function registerUser(form) {

    const res = await fetch(`${process.env.LOCALHOST_API_URL}/user/signup`, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
            "content-type": "application/json"
        }
    });
  
    const data = await res.json();
  
    if(res.status === 201){
        return data;
    }else{
        throw new Error(data.message);
    } 

}