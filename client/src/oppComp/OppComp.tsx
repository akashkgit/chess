import { useSelector } from "react-redux";
import "./oppComp.css";
import {Clock } from "../Clock/Clock";
import React from "react"
export function OppComp(props:any){
    let uname=props.uname;
    let score=props.score;
    
    let start:boolean=useSelector((state:any)=>state.game.start)
    let nationality=props.nationality;
    return <div id="OppComp" className={start?"OppComp":"OppComp"}>
    <div className="playerIcon"></div>
    <div className="OppDetails"> {uname}-{nationality}</div>
    <Clock clockId={props.clockId} tick={props.tick}/>
    
         
    {/* <Clock /> */}
    </div>
}