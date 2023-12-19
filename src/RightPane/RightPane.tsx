import {SideBar} from "../SideBar/SideBar"
import React, { createContext, useState } from "react";
import "./RightPane.css";
import {playArea as PlayArea} from "../playArea/playArea"


export let PlayCntxt=createContext(null)

export function RightPane(){

let [playState,setPlayState]=useState({start:false,myCoin:"none"});

return <div id="RightPane" className="RightPane">
    <PlayCntxt.Provider value={{playState,setPlayState}} >

    <PlayArea />
    <SideBar />
    </PlayCntxt.Provider>
    

</div>
}