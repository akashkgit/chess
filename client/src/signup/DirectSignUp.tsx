import React, { MouseEventHandler, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import "./direct.css"

function visibilityToggler(event:any){

    let span=event.target as HTMLSpanElement;
    span.classList.add("visibilityOpenIcon");
    span.remove
}

export function DirectSignUp(props:{[idx:string]:any}){
    let {state,setState,setPrevState} =props;
    //console.log("ren defred")
    let [selected,setSelected]=useState("");
     let  [cont,setContinue]=useState(0);
     let submit=useRef(false);
     let nav=useNavigate();
     useEffect(()=>{
        setPrevState("startState");
    },[])
    
let level =[
    {
        "level":"new",
        "desc":" New to Chess",
        "stats":"Most Common"

    },
    {
        "level":"beginner",
        "desc":" Beginner",
        "stats":""
        
    },
    {
        "level":"intermediate",
        "desc":" Intermediate",
        "stats":""
    },
    {
        "level":"advanced",
        "desc":" Advanced",
        "stats":""
    }
]
let h1Data=cont?"Enter your email and a password":"what is your chess skill level?"
let h4Data=cont?"This allows you to log in on any device":"A starting point for match pairings"

return <>

<div className="directCont">

<div className="directRemComp" >
    <h1>{h1Data}</h1>
    <h4>{h4Data}</h4>
</div>
<div className="directRemComp2" >
{
(!cont && 
level.map((val:{[key:string]:string},id)=>{

return <>
 <div data-level={val.level} style={{border:selected===val.level?"2px solid #81b64c":""}} onClick={(old:any)=>setSelected(val.level)} className={`${val.level} boxed`}>
    <div className="innerBox">
        <span>{val.desc}</span>
        <span style={{display:selected===val.level?"block":"none"}} >{val.stats}</span>
    </div>
    {/* <img alt="error"></img> */}

 </div>
</>
}))



}





{/* <UserDetails cont={cont}/> */}





{//(event)=>continueFunc(event,cont,setContinue,submit,nav)
}
<button  onClick={()=>setState("emailPwdState")}>Continue</button>

</div>
</div>
</>    
}


export function UserDetails(props:any){
    let {cont,setState,setPrevState,state,emailId,setEmailId,pwd,setPwd}=props
    useEffect(()=>{
        setPrevState("directSignup");
    },[])
    const [lock,setLock]=useState(true);
    let continueFunc=(event:any,nav:any)=>{
    
 
       
        // let url="https://s38121vp76.execute-api.us-east-1.amazonaws.com/signup";
        let emailId=(document.querySelector(".email")as HTMLInputElement).value
        let pwd=(document.querySelector(".pwd") as HTMLInputElement).value
        // let data=JSON.stringify({emailId,password:pwd})
       
        // fetch(url,{
        //     method:"POST",
        //     mode:"cors",
        //     body:data
        // }).then((val)=>{
            
        setEmailId(emailId);
        setPwd(pwd);
        setState("userName");
        //}).catch((err)=>console.log("Error ",err));
    
}
    return <>
    
    <div className="directCont">

<div className="directRemComp" >
    <h1>Enter your email and a password</h1>
    <h4>This allows you to log in on any device</h4>
</div>
<div className="directRemComp2" >
    <div className="signinDets" >
    <div style={{position:"relative"}}><input type="email" className="uname email"  placeholder="Email" />
<span className="mailIcon" ></span>
</div>
    <div style={{position:"relative"}}>
    <input type={lock===true?"password":"text"} className="pwd" placeholder="Password"/>
<span className="lockIcon"></span>
<span className={lock===true?"visibilityIcon":"visibilityOpenIcon"} onClick={()=>setLock((lock)=>!lock)}></span>
</div>
<button  onClick={(event)=>{
let emailId=(document.querySelector(".email")as HTMLInputElement).value
let pwd=(document.querySelector(".pwd") as HTMLInputElement).value
      
setEmailId(emailId);
setPwd(pwd);
setState("userName");


}}>Continue</button>
</div>
</div>
</div>
</>
}

