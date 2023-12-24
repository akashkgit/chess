import React, { useEffect, useLayoutEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import "./LeftPane.css"
import { authUrl } from "../specs/config";
import * as dummy from "../test"
import {logout} from "../utils/google";
import { useDispatch, useSelector } from "react-redux";
//alert(" from layout "+dummy.value);
//console.log();
export function LeftPane(){
    let login=useSelector((state:any)=>state.loginRed.login)
    let ws=useSelector((state:any)=>state.loginRed.ws)
    let [settings, setSettings] = useState(false);
    let disp=useDispatch()
    let nav=useNavigate()
    useLayoutEffect(()=>{


    },[])
    return <div id="LefPane" className="LeftPane">
        <div className="flex1" >
            <Link className="child1" to="/" ></Link>
            <Link  id="playIcon" className="leftPaneItem playIcon" to="/play"><span>Play</span></Link>
            <Link id="Puzzle"  className="disable leftPaneItem Puzzle" to="/Puzzles"><span>Puzzles</span></Link>
            <Link id="learn" className="disable leftPaneItem Learn" to="/Learn"><span>Learn</span></Link>
            <Link id="watch" className="disable leftPaneItem Watch" to="/Watch"><span>Watch</span></Link>
            <Link id="news" className="disable leftPaneItem News" to="/News"><span>News</span></Link>
            <Link id="social" className="disable leftPaneItem Social" to="/Social"><span>Social</span></Link>
            <Link id="more" className="disable leftPaneItem More" to="/More"><span>More</span></Link>
            <Link id="freetrial" className="disable leftPaneItem FreeTrial" to="/Free Trial"><span>Free Trial</span></Link>
            <Link id="signup" to="signup" className={login?"hidden":"signupClickButton"}><span>Sign Up</span></Link>
            <Link id="login" to="login" className={login?"hidden":"loginClickButton"}><span>Log In</span></Link>
            <div className={login?"flex2":"hidden"}>
            <div className="leftPaneItem" onMouseOver={()=>{setSettings(true)}} onMouseLeave={()=>{setSettings(false)}}>
                <div className="gear"></div><span>Settings</span>
                <div  onClick={()=>logout(disp,ws,nav)} className={"secbox " +(settings?"":"hiddenVisibility")}>
                <div className="triangle"></div>
                    <div className="leftPaneItem" ><div className="logout"></div><span>logout</span></div>
                    
                </div>
            
            
            </div>
           
        </div>     

        </div>
       
    </div>
}