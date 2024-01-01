
import React, { useDebugValue, useEffect, useState } from 'react';
import "./InPlay.css";
import { raiseDraw, undoHandler, resign, acceptDraw, rejectDraw, acceptUndo, rejectUndo } from "./handlers"
import { useDispatch, useSelector } from 'react-redux';
export function InPlay() {

    let myMove = useSelector((state: any) => state.gameSession.myMove)
    let oppMove = useSelector((state: any) => state.gameSession.move)
    let oppKilledCoins = useSelector((state: any) => state.gameSession.oppKilledCoins)
    let myKilledCoins = useSelector((state: any) => state.gameSession.myKilledCoins)
    let ws: WebSocket = useSelector((state: any) => state.loginRed.ws)
    let uname: string = useSelector((state: any) => state.loginRed.uname)
    let opp: string = useSelector((state: any) => state.game.opp)
    let undo = useSelector((state: any) => state.gameSession.undo)
    let draw = useSelector((state: any) => state.gameSession.draw)
    let history = useSelector((state: any) => state.gameSession.moveHistory)
    let turn = useSelector((state: any) => state.gameSession.turn)
    let mappedMoves = history.map((arr: any[]) => {
        console.log("historyMap entry", arr[0], typeof arr[0])
        let res: any[] = [];
        if (arr[0])
            res.push(JSON.parse(arr[0]));
        if (2 == arr.length && arr[1])
            res.push(JSON.parse(arr[1]))
        return res;
    })

    console.log("historyMap ", mappedMoves)
    let disp = useDispatch();
    return <div className="InPlay">
        <div>
            <div className={undo ? "hidden" : 'moveHistory'}>
                <h1> in play</h1>
                {mappedMoves.map((arr: any[], id: number) => {
                    return <>


                        <div className={'movePair ' + (0 === (id + 1) % 2 ? "even" : "")}>
                            <h4>{id + 1}.</h4>
                            {arr[0] && <div className={'one ' + ((id === mappedMoves.length - 1 && !arr[1]) ? "lastMove" : "")}>{arr[0].coin.boxId}</div>}
                            {arr[1] && <div className={'two ' + ((id === mappedMoves.length - 1) ? "lastMove" : "")}>{arr[1].coin.boxId}</div>}
                        </div>
                    </>
                })}
            </div>
            <div className={undo ? "undoRequest" : 'hidden'}>
                <div> Accept Undo?</div>
                <div className='drawButtons'>

                    <button className='rejectDraw' onClick={() => rejectUndo(ws, uname, opp)}><span></span></button>
                    <button className='acceptDraw' onClick={() => acceptUndo(ws, myKilledCoins, mappedMoves, turn, disp, uname, opp)}><span></span></button>
                </div>

            </div>
            <div className={draw ? "undoRequest" : 'hidden'}>
                <div> Accept Draw?</div>
                <div className='drawButtons'>

                    <button className='rejectDraw' ><span></span></button>
                    <button className='acceptDraw' onClick={() => acceptDraw(ws, disp, uname, opp)}><span></span></button>
                </div>

            </div>
            <div className='inMatchControls'>
                <div className='draw' onClick={() => { raiseDraw(ws, uname, opp, disp) }}><span className='halflogo'>Draw</span></div>
                <div className='resign' onClick={() => resign(ws, uname, opp, disp)}><span className='resignlogo'>Resign</span></div>
                <div className='undo' onClick={(event) => undoHandler(event, mappedMoves, turn, disp, oppKilledCoins, ws, opp, uname)}><span className='undologo'></span></div>
                <div className='pause'><span className='pauselogo'></span></div>
                <div className='start'><span className='startlogo'></span></div>
                <div className='back'><span className='backlogo'></span></div>
                <div className='forward'><span className='forwardlogo'></span></div>
                <div className='end'><span className='endlogo'></span></div>
            </div>
        </div>
        <Chat />
    </div>
}
function Chat() {

    let src = useSelector((state: any) => state.loginRed.uname);
    let ws: WebSocket = useSelector((state: any) => state.loginRed.ws);
    let dest = useSelector((state: any) => state.game.opp);
    let [chatHistory, setChatHistory] = useState([]);
    let [Error, setError] = useState(null);
    useEffect(() => {
        if (ws)
            ws.addEventListener("message", (message) => {
                let resp = JSON.parse(message.data);
                console.log("chatMsg ","chatMsg" === resp.type, " | ",resp)
                if ("chatMsg" === resp.type) {
                    setChatHistory((history) => [...history, { "src": resp.src, "chatMsg": resp.chatMsg }]);
                }
            })
    }, [ws]

    )
    function sendMessage(ev: any, ws: WebSocket) {
        ev.preventDefault();
        let formdata=new FormData(ev.target);


        if (ws) {

            setChatHistory((history) => [...history, { "src": src, "chatMsg": formdata.get("msg") }]);
            ws.send(JSON.stringify({ action: "matchManager", type: "chatMsg", "src": src, "dest": dest, "chatMsg": formdata.get("msg") }))
            console.log("chatMsg ",JSON.stringify({ action: "matchManager", type: "chatMsg", "src": src, "dest": dest, "chatMsg": formdata.get("msg") }),' |  ',formdata," | ",formdata.get("msg"))
            ev.target.reset();
        }
        else {
            setError("No Active Connection to game server!");
        }
    }

    return <div className='chat'>
        <div className='msgs'>
            {chatHistory.map((msg: { [idx: string]: string }) => {
                console.log("chatMsg ",msg.chatMsg, msg);
                return <div className={src === msg.src ? "leftBubbleWrap" : "rightBubbleWrap"}><div className={src === msg.src ? "leftBubble" : "rightBubble"}>{msg.chatMsg}</div></div>
            })}
        </div>
        <form onSubmit={(ev) => sendMessage(ev, ws)}>
            {Error && <div className='err'>{Error}</div>}
            <input type='text' name="msg" className='typingArea' placeholder={"Chat with "+dest}></input>

        </form>

    </div>
}


