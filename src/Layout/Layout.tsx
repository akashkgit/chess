import React from "react"
import "./layout.scss";
import {LeftPane } from "../LeftPane/LeftPane"
import { props } from "../specs/types";
import {RightPane} from "../RightPane/RightPane";
import { Outlet, useNavigate } from "react-router-dom";
import {authUrl} from "../specs/config"

export function Layout(props:props){
    
    let nav=useNavigate();
   console.log(props.children)
    return <>
    <div id="layout" className="layout">
     <LeftPane />
     <Outlet />
    </div>
    </>
}
