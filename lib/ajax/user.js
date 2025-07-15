import { setToken, getToken, removeToken } from "../authenticate";

export async function registerUser(form) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
            "content-type": "application/json"
        }
    });
  
    const data = await res.json();
    console.log("Returned data from API after sign-up: ", data);	
    if(res.status === 201){
        return data;
    } else {
        throw new Error(data.message);
    } 

}

export async function authenticateUser(form) { 

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
      	method: "POST",
      	body: JSON.stringify(form),
      	headers: {
        "content-type": "application/json"
      	}
    });
    
    const data = await res.json();

    if(res.status === 200){
      	setToken(data.token);
      	return true;
    } else {
      	throw new Error(data.message);
    } 

}

export async function updateUser(form) {

  	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/update`, {
    	method: "PUT",
    	body: JSON.stringify(form),
    	headers: {
			"authorization": `JWT ${getToken()}`,
			"content-type": "application/json"
    	}
  	});
  
  	const data = await res.json();

  	if(res.status === 200){
		removeToken();
    	setToken(data.token);
    	return true;
  	} else {
    	throw new Error(data.message);
  	}

}

export async function deleteUser() {

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/delete`, {
	  	method: "DELETE",
	  	headers: {
		  "authorization": `JWT ${getToken()}`,
		  "content-type": "application/json"
	  	}
	});

	const data = await res.json();

	if(res.status === 200){
  		return true;
	} else {
	  	throw new Error(data.message);
	}

}

export async function generateResetLink(email) {

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/password/link`, {
    	method: "POST",
    	body: JSON.stringify({ email }),
    	headers: {
			"content-type": "application/json"
    	}
  	});
  
  	const data = await res.json();

  	if(res.status === 200){
    	return data.message;
  	} else {
    	throw new Error(data.message);
  	}

}

export async function resetPassword(form, token) {
	
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/password/new`, {
    	method: "PUT",
    	body: JSON.stringify(form),
    	headers: {
			"authorization": `JWT ${token}`,
			"content-type": "application/json"
    	}
  	});
  
  	const data = await res.json();

  	if(res.status === 200){
    	return true;
  	} else {
    	throw new Error(data.message);
  	}

}
