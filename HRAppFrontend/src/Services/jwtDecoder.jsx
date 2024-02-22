import { jwtDecode } from "jwt-decode";

export const decode = ()=>{
    const getToken = localStorage.getItem("jwt")
    if(getToken){
        const token = JSON.parse(getToken);
        const decoded = jwtDecode(token);
        return decoded;
    }
    return {};
} 