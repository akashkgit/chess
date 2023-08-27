import {SideBar} from "../SideBar/SideBar"
import React from "react";
import "./RightPane.scss";
import {playArea as PlayArea} from "../playArea/playArea"
export function RightPane(){

return <div id="RightPane" className="RightPane">
    <PlayArea />
    <SideBar />
    

</div>
}