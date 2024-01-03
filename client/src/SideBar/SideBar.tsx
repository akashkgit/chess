import { Link, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import "./SideBar.css"
import React, { useContext, useEffect, useState } from "react";
import { PlayCntxt } from "../RightPane/RightPane";
import { useSelector } from "react-redux";
export function SideBar() {
    let { playstate, setPlaystate } = useContext(PlayCntxt);

    return <div id="SideBar" className="SideBar">
        {/* <AtPlay /> */}
        <Outlet />



    </div>
}

function start(login: boolean, event: any, setOption: any, setStarted: any, setPlayState: any) {


    setPlayState((state: any) => { return { ...state, started: true } })

    setOption("inGame");
    setStarted(true);
    let myCoin = "white"//api call


}
export function StartPlay() {
    const [started, setStarted] = useState(false);
    const [option, setOption] = useState("newGame");

    let gameStarted = useSelector((state: any) => state.game.start);
    useEffect(() => {
        if (gameStarted) setOption("inGame");
    }, [gameStarted])
    let { playState, setPlayState } = useContext(PlayCntxt);
    let nav = useNavigate();
    return <>
        <div className="topSideBar ">

            <div className="play flexy" style={{ display: option === "inGame" ? "flex" : "none", backgroundColor: option === 'inGame' ? "rgba(65,64,62,1)" : "" }}><span className="label1"></span></div>
            <div className="newGame flexy" style={{ backgroundColor: option === 'newGame' ? "rgba(65,64,62,1)" : "" }}><span className="label2"></span></div>
            <div className="games flexy"><span className="label3"></span></div>
            <div className="players flexy"><span className="label4"></span></div>
        </div>
        <div className="optionExpander">
            <Outlet context={[setOption, setStarted, setPlayState, option]} />
        </div>
        {/* <PlayOptionsStateMachine /> */}

    </>

}
function SubmitPlayRequest(props: any) {
    let { timingOption, myCoin, setOptionDD, setMyCoin, rated, setRated, optionDD, setTimingOption } = props
    console.log(" the props are ", props);
    return <div className="SubmitPlayRequestCont">

        <div className="playvsheader"><span className="playLogo"></span><span>Play Vs</span></div>
        <div className="oppInfo">
            <img className="profilepic" src={"https://www.chess.com/bundles/web/images/user-image.svg"} alt="error fetching src" />
            <span className="name">{props.opp}</span><span className="nationality"></span>

        </div>
        {/* to be added: the below standard game type */}
        {/* <div className="gameType"><span className="standardIcon"></span>Standard</div> */}

        <button className="timeOption">
            <span></span>
            <h5>{timingOption.option}</h5>
            <span className="dropDown" onClick={() => setOptionDD((old: any) => !old)}></span>
        </button>
        <div className={"timingOptions " + (optionDD ? "" : "hidden")}>

            {
                Object.keys(timingCategory).map((key) => {
                    let subOptions: string[] = timingCategory[key];
                    return <div className={"timingCat"}>
                        <div className="header"><span className={`${key}` + " catIcon"}></span><span className="cat">{`${key}`}</span></div>
                        <div className="suboptions">
                            {subOptions.map((suboption) => {
                                return <div id={`${suboption}`} onClick={() => { setTimingOption({ type: key, option: suboption }) }} className={"suboptionitem " + (timingOption.option === suboption ? "selectedGreen" : "")}>{suboption}</div>
                            })
                            }

                        </div>

                    </div>
                })}

        </div>
        <div className="rated"><span className="rated">Rated</span><div className={"ratedselector " + (!rated ? "off" : "")}><div className={"roundbutton " + (!rated ? "buttonoff" : "")} onClick={() => {
            setRated((rated: boolean) => !rated)
        }}></div></div></div>
        <div className="playAs">
            <div className="txt">I play as</div>
            <div className={"white " + (myCoin === "white" ? "selectedGreen" : "")}
                onClick={() => setMyCoin("white")}>
            <div className="whiteCoin"></div>
            </div>
            <div onClick={() => setMyCoin("black")}
                className={"black " + (myCoin === "black" ? "selectedGreen" : "")}>
                <div className="blackCoin"></div>
            </div>
        </div>
        <button className="playButton" onClick={() => {
            props.setState((state: string[]) => {
                return [...state, "Searching"]
            })
        }}>Play</button>
        <button className="inviteLink">Invite Link</button>

    </div>
}
export function Searching(props: any) {
    let {
        timingOption, opponent, setTimingOption, optionDD, state, setState, setOptionDD, rated, setRated, setMyCoin, myCoin
    } = props;
    let nav = useNavigate();
    let ws = useSelector((state: any) => state.loginRed.ws);
    let uname = useSelector((state: any) => state.loginRed.uname);
    let dest = opponent;

    useEffect(() => {
        ping(nav, ws, uname, dest, timingOption, myCoin, rated, setState);
    })
    return <div className="searchingforplayer">
        <div className="searchingheader">
            <span className="loadsearching">Searching<span className="loadingdots"></span></span>
            <span className="newGameinsearch" onClick={() => {

                setState((state: string[]) => {
                    return [...state, "randomGame"];
                })
            }}><span className="plus"></span><span className="inlineblock">New Game</span></span>
        </div>
        <div className="waitingheader">
            <div className="waitingwrapper">
                <div className="profilepic"></div>
                <div className="timingoption">2|1</div>
                <div className="status">Waiting for Opponent <span className="loadingdots"></span></div>
                <br />
                <div className="cancel" onClick={() => {

                    setState((state: string[]) => {
                        return [...state, "randomGame"];
                    })
                }}>Cancel</div>
            </div>
        </div>

    </div>
}
export function PlayOptionsStateMachine() {
    let [state, setState] = useState(["Searching"]);
    let [opponent, setOpponent] = useState("");
    let curState = state[state.length - 1];
    let [timingOption, setTimingOption] = useState({ type: "Bullet", option: "1 min" });
    let [optionDD, setOptionDD] = useState(false);
    let [myCoin, setMyCoin] = useState("white");
    let nav = useNavigate();
    const [rated, setRated] = useState(true);
    let SubmitPlayRequestProps = {
        timingOption, setTimingOption, optionDD, setOptionDD, rated, setRated, setMyCoin, myCoin
    }

    let searchingProps = { SubmitPlayRequest, state, opponent, setState }
    console.log(" cur state ", curState, state)


    if ("randomGame" === curState) {

        let res = <RandomGame state={state} setState={setState} />
        return res;
    }
    else if ("friend" === curState) {
        return <FriendSelector setOpponent={setOpponent} state={state} setState={setState} />
    }
    else if ("SubmitPlayRequest" === curState) {
        return <SubmitPlayRequest opp={opponent} {...SubmitPlayRequestProps} state={state} setState={setState} />
    }
    else if ("Searching" === curState) {
        return <Searching  {...searchingProps} />
    }
    else if ("end" === curState) {
        // alert(" ending ")
        nav("inplay");
    }






}
let timingCategory: { [idx: string]: string[] } = {
    "Bullet": ["1 min", "1|1", "2|1"],
    "Blitz": ["3 min", "3|2", "5 min"],
    "Rapid": ["10 min", '15|10', "30 min"],
    "Daily": ["1 day", "3 days", "7 days"]
}
export function RandomGame(props: any) {
    console.log("states ", props);
    let [setOption, setStarted, setPlayState, option]: any[] = useOutletContext()
    let [innerState, setInnerState] = useState("startState");
    let [timingOption, setTimingOption] = useState({ type: "Bullet", option: "1 min" });
    let [optionDD, setOptionDD] = useState(false);
    let login = useSelector((state: any) => state.loginRed.login);
    return <>
        <div className="newGameEx" style={{ display: option === "newGame" ? "flex" : "none" }}>
            <button className="timeOption">
                <span></span>
                <h5>{timingOption.option}</h5>
                <span className="dropDown" onClick={() => setOptionDD((old) => !old)}></span>
            </button>
            <div className={"timingOptions " + (optionDD ? "" : "hidden")}>

                {
                    Object.keys(timingCategory).map((key) => {
                        let subOptions: string[] = timingCategory[key];
                        return <div className={"timingCat"}>
                            <div className="header"><span className={`${key}` + " catIcon"}></span><span className="cat">{`${key}`}</span></div>
                            <div className="suboptions">
                                {subOptions.map((suboption) => {
                                    return <div id={`${suboption}`} onClick={() => { setTimingOption({ type: key, option: suboption }) }} className={"suboptionitem " + (timingOption.option === suboption ? "selectedGreen" : "")}>{suboption}</div>
                                })
                                }

                            </div>

                        </div>
                    })}

            </div>
            <button className="playButton" id="randomPlay" onClick={(event: any) => start(login, event, setOption, setStarted, setPlayState)}>Play</button>
            <div className="custom">Custom</div>
            <div >
                <div className="TOPlayAFriend" onClick={() => props.setState((state: string[]) => { return [...state, "friend"]; })}>
                    <div className="TOIcon"></div>
                    <div>
                        <div className="TOTitle">Play a Friend</div>

                    </div>
                </div>
            </div>
            <div  >
                <div className="TOTournaments">
                    <div className="TOIcon"></div>
                    <div>
                        <div className="TOTitle">Tournaments</div>

                    </div>
                </div>
            </div>
        </div></>
}

function checkLogin(ev: Event, login: boolean, nav: any) {


    if (!login) nav("/login", { replace: true });
    ev.stopPropagation();
}
export function AtRest() {

    let login = useSelector((state: any) => state.loginRed.login);
    let nav = useNavigate();
    return <>

        <div className="atRest" onClick={(ev: any) => checkLogin(ev, login, nav)}>
            <div className="AtRestHeader" >
                <h2>Play Chess</h2>
                <div className="playIconSideBar"></div>
            </div>
            <div className="AtRestOptions">
                <Link to="online" className="playOnline">
                    <div id="playOnline" className="playOnline">
                        <div className="icon"></div>
                        <div>
                            <div className="title">Play Online</div>
                            <div className="subtitle">Play vs a person of similar skill</div>
                        </div>
                    </div>
                </Link>
                <Link to="">
                    <div className="computer">
                        <div className="icon"></div>
                        <div>
                            <div className="title">Computer</div>
                            <div className="subtitle">Challenge a bot from Rasy to Master</div>
                        </div>
                    </div>
                </Link>
                <Link to="">
                    <div className="playAFriend">
                        <div className="icon"></div>
                        <div>
                            <div className="title">Play a Friend</div>
                            <div className="subtitle">Invite a friend to a game of chess</div>
                        </div>
                    </div>
                </Link>
                <Link to="" >
                    <div className="tournaments">
                        <div className="icon"></div>
                        <div>
                            <div className="title">Tournaments</div>
                            <div className="subtitle">Join an Arena where anyone can win</div>
                        </div>
                    </div>
                </Link>
                <Link to="">
                    <div className="ChessVariants">
                        <div className="icon"></div>
                        <div>
                            <div className="title">Chess Variants</div>
                            <div className="subtitle">Find fun new wats to play chess</div>
                        </div>
                    </div>
                </Link>
            </div>

        </div>

    </>
}


export function FriendSelector(props: any) {

    let nav = useNavigate();
    let { opponent, setOpponent } = props;
    let ws = useSelector((state: any) => state.loginRed.ws)
    let uname = useSelector((state: any) => state.loginRed.uname)

    let [fname, setFName] = useState("");
    let [friendList, setFriendList] = useState([]);
    let [curFriends, setCurFriends] = useState([]);

    return <>


        <div className="friendSelector">
            <div className="friendLabel">
                <div className="TOIcon"></div>
                <h4>Play a Friend</h4>
            </div>
            <div className="searchInput">
                <label htmlFor="search" className="searchLabel"></label>
                <input type="text" value={fname} onChange={(event: any) => checkFriends(event, setFName, fname, setFriendList, ws)} name="suggest" className="search" placeholder="enter username or email id" />
            </div>

            <div className="listFriends" style={{ display: fname === "" ? "flex" : "none" }} >
                {/* <h3>Friends</h3> */}

                <div style={{ color: "grey" }}>Suggestions</div>
                {curFriends.map((friend) => {
                    return <div key={friend}>
                        {friend}

                    </div>
                })
                }


            </div>
            < div className="dropDownFList" style={{ display: fname !== "" ? "flex" : "none" }}>
                <div style={{ color: "grey" }}>Suggestions<span className="friendsListCount"> {friendList.length}</span></div>
                {friendList.map((friend) => {
                    return <div onClick={(event) => { setCurFriends(cur => [...cur, friend]); setOpponent(friend); props.setState((state: string[]) => [...state, "SubmitPlayRequest"]);/*ping(nav,ws,uname,friend);*/ setFName("") }} key="friend">
                        {friend}
                    </div>
                })
                }
            </div>
        </div>
    </>
}

function ping(nav: any, ws: WebSocket, uname: string, dest: string, timingOption: string, mycoin: string, rated: boolean, setState: any) {
    // alert("sending request to " + dest);

    let toBSent = JSON.stringify({
        "action": "matchManager",
        "type": "requestInit",
        "dest": dest,
        "src": uname,
        "myCoin": mycoin,
        "timingOption": timingOption,
        "rated": rated
    });
    // alert(toBSent);

    ws.send(toBSent)
    ws.addEventListener("message", (message) => {
        //   alert(message);
        //   console.log("message ",JSON.parse(message.data));
        if (JSON.parse(message.data)?.type === "requestAck") {

            setState((state: string[]) => [...state, "end"]);
        }
    })


}
function checkFriends(event: any, setFName: any, fname: any, setFriendList: any, ws: WebSocket) {



    setFName(event.target.value);
    let res = ["player2chess@gmail.com", "player3chess@gmail.com"]
    setFriendList(res);
    if (ws) {
        ws.send(JSON.stringify({ "action": "friendList", "startsWith": event.target.value }));
        setFriendList(["......loading"]);
        ws.addEventListener("message", function (message: any) {
            // alert(message);        
            console.log(" message : ", message);
            let friendList = JSON.parse(message.data).friendList;
            if (friendList) {
                console.log(" friendList: ", message);
                setFriendList(friendList.map((obj: any) => obj["emailId"]))
            }
            // let json=JSON.parse(message);
            // setFriendList(json.friendList);
        })
    }
    else {
        setFriendList(["...... selector not available. Kindly try again later or report the issue to the support team if reccurs"]);
    }

}