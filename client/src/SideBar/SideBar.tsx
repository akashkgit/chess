import { Link, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import "./SideBar.css"
import React, { useContext, useState } from "react";
import { PlayCntxt } from "../RightPane/RightPane";
import { useSelector } from "react-redux";
export function SideBar(){
    let {playstate,setPlaystate}=useContext(PlayCntxt);
    
    return <div id="SideBar" className="SideBar">
        {/* <AtPlay /> */}
        <Outlet />


   
    </div>
}

function start(login:boolean,event:any,setOption:any,setStarted:any,setPlayState:any){
    
    
    setPlayState((state:any)=>{return {...state,started:true}})
    
    setOption("inGame");
    setStarted(true);
    let myCoin="white"//api call
    

}
export function StartPlay(){
    const [started,setStarted]=useState(false);
    const [option,setOption]=useState("newGame");
    
    let {playState,setPlayState}=useContext(PlayCntxt);
    let nav=useNavigate();
    return <>
    <div className="topSideBar ">
    <div className="play flexy" style={{display:started?"flex":"none",backgroundColor:option==='inGame'?"rgba(65,64,62,1)":""}}><span className="label1"></span></div>
    <div className="newGame flexy" style={{backgroundColor:option==='newGame'?"rgba(65,64,62,1)":""}}><span className="label2"></span></div>
    <div className="games flexy"><span className="label3"></span></div>
    <div className="players flexy"><span className="label4"></span></div>
    </div>
    <div className="optionExpander">
    <Outlet context={[setOption,setStarted,setPlayState,option]}/>
    

        
       
      



    </div>
    
    </>

}
export function RandomGame(){
    let [setOption,setStarted,setPlayState,option]:any[]= useOutletContext()
    let login=useSelector((state:any)=>state.loginRed.login);
    return <>
    <div className="newGameEx" style={{display:option==="newGame"?"flex":"none"}}>
     <button className="timeOption">
            <span></span>
            <h5>10 min</h5>
        </button>
        <button className="playButton" id="randomPlay" onClick={(event:any)=>start(login,event,setOption,setStarted,setPlayState)}>Play</button>
       <div className="custom">Custom</div>
       <Link to="friend">
                <div className="TOPlayAFriend">
                <div  className="TOIcon"></div>
                    <div>
                    <div className="TOTitle">Play a Friend</div>
                      
                    </div>
                </div>
                </Link>
                <Link to="" >
                <div className="TOTournaments">
                <div  className="TOIcon"></div>
                    <div>
                    <div className="TOTitle">Tournaments</div>
                       
                    </div>
                </div>
                </Link>
        </div></>
}

function checkLogin(ev:Event,login:boolean,nav:any){
    
    
    if(!login)nav("/login",{replace:true});
    ev.stopPropagation();
}
export function AtRest(){
    
    let login=useSelector((state:any)=>state.loginRed.login);    
    let nav= useNavigate();
    return <>
    
    <div className="atRest" onClick={(ev:any)=> checkLogin(ev,login,nav) }>
            <div className="AtRestHeader" >
                <h2>Play Chess</h2>
                <div className="playIconSideBar"></div>
            </div>
            <div className="AtRestOptions">
                <Link to="online" >
                <div id="playOnline" className="playOnline">
                    <div  className="icon"></div>
                    <div>
                        <div className="title">Play Online</div>
                        <div className="subtitle">Play vs a person of similar skill</div>
                    </div>
                </div>
                </Link>
                <Link to="">
                <div className="computer">
                <div  className="icon"></div>
                    <div>
                    <div className="title">Computer</div>
                        <div className="subtitle">Challenge a bot from Rasy to Master</div>
                    </div>
                </div>
                </Link>
                <Link to="">
                <div className="playAFriend">
                <div  className="icon"></div>
                    <div>
                    <div className="title">Play a Friend</div>
                        <div className="subtitle">Invite a friend to a game of chess</div>
                    </div>
                </div>
                </Link>
                <Link to="" >
                <div className="tournaments">
                <div  className="icon"></div>
                    <div>
                    <div className="title">Tournaments</div>
                        <div className="subtitle">Join an Arena where anyone can win</div>
                    </div>
                </div>
                </Link>
                <Link to="">
                <div className="ChessVariants">
                <div  className="icon"></div>
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


export function FriendSelector(){

    let nav=useNavigate();        
    let ws=useSelector((state:any)=>state.loginRed.ws)
    let uname=useSelector((state:any)=>state.loginRed.uname)
    
    let [fname,setFName]=useState("");
            let [friendList,setFriendList]=useState([]);
            let [curFriends,setCurFriends]=useState(["rerr234@gmail.com","bobchess898@gmail.com","kinder87@gmail.com","lomyom2@gmail.com"]);
        return <>


    <div className="friendSelector">
        <div className="friendLabel">
            <div className="TOIcon"></div>
            <h4>Play a Friend</h4>
        </div>
        <div className="searchInput">
            <label htmlFor="search" className="searchLabel"></label>
        <input type="text" value={fname} onChange={(event:any)=>checkFriends(event,setFName,fname,setFriendList)} name="search" className="search" placeholder="enter username or email id"/>
        </div>
        
        <div className="listFriends"style={{display:fname===""?"flex":"none"}} >
            <h3>Friends</h3>
        
            <div style={{color:"grey"}}>Suggestions</div>
            {curFriends.map((friend)=>{
                return <div  key={friend}>
                     {friend}

                </div>
            })
        }
        
        
        </div>
       < div   className="dropDownFList" style={{display:fname!==""?"flex":"none"}}>
        <div style={{color:"grey"}}>Suggestions</div>
            {friendList.map((friend)=>{
                return <div  onClick={(event)=>{setCurFriends(cur=>[...cur,friend]);ping(nav,ws,uname); setFName("")}} key="friend">
                     {friend}

                </div>
            })
        }
        </div>
    </div>
    </>
}

function ping(nav:any,ws:any,uname:string){

    let toBSent=JSON.stringify({
        "action":"matchManager",
        "type": "requestInit",
        "dest": "player2chess@gmail.com",
        "src":uname
      });
   // alert(toBSent);
    
    ws.send(toBSent)
    
}
function checkFriends(event:any,setFName:any,fname:any,setFriendList:any){


    setFName(event.target.value);
    let res=["player2chess@gmail.com","player3chess@gmail.com"]
    setFriendList(res);
    
    
}