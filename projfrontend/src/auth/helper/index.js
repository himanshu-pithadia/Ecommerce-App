import { json } from "react-router-dom";
import { API } from "../../backend";
import { cartEmpty } from "../../core/helper/CartHelper";

export const signup = (user) => {

    return fetch(`${API}user/`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then((response) => {
        return response.json();
    })
    .catch(err=>console.log(err))
}

export const signin = (user) => {
    const formdata = new FormData();

    for(const name in user){
        formdata.append(name, user[name]);
    }

    return fetch(`${API}user/login/`,{
        method:"POST",
        body: formdata
    })
    .then((response)=>{
        return response.json();
    })
    .catch(err=>console.log(err))
}

export const authenticate = (data, next) => {

    if(typeof window !== undefined)
    {
        localStorage.setItem("jwt", json.stringify(data));
        next();
    }

};

export const isAuthenticatedUser = () => {

    if(typeof window === undefined){
        return false;
    }

    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }
    else{
        return false;
    }
}

export const signout = (next) => {

    const userId = isAuthenticatedUser() && isAuthenticatedUser().user.id;

    if(typeof window !== undefined){
        localStorage.removeItem("jwt");
        cartEmpty(()=>{});

        return fetch(`${API}user/logout/${userId}`, {
            method:"GET"
        })
        .then((response)=>{
            console.log("sign out success.");
            next();
        })
        .catch(err=>console.log(err));
    }

}