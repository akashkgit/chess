import "./oppComp.scss";
import React from "react"
export function OppComp(props:any){
    let uname=props.uname;
    let score=props.score;
    let nationality=props.nationality;
    return <div id="OppComp" className="OppComp">
    <div className="playerIcon"></div>
    <div className="OppDetails"> {uname}-{nationality}</div>
    <div className="clock"></div>
    </div>
}