
import React, { useDebugValue } from 'react';
import "./InPlay.css";
import {undoHandler} from "./handlers"
import { useDispatch, useSelector } from 'react-redux';
export function InPlay(){

        let myMove=useSelector((state:any)=>state.gameSession.myMove)
        let oppMove=useSelector((state:any)=>state.gameSession.move)

        let history= useSelector((state:any)=>state.gameSession.moveHistory)
        let turn= useSelector((state:any)=>state.gameSession.turn)
        let mappedMoves= history.map((arr:any[])=>{
                let res= [JSON.parse(arr[0])]
                if(2 == arr.length && arr[1])
                res.push(JSON.parse(arr[1]))
            return res;
        })
        
        console.log("historyMap ",mappedMoves)
        let disp=useDispatch();
    return <div className="InPlay">
        <div className='moveHistory'>
            <h1> in play</h1>
            {mappedMoves.map((arr:any[],id:number)=>{
                        return  <>
                        
                        
                        <div className={'movePair '+(0 === (id+1) %2 ? "even":"") }>
                        <h4>{id+1}.</h4>
                        {arr[0] && <div className={'one '+((id === mappedMoves.length-1 && !arr[1])?"lastMove":"")}>{arr[0].coin.boxId}</div>}
                        {arr[1] && <div className={'two '+((id === mappedMoves.length-1)?"lastMove":"")}>{arr[1].coin.boxId}</div>}
                        </div>
                        </>
            })}
        </div>
        <div className='inMatchControls'>
            <div className='draw'><span className='halflogo'>Draw</span></div>
            <div className='resign'><span className='resignlogo'>Resign</span></div>
            <div className='undo' onClick={(event)=>undoHandler(event,mappedMoves,turn,disp)}><span className='undologo'></span></div>
            <div className='pause'><span className='pauselogo'></span></div>
            <div className='start'><span className='startlogo'></span></div>
            <div className='back'><span className='backlogo'></span></div>
            <div className='forward'><span className='forwardlogo'></span></div>
            <div className='end'><span className='endlogo'></span></div>
        </div>

    </div>
}