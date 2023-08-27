import "./SideBar.scss"
import React from "react";
export function SideBar(){
    return <div id="SideBar" className="SideBar">
    <div className="topSideBar ">
    <div className="play flexy"><span className="label1"></span></div>
    <div className="newGame flexy"><span className="label2"></span></div>
    <div className="games flexy"><span className="label3"></span></div>
    <div className="players flexy"><span className="label4"></span></div>
    </div>
    <div className="gamesDets"><span className="label5"></span></div>
    <div className="playerDets"><span className="label5"></span></div>
    </div>
}