import "./index.scss"
import { authUrl } from "./specs/config";
import {createRoot} from 'react-dom/client';
import React, { Children, useEffect, useReducer, useRef, useState } from 'react';
import { createHashRouter,RouterProvider} from 'react-router-dom'
import {App} from "./App/app";
import { SignUp } from './signup/SignUp';
import {DirectSignUp} from "./signup/DirectSignUp"
import { LogIn } from './login/login';
import {configureStore} from "@reduxjs/toolkit"
import { Provider, useDispatch, useSelector } from "react-redux";
import { authCheck, globalState, login, startGame, wsChanger } from "./reduxFiles/configs";
import { RightPane } from "./RightPane/RightPane";
import { AtRest, FriendSelector, RandomGame, StartPlay } from "./SideBar/SideBar";
import * as dummy from "./test"
import { reqAck, wsHandler } from "./specs/data";
//alert(" from index "+dummy.value);


const router=createHashRouter([
    {
        path:"/signup",
        children:[
        {
            element:<SignUp />,
            index:true

        
        },
        {
            path:"direct",
            element:<DirectSignUp />
        }
        ]
        

    },
    {
        path:"/",
        element:<App />,
       children:[{
        index:true,
        element:<RightPane />
       },{
        path:"play",
        element:<RightPane />,
        children:[{
            index:true,
            element:<AtRest />

        },
        {
            path:"online",
            element:<StartPlay />,
            children:[{
                index:true,
                element:<RandomGame />

            },{
                path:"friend",
                element:<FriendSelector />
            }]
        }
    ]
       }]

    },
    {
        path:"/login",
        children:[
        {
            element:<LogIn />,
            index:true

        
        },
        {
            path:"direct",
            element:<DirectSignUp />
        }
        ]
        

    }
   

])

function init(disp:any){
let jwt=localStorage.getItem("jwt");
var wsock:WebSocket;
//alert("jwt is "+jwt)
if(jwt!==undefined){
    wsock=new WebSocket(authUrl);
    wsock.onopen=()=>{
        //console.log({"action":"auth","jwt":localStorage.getItem("jwt")});
        wsock.send(JSON.stringify({"action":"auth","jwt":jwt}))
       }
       wsock.onmessage=((val:any)=>{
           //\alert("ONMESSAGE "+val.data)

           
           let data=JSON.parse(val.data)
           if(data.type==="auth"){
           // alert(" auth message");

           if(!data.authorized){
           // alert(" chaning path name to ogin : not authoried by api")
            window.location.pathname="/login"
           }
           else{
           // console.log(" setting wsock to ",wsock);
            disp(wsChanger({ws:wsock}));
           }
        }
           
       })
    
       //alert(" created socket as it had jwt verified ");
    }


else{
  //  alert(" else : chaning path name to ogin")
    window.location.pathname="/login"
}
}

let rRoot=createRoot(document.querySelector("#reactRoot") as Element)
rRoot.render(<Provider store={globalState} ><RouterProvider router={router} /><Notification /></Provider>);

function App2(){
    return <><h2>app5</h2></>
}

function acceptRreject(event:any,ws:WebSocket,src:string,disp:any){
    let choice=event.target.id;
    let parent=event.target.parentNode;
    (document.querySelector(".notification") as HTMLDivElement).style.display="none";
    //parent.style.display="none";
    //alert(" sending the data"+JSON.stringify({action:"matchManager",type:"requestAck","choice":"accept","src":src,"dest":localStorage.getItem("username")}));
    ws.send(JSON.stringify({action:"matchManager",type:"requestAck","choice":"accept","src":src,"dest":localStorage.getItem("username")}))
    disp(startGame({start:true,myCoin:"black",opp:src}))

}
function Notification(){
    
    

    let [active,activate]=useState(false);
    let [src,setSrc]=useState("");
    let ws=useSelector((state:any)=>state.loginRed.ws);
    let start=useSelector((state:any)=>state.game.start);
    let disp= useDispatch();

    let clearId=useRef(0)

    console.log("ws =>",ws);
    useEffect(()=>{
        let handler=wsHandler(activate,clearId,setSrc,disp);
        if(ws)
        ws.addEventListener("message",handler)
    },[ws])

    useEffect(()=>{
            init(disp);
    },[])
  
    
    return<>
    <div className="notification" style={{display:active?"flex":"none"}}>
    <div className="timerlogo">

    </div>
    <div className="notificationP2">
        <div className="sentBy">{src}</div>
        <span className="accept"  onClick={(val)=>acceptRreject(val,ws,src,disp)}id="accept"></span>
        <span className="reject" onClick={(val)=>acceptRreject(val,ws,src,disp)} id="reject"></span>
    </div>
    </div>
    </>
}
