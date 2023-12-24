import React, { MouseEventHandler, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import "./direct.css"

function visibilityToggler(event:any){

    let span=event.target as HTMLSpanElement;
    span.classList.add("visibilityOpenIcon");
    span.remove
}

export function DirectSignUp(){

    //console.log("ren defred")
    let [selected,setSelected]=useState("");
     let  [cont,setContinue]=useState(0);
     let submit=useRef(false);
     let nav=useNavigate();
     
    
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
<div className="chessLabel2">
         <a>Chess.com</a>
        </div>
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





<UserDetails cont={cont}/>






<button  onClick={(event)=>continueFunc(event,cont,setContinue,submit,nav)}>Continue</button>

</div>
</div>
</>    
}


export function UserDetails(props:any){
    let cont=props.cont;
    const [lock,setLock]=useState(true);
    return <>
    <div className="signinDets" style={{display:cont?"block":"none"}}>
    <div style={{position:"relative"}}><input type="email" className="uname email"  placeholder="Email" />
<span className="mailIcon" ></span>
</div>
    <div style={{position:"relative"}}>
    <input type={lock===true?"password":"text"} className="pwd" placeholder="Password"/>
<span className="lockIcon"></span>
<span className={lock===true?"visibilityIcon":"visibilityOpenIcon"} onClick={()=>setLock((lock)=>!lock)}></span>
</div>
</div>
</>
}

function continueFunc(event:any,cont:number,setContinue:(k:any)=>void,submit:any,nav:any){
    
    if(cont>1){
       
        let url="https://s38121vp76.execute-api.us-east-1.amazonaws.com/signup";
        let emailId=(document.querySelector(".email")as HTMLInputElement).value
        let pwd=(document.querySelector(".pwd") as HTMLInputElement).value
        let data=JSON.stringify({emailId,password:pwd})
       
        fetch(url,{
            method:"POST",
            mode:"cors",
            body:data
        }).then((val)=>nav("/login")).catch((err)=>console.log("Error ",err));
    }
    else{
        setContinue((val:number)=>val+1);
    }
}