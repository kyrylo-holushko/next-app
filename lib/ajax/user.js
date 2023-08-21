export async function registerUser(form) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_API_URL}/user/signup`, {
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

export async function authenticateUser(form) { 

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_API_URL}/user/login`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json"
      }
    });
    ///CHANGE ALL THIS
    const data = await res.json();
    if(res.status === 200){
      setToken(data.token);
      return true;
    }else{
      throw new Error(data.message);
    } 

}