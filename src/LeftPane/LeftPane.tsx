import React from "react";
import {Link} from "react-router-dom"
import "./LeftPane.scss"
export function LeftPane(){
    return <div id="LefPane" className="LeftPane">
        <div className="flex1" >
            <Link className="child1" to="/" ></Link>
            

        </div>
    </div>
}