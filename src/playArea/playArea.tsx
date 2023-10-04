import "./playArea.scss"
import React, { useContext, useEffect } from "react"
import {ChessBoard} from "../ChessBoard/ChessBoard"
import {OppComp} from "../oppComp/OppComp"
import {PlayerComp} from "../PlayerComp/PlayerComp"
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector"
import {login as log} from "../reduxFiles/configs"
import { useDispatch } from "react-redux"
import { PlayCntxt } from "../RightPane/RightPane"
import { authUrl } from "../specs/config"


export function playArea(){
    let disp=useDispatch();
    let loginRed=useSelector((state:any)=>state.loginRed)
    
    
    let {playState,setPlayState}=useContext(PlayCntxt);
    let start:boolean=useSelector((state:any)=>state.game.start)
    let opp:boolean=useSelector((state:any)=>state.game.opp)
    let myTurn:boolean=useSelector((state:any)=>state.gameSession.myTurn)
    let myCoin=useSelector((state:any)=>state.game.myCoin)
    //alert(" rending "+start);
    useEffect(()=>{
        
        let loginStatus=localStorage.getItem("login")
        let username=localStorage.getItem("username")
       

        disp(log({login:Boolean(loginStatus),uname:username}));
        
    },[])
    let login=useSelector((state:any)=>state.loginRed.login)
    
    return <div id="playArea"  style={{pointerEvents:start && myTurn?"auto":"none"}} className="playArea">

    <OppComp uname={opp} />
    <ChessBoard />
    <OppComp uname={loginRed.uname} />
    
    </div>
}