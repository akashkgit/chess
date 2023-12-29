import React from 'react';
import { switchTurn,updateMyMove,setMove } from '../reduxFiles/configs';
import { moveACoin } from '../ChessBoard/ChessBoard';
export function  undoHandler(event:any,mappedMoves:any[], turn:boolean,disp:any){
 if(0 === mappedMoves.length || turn ){   alert(" cannot undo:size 0"); return;}
 let lastPair = mappedMoves[mappedMoves.length-1];
 let lastMove = 1 === lastPair.length  ? lastPair[0]: lastPair[1];
 console.log("lastmove ",lastMove);
 let revertPos=[lastMove.Pos[0] * -1, lastMove.Pos[1] * -1]
 let replayMove = {...lastMove,type:"undo"}
 console.log("replay move",replayMove);
 moveACoin(replayMove);
 disp(updateMyMove(replayMove));


}