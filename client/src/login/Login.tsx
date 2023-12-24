import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import React, { useEffect } from "react";
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


            
            nav("/play",{replace:true})
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
    console.log(" updating the state ",{login:found,uname:found===true?emailId.value:"",ws:JSON.stringify(ws)},"ws ",String(ws))
    disp(log({login:found,uname:found===true?emailId.value:""}))
    disp(wsChanger({ws:ws}));
}


export function LogIn(){

    let [err,setErr]=useState(true)
    let login=useSelector((state:any)=>{return state.loginRed.login})
    let ws=useSelector((state:any)=>{return state.loginRed.ws})
    let disp=useDispatch();
    let global:any=window;
    let nav=useNavigate();
    function response(data:{[idx:string]:any}){
        alert();
        let url = "http://localhost:3000/token/login"
        let cred = data;
        type optionSpec = RequestInit;
        let options: optionSpec = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify((cred as BodyInit)),
        }
        console.log(" cred is ", cred, " body.cred ", options.body);
        fetch(url, options).then(async (succ) => {
            let resp = await succ.json();
            console.log("res ", resp)
            if (2 != succ.status / 100) {
                alert(" Error while signing in using google !");
            }
            else {
                localStorage.setItem("jwt", resp.jwt);
                localStorage.setItem("username", resp.username);
                disp(log({login:true}))
                nav(resp.url,{replace:true});
            }
        }).catch((err) => {
            console.log(" error ", err);
        });
    
            
    
    }
    useEffect(() => {
        global.google.accounts.id.initialize({
            client_id: "409051565209-nd3hjg4eqsq0hljd8ko9a7tiv0f7orkm.apps.googleusercontent.com",
            callback: response,
        })
        console.log(" inside global ", global.google.id)
        global.google.accounts.id.renderButton(document.querySelector("#googlebtnlogin"), { type: "Standard",context:"signin", size: "large", theme: "outline", width: "310", logo_alignment: "left"});
    }, [])
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
            {/* <Link to="/google" className="googleLink"><span className="google"></span><span >Continue with Google</span></Link>
             */}
             <div id="googlebtnlogin"></div>
            <Link to="/apple"  className="appleLink"><span className="apple"></span><span aria-disabled >Continue with apple</span></Link>
            <Link to="/facebook" aria-disabled className="fbLink"><span className="facebook"></span><span  aria-disabled>Continue with facebook</span></Link>
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
