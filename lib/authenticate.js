import jwt_decode from "jwt-decode";

export function setToken(token){
    sessionStorage.setItem('access_token', token);
}

export function getToken(){
    return sessionStorage.getItem('access_token');
}

export function readToken(){
    const token = getToken();
    return (token) ? jwt_decode(token) : null;
}

export function isAuthenticated(){
    const token = readToken();  
    return (token) ? true : false;
}

export function removeToken(){
    sessionStorage.removeItem('access_token');
}