import React, { useEffect, useLayoutEffect } from "react";
import {Link} from "react-router-dom"
import "./LeftPane.scss"
import { authUrl } from "../specs/config";
import * as dummy from "../test"
//alert(" from layout "+dummy.value);
//console.log();
export function LeftPane(){

    useLayoutEffect(()=>{


    },[])
    return <div id="LefPane" className="LeftPane">
        <div className="flex1" >
            <Link className="child1" to="/" ></Link>
            <Link  id="playIcon" className="leftPaneItem playIcon" to="/play"><span>Play</span></Link>
            <Link id="Puzzle"  className="leftPaneItem Puzzle" to="/Puzzles"><span>Puzzles</span></Link>
            <Link id="learn" className="leftPaneItem Learn" to="/Learn"><span>Learn</span></Link>
            <Link id="watch" className="leftPaneItem Watch" to="/Watch"><span>Watch</span></Link>
            <Link id="news" className="leftPaneItem News" to="/News"><span>News</span></Link>
            <Link id="social" className="leftPaneItem Social" to="/Social"><span>Social</span></Link>
            <Link id="more" className="leftPaneItem More" to="/More"><span>More</span></Link>
            <Link id="freetrial" className="leftPaneItem FreeTrial" to="/Free Trial"><span>Free Trial</span></Link>
            
            

        </div>
    </div>
}