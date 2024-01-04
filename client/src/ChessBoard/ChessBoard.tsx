import {moveCoin,mouseDown,putPiece, extractProps} from "./helper";
import { initCoinPos } from "./types";
import "./ChessBoard.css"
import React, { useEffect, useState } from "react";
import {boardMode,boxMap, mapping} from "../specs/data"
import { useDispatch, useSelector } from "react-redux";
import { check } from "./handlers";
import { setMyKilledCoins,reset as Reset, setGameProps, setGameSessionProps} from "../reduxFiles/configs";
let el:HTMLDivElement;
let drag={dragging:false,click:false,el};
let state=drag;

let position:initCoinPos={};

export function moveACoin(move:any){
    console.log(" move ",move);
        let [x,y]=move.Pos;
        let killed=move.kill.kill
        let killedCoin=move.kill.dataPos
    let boxId=move.coin.boxId
    let type=move.coin.type;
    let tarPos:string=boxId,killedPiece="";

    
    
    
    if(boxId.split("")[0]==="8")killedPiece+='1'
    else killedPiece='2';
    
    
    
    
    
    //alert("killing ?"+killed+" icon "+killedCoin)
    // if(killed===true){
    //     //console.log(" removing ",document.querySelector(`[data-pos="${killedCoin}"]`))
    //     document.querySelector("#chessBoard").removeChild(document.querySelector(`[data-pos="${killedCoin}"]`));
    // }
    
    let target:HTMLElement=document.querySelector(`[data-pos="${tarPos}"]`) 
    //console.log(target,"is the target ");
    //console.log(target.style.transform+" <= "+"before")
    
    
    console.log("undo pos B: ",getComputedStyle(target).transform)
    //console.log(target.style.transform+" <= "+"after"
    target.style.transform =getComputedStyle(target).transform + `translateY(${y * -100}%) translateX(${x * -100}%)`
    console.log("undo pos A: ",getComputedStyle(target).transform)
    //console.log(target.style.transform)

    
    }
function moveOppCoin(move:any,disp:any){
console.log(" move ",move);
    let [x,y]=move.Pos;
    let killed=move.kill.kill
    let killedCoin=move.kill.dataPos
let boxId=move.coin.boxId
let type=move.coin.type;
let tarPos:string=boxId,killedPiece="";




if(boxId.split("")[0]==="8")killedPiece+='1'
else killedPiece='2';





//alert("killing ?"+killed+" icon "+killedCoin)
if(killed===true){
    //console.log(" removing ",document.querySelector(`[data-pos="${killedCoin}"]`))
    disp(setMyKilledCoins(extractProps(document.querySelector(`[data-pos="${killedCoin}"]`))));
    // document.querySelector("#chessBoard").removeChild(document.querySelector(`[data-pos="${killedCoin}"]`));
    (document.querySelector(`[data-pos="${killedCoin}"]`) as HTMLDivElement).style.display = "none";
}

let target:HTMLDivElement=document.querySelector(`[data-pos="${tarPos}"]`) 
//console.log(target,"is the target ");
//console.log(target.style.transform+" <= "+"before")
let futurePos = getComputedStyle(target).transform + `translateY(${y * -100}%) translateX(${x * -100}%)`
//console.log(target.style.transform+" <= "+"after")
target.style.transform = futurePos;
//console.log(target.style.transform)


}
export function ChessBoard(){

    useEffect(()=>{
        let boxes=document.querySelectorAll("#chessBoard > .chessBox");
        boxes.forEach((box)=>{
            position[box.id]=box.getBoundingClientRect();
            position[box.id]["transform"]=getComputedStyle(box).transform;
        })
       // console.log("position",position);
    },[])
    let color:boolean=true;
    //console.log(boxMap)
    let myCoin=useSelector((state:any)=>state.game.myCoin )
    let start=useSelector((state:any)=>state.game.start )
    let reset=useSelector((state:any)=>state.game.reset )
    let myTurn=useSelector((state:any)=>state.gameSession.myTurn )
    let gameDrawn=useSelector((state:any)=>state.gameSession.gameDrawn )
    let resign=useSelector((state:any)=>state.gameSession.resign )
    let gameWon=useSelector((state:any)=>state.gameSession.gameWon )
    let wonBy=useSelector((state:any)=>state.gameSession.wonBy )
    let move=useSelector((state:any)=>state.gameSession.move )
    let disp=useDispatch()
    let wsock=useSelector((state:any)=>state.loginRed.ws)
    let opp=useSelector((state:any)=>state.game.opp)
    let uname=useSelector((state:any)=>state.loginRed.uname)
    let [closed,setclosed] = useState(false);

   
// alert(gameDrawn && !closed);
    useEffect(()=>{
            if(start && reset){
                let coins=document.querySelectorAll(".chessBoard div:not(.resultWrapper)");
                coins.forEach((coin:HTMLDivElement,id)=>{
                        coin.style.border="2px solid red";
                        coin.style.transform="";
                        coin.style.display="";
                })
                disp(setGameSessionProps({moveHistory:[], myKilledCoins:[],gameWon:false,wonBy:"",undo:false,gameDrawn:false,resign:false,draw:false}));
                disp(Reset(false));
            }
            else{
                let coins=document.querySelectorAll(".chessBoard div:not(.resultWrapper)");
                coins.forEach((coin:HTMLDivElement,id)=>{
                        coin.style.border="2px solid blue";
                        
                        
                })
                

            }
    },[start,start])

    useEffect(()=>{
   // alert(move);
    console.log(move);
        if(move)moveOppCoin(move,disp)
    },[move])
    console.log("popup ",((gameDrawn || gameWon || resign) && !closed ), gameDrawn,gameWon,resign);
    return <div className="ChessBoard" id="chessBoard"  onClick={(event)=>putPiece(event,state,position,myCoin,disp,wsock,uname,opp)} >
        <div className={"resultWrapper "+(((gameDrawn || gameWon || resign) && !closed )?"over":"hidden")}  >
        <div className={"resultPopup "}>
            
            <div className="result">{gameDrawn?"Draw":(gameWon?`${wonBy} won !`:"")}{resign?"You Win by Resignation!":""}</div>
            <div className="resultTxtWrapper"><div className="close" onClick={()=>{setclosed(true);alert("closing popip");}}></div></div>
        </div>
        </div>
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

        return <div   style={{pointerEvents:pEvents &&  start && myTurn ?"auto":"none"}}  draggable  onClick={(event)=>moveCoin(event,drag,position,myCoin)} onDragStart={(event:any)=>{mouseDown(event,drag,position);}} data-mycoin="white" data-pos={key} data-coin={mapping["white"][key]} className={`chessBox sq_${key}W box_${mapping["white"][key]}`}   id={key} key={key}></div>
        
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
        
        return <div  style={{pointerEvents:pEvents && myTurn}}     draggable  onClick={(event)=>moveCoin(event,drag,position,myCoin)} data-myCoin="black" onDragStart={(event:any)=>{mouseDown(event,drag,position);}}  data-pos={key} data-coin={mapping["black"][key]} className={`chessBox sq_${key}B box_${mapping["black"][key]}`}   id={key} key={key}></div>
        
    })
 
}
     </div>

}