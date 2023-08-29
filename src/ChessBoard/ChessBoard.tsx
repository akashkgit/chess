import {moveCoin,mouseDown,putPiece} from "./helper";
import { initCoinPos } from "./types";
import "./ChessBoard.scss"
import React, { useEffect } from "react";
import {boardMode,boxMap, mapping} from "../specs/data"
let el:HTMLDivElement;
let drag={dragging:false,click:false,el};
let state=drag;

let position:initCoinPos={};
export function ChessBoard(){

    useEffect(()=>{
        let boxes=document.querySelectorAll("#chessBoard > .chessBox");
        boxes.forEach((box)=>{
            position[box.id]=box.getBoundingClientRect();
            position[box.id]["transform"]=getComputedStyle(box).transform;
        })
        console.log("position",position);
    },[])
    let color:boolean=true;
    console.log(boxMap)
    return <div className="ChessBoard" id="chessBoard"  onClick={(event)=>putPiece(event,state,position)} >
   {
    
   Array.from({length:8}).map((val,i)=>{
 return Array.from({length:8}).map((val,j)=>{
    let lColor:number;
    if(j!=0)color=!color;
    lColor=Number(!color)
    console.log(boxMap[i][j])
    let idx:string=(boxMap[i][j] as string);
    
    return <div     draggable  onClick={(event)=>moveCoin(event,drag,position)} onDragStart={(event:any)=>{mouseDown(event,drag,position);}}  data-pos={idx} data-coin={mapping[idx]} className={`chessBox sq_${idx} box_${mapping[idx]!==undefined?mapping[idx]:"hidden"}`}   id={idx} key={String(String(i)+String(j))}>{"box" +boxMap[i][j]} </div>
 })
   }).flat()}
    </div>
}