import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import React from "react";
import { useState } from "react";
import { url } from "../specs/data";

function logIn(event:any,setErr:(fn: (l:boolean)=>boolean| boolean)=>void,nav:any){
    
    let emailId=document.querySelector(".email") as HTMLInputElement
    let password=document.querySelector(".pwd") as HTMLInputElement
    let data=JSON.stringify({emailId:emailId.value,password:password.value});
    alert(data);
    fetch(url.logsign+"/login",{
     mode:"cors",
     method:"POST",
     body:data


    }).then(async (val)=>{

        let {found}=await val.json();
        alert("found "+found)
        if(found)nav("/")
        setErr(found)




    })
}


export function LogIn(){

    let [err,setErr]=useState(true)
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
            <button className="loginButton"  onClick={(event:any)=>{logIn(event,setErr,nav)}}>Log In </button>
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
