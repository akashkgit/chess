import React from "react";
import {login as loglogin,wsChanger} from '../reduxFiles/configs'
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { authUrl, serverUrl } from "../specs/config";
export function ProtectedRoute({children}:any){

    let dispatcher=useDispatch();
    const nav=useNavigate();
     let loginState=useSelector((state:any)=> state.loginRed.login);
     let disp=useDispatch()
     alert(" protected route")
     
     
     console.log(" post nav");
     if(loginState !== true){

        if( "true" != localStorage.getItem("login") ){
            let jwt = localStorage.getItem("jwt");
            // alert(!jwt);
            if(!jwt){
            //---- redirect to login page 
            // alert("redirecting")
            console.log(" moving to login page ")
            // nav("/login") --- did not work
            // previously wrriten as avbove
            return <><Navigate to="/login"></Navigate></>
            }
            else{
                let valid=true;
                let options:RequestInit={
                    method:"POST",
                    mode:"cors",
                    headers:{
                            "Content-Type":"application/json",
                    },
                    body: JSON.stringify({credential:jwt})
                }
                //--- validate jwt fetching server token ur
                 fetch(serverUrl.concat("token/verification"),options).then(async (succ)=>{
                    let response=await succ.json()
                    console.log(response);
                    if(false === response.authorized){
                        console.log(" NOT ALLOWED NEED TO BE REDIRECTED");
                        nav("/login");
                    }
                    

                }).catch((err)=>console.log(err));
                //----- wrong method ----- 
                // if(!valid) 
                // nav("/login") --- did not work
            // previously wrriten as avbove
            
                if(!valid) return <><Navigate to="/login"></Navigate></> 
            }
        }
        else loglogin({login:true});
     }
        return <>{children}</>
    
}
