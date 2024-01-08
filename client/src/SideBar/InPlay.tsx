
import React, { useDebugValue, useEffect, useState } from 'react';
import "./InPlay.css";
import { raiseDraw, undoHandler, resign, acceptDraw, rejectDraw, acceptUndo, rejectUndo, rejectPause, acceptPause, rejectResume, acceptResume } from "./handlers"
import { useDispatch, useSelector } from 'react-redux';
import { drawGame, endGame, popHistory, reset, setDraw, setPaused, setUndo, switchTurn } from '../reduxFiles/configs';
import { moveACoin } from '../ChessBoard/ChessBoard';
export function InPlay() {

    let myMove = useSelector((state: any) => state.gameSession.myMove)
    let oppMove = useSelector((state: any) => state.gameSession.move)
    let oppKilledCoins = useSelector((state: any) => state.gameSession.oppKilledCoins)
    let myKilledCoins = useSelector((state: any) => state.gameSession.myKilledCoins)
    let ws: WebSocket = useSelector((state: any) => state.loginRed.ws)
    let start: boolean = useSelector((state: any) => state.loginRed.start)
    let uname: string = useSelector((state: any) => state.loginRed.uname)
    let opp: string = useSelector((state: any) => state.game.opp)
    let undo = useSelector((state: any) => state.gameSession.undo)
    let draw = useSelector((state: any) => state.gameSession.draw)
    let pause = useSelector((state: any) => state.gameSession.pause)
    let resume = useSelector((state: any) => state.gameSession.resume)
    let paused = useSelector((state: any) => state.gameSession.paused)
    let history = useSelector((state: any) => state.gameSession.moveHistory)
    let turn = useSelector((state: any) => state.gameSession.turn)
    let disp = useDispatch();
    let mappedMoves = history.map((arr: any[]) => {
        console.log("historyMap entry", arr[0], typeof arr[0])
        let res: any[] = [];
        if (arr[0])
            res.push(JSON.parse(arr[0]));
        if (2 == arr.length && arr[1])
            res.push(JSON.parse(arr[1]))
        return res;
    })
    let wsHandler = function (message: any) {
        let data = JSON.parse(message.data);
        console.log("oncoming message ", data);
        if ("undoACK" === data.type) {
            // alert(" undoing ack ");
            disp(popHistory());
            let lastPair = mappedMoves[mappedMoves.length - 1];
            let lastMove = 1 === lastPair.length ? lastPair[0] : lastPair[1];
            console.log("lastmove ", lastMove);
            let revertPos = [lastMove.Pos[0], lastMove.Pos[1]]
            let replayMove = { ...lastMove, type: "undo" }
            console.log("replay move", replayMove);
            moveACoin(replayMove);
            console.log("killed? ", replayMove.kill.kill)

            // --------- curpos estimation -------------------

            let pos = revertPos;
            let newPos = "";
            let target: HTMLElement = document.querySelector(`[data-pos="${replayMove.coin.boxId}"]`)
            let oppCoin = target.dataset.mycoin;
            if ("white" === oppCoin) {
                let curPos = target.dataset.curpos;
                console.log("curPos ", curPos, origin);
                newPos = (Number(curPos.split("")[0]) + pos[1]) + "" + String.fromCharCode((curPos.split("")[1].charCodeAt(0) + (-1 * pos[0])));
                // alert(pos+" "+newPos+" "+curPos);

            }
            else if ("black" === oppCoin) {
                let curPos = target.dataset.curpos;
                console.log("curPos ", curPos, origin);
                newPos = (Number(curPos.split("")[0]) - pos[1]) + "" + String.fromCharCode((curPos.split("")[1].charCodeAt(0) + (pos[0])));
                //alert(pos+" "+newPos+" "+curPos+" ");//+(Number(curPos.split("")[0]) -  switching[1])+" "+" "+curPos.split("")[0]+" 0: "+(Number(curPos.split("")[0])-switching[1])+" | "+switching[1]+" "+curPos.split("")[1].charCodeAt(0));

            }
            target.dataset.curpos = newPos;
            // alert(target.dataset.curpos);








            //-----------------------------------------------------
            if (replayMove.kill.kill) {
                console.log("restoring from", oppKilledCoins);
                let killedCoin = oppKilledCoins[oppKilledCoins.length - 1];
                (document.querySelector(`[data-pos="${killedCoin.pos}"]`) as HTMLDivElement).style.display = "block";
                // let cBoard=document.querySelector("#chessBoard");
                // let divElement:HTMLDivElement=document.createElement("div");
                // divElement.dataset.mycoin=killedCoin.mycoin
                // divElement.dataset.coin=killedCoin.coin
                // divElement.dataset.pos=killedCoin.pos
                // divElement.id=killedCoin.id
                // divElement.className=(killedCoin.class)
                // divElement.style.transform=killedCoin.style.transform;
                // cBoard.appendChild(divElement);

                console.log("restoring ", killedCoin);
            }
            //  disp(updateMyMove(replayMove));
            disp(switchTurn());
        }
        else if ("undoNACK" === data.type) {
            disp(setUndo(false));
        }
        else if ("pauseACK" === data.type) {

            disp(setPaused(true));
        }
        else if ("drawACK" === data.type) {
            // alert(" draw accepted..will end the match");
            disp(endGame(true));// true is optional 
            disp(drawGame());
            disp(reset(true));

            disp(setDraw(false));
            // should navigate to homepage ....
        }
        else if ("drawNACK" === data.type) {
            disp(setDraw(false));
        }
        else if ("pauseACK" === data.type) {
            disp(setPaused(true));
        }
        else if ("resumeACK" === data.type){
            alert("resumingACK rcvd");
            disp(setPaused(false));
        }

    };


    useEffect(() => {
        if (ws)
            ws.addEventListener("message", wsHandler)
        return () => {
            if (ws)
                ws.removeEventListener("message", wsHandler);
        }
    });

    console.log("historyMap ", mappedMoves)
    function raisePause(ev: any) {

    }
    return <div className="InPlay">
        <div>
            <div className={'inMatchControls '+ (start ===false?"disabled":"")}>
                <div className={'draw' + (draw ? " disabled" : "")} onClick={() => { raiseDraw(ws, uname, opp, disp, draw) }}><span className='halflogo'>Draw</span></div>
                <div className={'resign'} onClick={() => resign(ws, uname, opp, disp)}><span className='resignlogo'>Resign</span></div>
                <div className={'undo' + (undo ? " disabled" : "")} onClick={(event) => undoHandler(event, mappedMoves, turn, disp, oppKilledCoins, ws, opp, uname, undo)}><span className='undologo'></span></div>
                <div className='pause' >
                    <span className={!paused ? 'pauselogo' : "hidden"} onClick={(ev) => ws.send(JSON.stringify({ action: "matchManager", type: "pause", "src": uname, "dest": opp }))}></span>
                    <span className={paused ? 'resumelogo' : "hidden"} onClick={(ev) => ws.send(JSON.stringify({ action: "matchManager", type: "resume", "src": uname, "dest": opp }))}>

                        <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 7L0 0V14L11 7Z" fill="#F9F9F9" />
                        </svg>



                    </span>
                </div>
                <div className='start'><span className='startlogo'></span></div>
                <div className='back'><span className='backlogo'></span></div>
                <div className='forward'><span className='forwardlogo'></span></div>
                <div className='end'><span className='endlogo'></span></div>
            </div>
            <div className={(undo || draw || pause || resume) ? "hidden" : 'moveHistory'}>
                {/* <h1> in play</h1> */}
                {mappedMoves.map((arr: any[], id: number) => {
                    return <>


                        <div className={'movePair ' + (0 === (id + 1) % 2 ? "even" : "")}>
                            <h4>{id + 1}.</h4>
                            {arr[0] && <div className={'one ' + ((id === mappedMoves.length - 1 && !arr[1]) ? "lastMove" : "")}>{arr[0].coin.curPos}</div>}
                            {arr[1] && <div className={'two ' + ((id === mappedMoves.length - 1) ? "lastMove" : "")}>{arr[1].coin.curPos}</div>}
                        </div>
                    </>
                })}
                {/* {Array.from({length:20}).map(()=><div>adfasd</div>)} */}
            </div>

            <div className={undo ? "undoRequest" : 'hiddenVisibility'}>
                <div> Accept Undo?</div>
                <div className='drawButtons'>

                    <button className='rejectDraw' onClick={() => rejectUndo(ws, uname, opp, disp)}><span></span></button>
                    <button className='acceptDraw' onClick={() => acceptUndo(ws, myKilledCoins, mappedMoves, turn, disp, uname, opp, history)}><span></span></button>
                </div>

            </div>

            <div className={draw ? "undoRequest" : 'hiddenVisibility'}>
                <div> Accept Draw?</div>
                <div className='drawButtons'>
                    <button className='rejectDraw' onClick={() => rejectDraw(ws, disp, uname, opp)}><span></span></button>
                    <button className='acceptDraw' onClick={() => acceptDraw(ws, disp, uname, opp)}><span></span></button>
                </div>

            </div>
            <div className={pause ? "undoRequest" : 'hidden'}>
                <div> Accept Pause?</div>
                <div className='drawButtons'>
                    <button className='rejectDraw' onClick={() => rejectPause(ws, disp, uname, opp)}><span></span></button>
                    <button className='acceptDraw' onClick={() => acceptPause(ws, disp, uname, opp)}><span></span></button>
                </div>

            </div>
            <div className={resume ? "undoRequest" : 'hidden'}>
                <div>Resume?</div>
                <div className='drawButtons'>
                    <button className='rejectDraw' onClick={() => rejectResume(ws, disp, uname, opp)}><span></span></button>
                    <button className='acceptDraw' onClick={() => acceptResume(ws, disp, uname, opp)}><span></span></button>
                </div>

            </div>
        </div>
        {!undo && !draw && <Chat />}
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
                console.log("chatMsg ", "chatMsg" === resp.type, " | ", resp)
                if ("chatMsg" === resp.type) {
                    setChatHistory((history) => [...history, { "src": resp.src, "chatMsg": resp.chatMsg }]);
                }
            })
    }, [ws]

    )
    function sendMessage(ev: any, ws: WebSocket) {
        ev.preventDefault();
        let formdata = new FormData(ev.target);


        if (ws) {

            setChatHistory((history) => [...history, { "src": src, "chatMsg": formdata.get("msg") }]);
            ws.send(JSON.stringify({ action: "matchManager", type: "chatMsg", "src": src, "dest": dest, "chatMsg": formdata.get("msg") }))
            console.log("chatMsg ", JSON.stringify({ action: "matchManager", type: "chatMsg", "src": src, "dest": dest, "chatMsg": formdata.get("msg") }), ' |  ', formdata, " | ", formdata.get("msg"))
            ev.target.reset();
        }
        else {
            setError("No Active Connection to game server!");
        }
    }

    return <div className='chat'>
        <div className='msgs'>
            {chatHistory.map((msg: { [idx: string]: string }) => {
                console.log("chatMsg ", msg.chatMsg, msg);
                return <div className={src === msg.src ? "leftBubbleWrap" : "rightBubbleWrap"}><div className={src === msg.src ? "leftBubble" : "rightBubble"}>{msg.chatMsg}</div></div>
            })}
        </div>
        <form onSubmit={(ev) => sendMessage(ev, ws)}>
            {Error && <div className='err'>{Error}</div>}
            <input type='text' name="msg" className='typingArea' placeholder={"Chat with " + dest}></input>

        </form>

    </div>
}


