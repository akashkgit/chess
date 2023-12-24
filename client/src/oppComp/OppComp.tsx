import { useSelector } from "react-redux";
import "./oppComp.css";
import React from "react"
export function OppComp(props:any){
    let uname=props.uname;
    let score=props.score;
    
    let start:boolean=useSelector((state:any)=>state.game.start)
    let nationality=props.nationality;
    return <div id="OppComp" className={start?"OppComp":"hidden"}>
    <div className="playerIcon"></div>
    <div className="OppDetails"> {uname}-{nationality}</div>
    
         
    {/* <Clock /> */}
    </div>
}