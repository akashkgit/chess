import { Link, Outlet } from "react-router-dom";
import "./SideBar.scss"
import React from "react";
export function SideBar(){
    return <div id="SideBar" className="SideBar">
        {/* <AtPlay /> */}
        <Outlet />


   
    </div>
}

export function AtPlay(){
    return <>
    <div className="topSideBar ">
    <div className="play flexy"><span className="label1"></span></div>
    <div className="newGame flexy"><span className="label2"></span></div>
    <div className="games flexy"><span className="label3"></span></div>
    <div className="players flexy"><span className="label4"></span></div>
    </div>
    <div className="gamesDets"><span className="label5"></span></div>
    <div className="playerDets"><span className="label5"></span></div>
    </>
}

export function AtRest(){
    return <>
    
    <div className="atRest">
            <div className="AtRestHeader">
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