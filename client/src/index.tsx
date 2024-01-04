import "./index.css"
import { authUrl } from "./specs/config";
import { createRoot } from 'react-dom/client';
import React, { Children, useEffect, useReducer, useRef, useState } from 'react';
import { createHashRouter, RouterProvider, useNavigate } from 'react-router-dom'
import { App } from "./App/app";
import { SignUp } from './signup/SignUp';
import { DirectSignUp } from "./signup/DirectSignUp"
import { LogIn } from './login/login';
import {InPlay} from "./SideBar/InPlay";
import { configureStore } from "@reduxjs/toolkit"
import { Provider, useDispatch, useSelector } from "react-redux";
import { authCheck, globalState, login as log, login, reset, setTimingOption, startGame, wsChanger } from "./reduxFiles/configs";
import { RightPane } from "./RightPane/RightPane";
import { AtRest, FriendSelector, RandomGame, PlayOptionsStateMachine,StartPlay } from "./SideBar/SideBar";
import * as dummy from "./test"
import { reqAck, wsHandler } from "./specs/data";
import {ProtectedRoute, sessionValidator} from "./utils/protectedRoute"
//alert(" from index "+dummy.value);



const router = createHashRouter([
    {
        path: "/signup",
        children: [
            {
                element: <SignUp />,
                index: true


            },
            {
                path: "direct",
                element: <DirectSignUp />
            }
        ]


    },
    {
        path: "/",
        element: <App />,
        children: [{
            path: "",
            element: <RightPane />,
            children: [{
                index: true,
                element: <AtRest />

            },
            {
                path: "online",
                element: <ProtectedRoute><StartPlay /></ProtectedRoute>,
                children: [{
                    index: true,
                    element: <PlayOptionsStateMachine />

                }, {
                    path: "friend",
                    element: <FriendSelector />
                },{
                    path:"inplay",
                    element:<InPlay />
                }]
            }
            ]

        }, {
            path: "play",
            element: <RightPane />,
            children: [{
                index: true,
                element: <AtRest />

            },
            {
                path: "online",
                element: <ProtectedRoute><StartPlay /></ProtectedRoute>,
                children: [{
                    index: true,
                    element: <RandomGame />

                }, {
                    path: "friend",
                    element: <FriendSelector />,
                }]
            }
            ]
        }]

    },
    {
        path: "/login",
        children: [
            {
                element: <LogIn />,
                index: true


            },
            {
                path: "direct",
                element: <DirectSignUp />
            }
        ]


    }


], { basename: "/" })

export function init(disp: any,nav:any) {
    
    let jwt = localStorage.getItem("jwt");
    var wsock: WebSocket;
    //alert("jwt is "+jwt)
    sessionValidator().then((val:boolean)=>{
        // alert(val)
        disp(log({login:val}))
        return val;
        
    }).then((val:boolean)=>{ 
    if (val) { 
        wsock = new WebSocket(authUrl);
        wsock.onopen = () => {
            //console.log({"action":"auth","jwt":localStorage.getItem("jwt")});
            wsock.send(JSON.stringify({ "action": "auth", "jwt": jwt }))
        }
        wsock.onmessage = ((val: any) => {



            let data = JSON.parse(val.data)
            console.log("ONMESSAGE ",data.type, jwt)
            if (data.type === "auth") {
                // alert(" auth message");

                if (!data.authorized) {
                    // alert(" chaning path name to ogin : not authoried by api")
                    console.log(" init auth failed")
                    nav("login");
                }
                else {
                    // console.log(" setting wsock to ",wsock);
                    console.log(" init auth sucesss")

                    disp(wsChanger({ ws: wsock }));
                    // disp(log({ login: true }));
                }
            }

        })

        //alert(" created socket as it had jwt verified ");
    }


    else {
        //  alert(" else : chaning path name to ogin")
        // window.location.pathname = "/login"
    }
});
}

let rRoot = createRoot(document.querySelector("#reactRoot") as Element)
rRoot.render(<Provider store={globalState} ><RouterProvider router={router} /></Provider>);

function App2() {
    return <><h2>app5</h2></>
}

function acceptRreject(event: any, ws: WebSocket, src: string, disp: any,nav:any,timingOption:string,start:boolean,acceptance:boolean) {
    
    
    (document.querySelector(".notification") as HTMLDivElement).style.display = "none";
    if(false === acceptance) return;
    //parent.style.display="none";
    //alert(" sending the data"+JSON.stringify({action:"matchManager",type:"requestAck","choice":"accept","src":src,"dest":localStorage.getItem("username")}));
    let choice = event.target.id;
    let parent = event.target.parentNode;
    ws.send(JSON.stringify({ action: "matchManager", type: "requestAck", "choice": "accept", "src": src, "dest": localStorage.getItem("username") }))
    disp(startGame({ start: true, myCoin: "black", opp: src }))
    disp(setTimingOption(timingOption));
    if(start)disp(reset(true));
    nav("/online/inplay");

}
export function Notification() {



    let [active, activate] = useState(false);
    let [src, setSrc] = useState("");
    let [timingOption, setTimingOption] = useState("");
    let ws = useSelector((state: any) => state.loginRed.ws);
    let start = useSelector((state: any) => state.game.start);
    
    let disp = useDispatch();

    let clearId = useRef(0)
let nav=useNavigate();
    console.log("ws =>", ws);
    useEffect(() => {
        let handler = wsHandler(activate, clearId, setSrc, disp,setTimingOption,start);
        if (ws)
            ws.addEventListener("message", handler)
    }, [ws])

    useEffect(() => {
        //init(disp,nav);
        // nav("login");

    }, [])


    return <>
        <div className="notification" style={{ display: active ? "flex" : "none" }}>
            <div className="timerlogo">
            </div>
            <div className="notificationP2">
                <div className="sentBy">{src}</div>
                <span className="accept" onClick={(val) => acceptRreject(val, ws, src, disp,nav,timingOption,start,true)} id="accept"></span>
                <span className="reject" onClick={(val) => acceptRreject(val, ws, src, disp,nav,timingOption,start,false)} id="reject"></span>
            </div>
        </div>
    </>
}
