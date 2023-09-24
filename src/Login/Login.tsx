import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import React from "react";
import { useState } from "react";
import { url } from "../specs/data";
import {login as log, wsChanger} from "../reduxFiles/configs"
import { useSelector, useDispatch } from 'react-redux';
import { authUrl } from "../specs/config";

async function logIn(event:any,setErr:(fn: (l:boolean)=>boolean| boolean)=>void,nav:any,disp:any,login:boolean){
    
    let emailId=document.querySelector(".email") as HTMLInputElement
    let password=document.querySelector(".pwd") as HTMLInputElement
    let data=JSON.stringify({emailId:emailId.value,password:password.value});
    //alert(data);
    let found=await fetch(url.logsign+"/login",{
     mode:"cors",
     method:"POST",
     body:data


    }).then(async (val)=>{

        let {found,jwt}=await val.json();
        //alert("found "+found)
        if(found){
            localStorage.setItem("login","true");
            localStorage.setItem("username",emailId.value);
            localStorage.setItem("jwt",jwt)


            
            nav("/play")
        }
        
        setErr(found)
return found;


    })
    let ws:any=null;

    if(found){
        //alert("creating new socket in login");
        ws=new WebSocket(authUrl);
        ws.onopen=()=>{
           // console.log({"action":"auth","jwt":localStorage.getItem("jwt")});
           ws.send(JSON.stringify({"action":"auth","jwt":localStorage.getItem("jwt")}))
           }
           ws.onmessage=((val:any)=>{
             //  console.log("ONMESSAGE ",val)
               let data=JSON.parse(val.data)
               if(!data.authorised)
               setErr((val)=>false);
               

           })
           
    }
    //console.log(" updating the state ",{login:found,uname:found===true?emailId.value:"",ws:JSON.stringify(ws)},"ws ",String(ws))
    disp(log({login:found,uname:found===true?emailId.value:""}))
    disp(wsChanger({ws:ws}));
}


export function LogIn(){

    let [err,setErr]=useState(true)
    let login=useSelector((state:any)=>{return state.loginRed.login})
    let ws=useSelector((state:any)=>{return state.loginRed.ws})
    let disp=useDispatch();

    let nav=useNavigate();
    return <>

    <div className="loginContainer">

     <div className="chessLabel">
        <a >chess.com</a>
     </div>


     <div className="loginBox">
        <div className="Error" style={{display:!err?"block":"none"}}>
            <p>Incorrect username or password! Try again or create new account</p>
        </div>
        <div className="userDetails">
            <UserDetails />
            <div className="options">
                <div><input type="checkbox" id="remember"></input><label htmlFor="remember"> Remember me</label></div>
                <a>Forgot Password?</a>
            </div>
            <button className="loginButton"  onClick={(event:any)=>{logIn(event,setErr,nav,disp,login)}}>Log In </button>
        </div>

        <div className="or">
            <span></span>
            <h4>OR</h4>
            <span></span>
        </div>

        <div className="oAuth modOAuth">
            <Link to="/google"><span className="google"></span><span >Continue with Google</span></Link>
            <Link to="/apple"><span className="apple"></span><span >Continue with apple</span></Link>
            <Link to="/facebook"><span className="facebook"></span><span >Continue with facebook</span></Link>
        </div>




     </div>



    </div>
    
    
    </>
}

function UserDetails(){
    
    const [lock,setLock]=useState(true);
    return <>
    <div className="signinDets" >
    <div style={{position:"relative"}}><input type="email" className="uname email mod"  placeholder="Email" />
<span className="mailIcon" ></span>
</div>
    <div style={{position:"relative"}}>
    <input type={lock===true?"password":"text"} className="pwd mod" placeholder="Password"/>
<span className="lockIcon"></span>
<span className={lock===true?"visibilityIcon":"visibilityOpenIcon"} onClick={()=>setLock((lock)=>!lock)}></span>
</div>
</div>
</>
}
