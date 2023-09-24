import {moveCoin,mouseDown,putPiece} from "./helper";
import { initCoinPos } from "./types";
import "./ChessBoard.scss"
import React, { useEffect } from "react";
import {boardMode,boxMap, mapping} from "../specs/data"
import { useDispatch, useSelector } from "react-redux";
import { check } from "./handlers";
let el:HTMLDivElement;
let drag={dragging:false,click:false,el};
let state=drag;

let position:initCoinPos={};

function moveOppCoin(move:any){
console.log(move);
    let [x,y]=move.Pos;
    let killed=move.kill.kill
    let killedCoin=move.kill.dataPos
let boxId=move.coin.boxId
let type=move.coin.type;
let tarPos:string=boxId,killedPiece="";




if(boxId.split("")[0]==="8")killedPiece+='1'
else killedPiece='2';





alert("killing ?"+killed+" icon "+killedCoin)
if(killed===true){
    console.log(" removing ",document.querySelector(`[data-pos="${killedCoin}"]`))
    document.querySelector("#chessBoard").removeChild(document.querySelector(`[data-pos="${killedCoin}"]`));
}

let target:HTMLDivElement=document.querySelector(`[data-pos="${tarPos}"]`) 
console.log(target,"is the target ");
console.log(target.style.transform+" <= "+"before")
let futurePos = getComputedStyle(target).transform + `translateY(${y * -100}%) translateX(${x * -100}%)`
console.log(target.style.transform+" <= "+"after")
target.style.transform = futurePos;
console.log(target.style.transform)


}
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
    let myCoin=useSelector((state:any)=>state.game.myCoin )
    let start=useSelector((state:any)=>state.game.start )
    let myTurn=useSelector((state:any)=>state.gameSession.myTurn )
    let move=useSelector((state:any)=>state.gameSession.move )
    let disp=useDispatch()
    let wsock=useSelector((state:any)=>state.loginRed.ws)
    let opp=useSelector((state:any)=>state.game.opp)
    let uname=useSelector((state:any)=>state.loginRed.uname)
    

    

    useEffect(()=>{
    alert(move);
    console.log(move);
        if(move)moveOppCoin(move)
    },[move])

    return <div className="ChessBoard" id="chessBoard"  onClick={(event)=>putPiece(event,state,position,myCoin,disp,wsock,uname,opp)} >
   {
    
//    Array.from({length:8}).map((val,i)=>{
//  return Array.from({length:8}).map((val,j)=>{
//     let lColor:number;
//     if(j!=0)color=!color;
//     lColor=Number(!color)
//     console.log(boxMap[i][j])
//     let idx:string=(boxMap[i][j] as string);
    
//     return <div     draggable  onClick={(event)=>moveCoin(event,drag,position)} onDragStart={(event:any)=>{mouseDown(event,drag,position);}}  data-pos={idx} data-coin={mapping[idx]} className={`chessBox sq_${idx} box_${mapping[idx]!==undefined?mapping[idx]:"hidden"}`}   id={idx} key={String(String(i)+String(j))}>{"box" +boxMap[i][j]} </div>
//  })
//    }).flat()
}

{
    myCoin==="white" && Object.keys(mapping["white"]).map((key)=>{
        
        let pos=mapping["white"][key]
        let letters=pos.split("")
         let pEvents:any=true;
        // console.log("=>",key)
        // if(letters[0]==='b')pEvents=false
        console.log(letters[0]," => ",pEvents,pEvents && myTurn)

        return <div   style={{pointerEvents:pEvents &&  start && myTurn ?"auto":"none"}}  draggable  onClick={(event)=>moveCoin(event,drag,position,myCoin)} onDragStart={(event:any)=>{mouseDown(event,drag,position);}} data-mycoin="white" data-pos={key} data-coin={mapping["white"][key]} className={`chessBox sq_${key}W box_${mapping["white"][key]}`}   id={key} key={key}>{"box" +key} </div>
        
    })
 
}
{
    myCoin==="black" && Object.keys(mapping["black"]).map((key)=>{
        let pos=mapping["black"][key]
        let letters=pos.split("")
         let pEvents:any=true;
        //  console.log("=>",key)
        // if(letters[0]==='w')pEvents=false
        console.log(letters[0]," -> ",pEvents)
        
        return <div  style={{pointerEvents:pEvents && myTurn}}     draggable  onClick={(event)=>moveCoin(event,drag,position,myCoin)} data-myCoin="black" onDragStart={(event:any)=>{mouseDown(event,drag,position);}}  data-pos={key} data-coin={mapping["black"][key]} className={`chessBox sq_${key}B box_${mapping["black"][key]}`}   id={key} key={key}>{"box" +key} </div>
        
    })
 
}
     </div>

}