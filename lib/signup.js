export async function registerUser(user, password, password2) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: "POST",
      body: JSON.stringify({ userName: user, password: password, password2: password2 }),
      headers: {
        "content-type": "application/json"
      }
    });
  
    const data = await res.json();
  
    if(res.status === 200){
      return true;
    }else{
      throw new Error(data.message);
    } 
  }