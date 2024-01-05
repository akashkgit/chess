import React, { createElement } from 'react';
import { switchTurn,updateMyMove,setMove,setUndo, endGame, setDraw, drawGame, popHistory, reset } from '../reduxFiles/configs';
import { moveACoin } from '../ChessBoard/ChessBoard';

export function resign(ws:WebSocket,uname:string,opp:string,disp:any){
    let dataSend=JSON.stringify({action:"matchManager","type":"resign","dest":opp,"src":uname})
    ws.send(dataSend);
    alert("resigning from the match")
    disp(endGame(true));// true is optional 
    disp(reset(true));

}
export function raiseDraw(ws:WebSocket, uname:string, opp:string,disp:any,draw:boolean){
    if(draw){
        // alert(" pending draw request");
        return;
    }
    let dataSend=JSON.stringify({action:"matchManager","type":"draw","dest":opp,"src":uname})
    ws.send(dataSend);
    // disp(setDraw(true));
    
    // ws.addEventListener("message",(message)=>{
    //     let data=JSON.parse(message.data);
       
    // })
}
export function  undoHandler(event:any,mappedMoves:any[], turn:boolean,disp:any,oppKilledCoins:any[],ws:WebSocket,opp:string, uname:string,undo:boolean){
 if(0 === mappedMoves.length || turn || undo ){   alert(" cannot undo:size 0"); return;}
 
 let dataSend=JSON.stringify({action:"matchManager","type":"undo","dest":opp,"src":uname})
 console.log("undo ",dataSend);
//  disp(setUndo(true));
 ws.send(dataSend)
}


export function  oppUndoHandler(mappedMoves:any[], turn:boolean,disp:any,oppKilledCoins:any[],ws:WebSocket,opp:string, uname:string){
    if(0 === mappedMoves.length || turn ){   alert(" cannot undo:size 0"); return;}
    
    let dataSend=JSON.stringify({action:"matchManager","type":"undoACK","dest":opp,"src":uname})
    console.log("undo ",dataSend);
    ws.send(dataSend)
    
    let lastPair = mappedMoves[mappedMoves.length-1];
    let lastMove = 1 === lastPair.length  ? lastPair[0]: lastPair[1];

    
    disp(popHistory());
    
    console.log("lastmove ",lastMove);
    let revertPos=[lastMove.Pos[0] * -1 , lastMove.Pos[1]  * -1]
    let replayMove = {...lastMove,type:"undo",Pos:revertPos}
    console.log("replay move",replayMove);
    moveACoin(replayMove);
    console.log("killed? ",replayMove.kill.kill)
    if(replayMove.kill.kill){
       console.log("restoring from",oppKilledCoins);
       let killedCoin =oppKilledCoins[oppKilledCoins.length-1];
       (document.querySelector(`[data-pos="${killedCoin.id}"]`) as HTMLDivElement).style.display="block";
    //    let cBoard=document.querySelector("#chessBoard");
    //    let divElement:HTMLDivElement=document.createElement("div");
    //    divElement.dataset.mycoin=killedCoin.mycoin
    //    divElement.dataset.coin=killedCoin.coin
    //    divElement.dataset.pos=killedCoin.pos
    //    divElement.id=killedCoin.id
    //    divElement.className=(killedCoin.class)
    //    divElement.style.transform=killedCoin.style.transform;
    //    cBoard.appendChild(divElement);
       console.log("restoring ",killedCoin);
    }
    // disp(updateMyMove(replayMove));
    disp(setUndo(false));
    disp(switchTurn());
   
   
   
   }

export function acceptUndo(ws:WebSocket,myKilledCoins:any[],mappedMoves:any[],turn:boolean,disp:any,uname:string, opp:string,history:any){


    oppUndoHandler(mappedMoves, turn,disp,myKilledCoins,ws,opp, uname)
    


}
export function rejectUndo(ws:WebSocket, uname:String, opp:string,disp:any){
    let dataSend=JSON.stringify({action:"matchManager","type":"undoNACK","dest":opp,"src":uname})
    disp(setUndo(false));
    ws.send(dataSend)
}

export function acceptDraw(ws:WebSocket,disp:any, uname:string,opp:string){

    let dataSend=JSON.stringify({action:"matchManager","type":"drawACK","dest":opp,"src":uname})
    disp(endGame(true));// true is optional 
    disp(drawGame());
    disp(setDraw(false));
    disp(reset(true));
    // alert(" will stop the game ");
    console.log("terminate: draw",dataSend);
    ws.send(dataSend)
}

export function rejectDraw(ws:WebSocket,disp:any,uname:string,opp:string){
    let dataSend=JSON.stringify({action:"matchManager","type":"drawNACK","dest":opp,"src":uname})
    disp(setDraw(false));
    ws.send(dataSend)
}