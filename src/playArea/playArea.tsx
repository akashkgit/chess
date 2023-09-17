import "./playArea.scss"
import React, { useEffect } from "react"
import {ChessBoard} from "../ChessBoard/ChessBoard"
import {OppComp} from "../oppComp/OppComp"
import {PlayerComp} from "../PlayerComp/PlayerComp"
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector"
import {login as log} from "../reduxFiles/configs"
import { useDispatch } from "react-redux"
export function playArea(){
    let disp=useDispatch();
    let loginRed=useSelector((state:any)=>state.loginRed)
    console.log("username ",loginRed)
    useEffect(()=>{
        
        let loginStatus=localStorage.getItem("login")
        let username=localStorage.getItem("username")
        disp(log({login:Boolean(loginStatus),uname:username}));
    },[])
    let login=useSelector((state:any)=>state.loginRed.login)
    console.log("rendering ",login)
    return <div id="playArea"  style={{pointerEvents:login===true?"auto":"none"}} className="playArea">

    <OppComp />
    <ChessBoard />
    <OppComp uname={loginRed.uname}/>
    
    </div>
}