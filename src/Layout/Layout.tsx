import React from "react"
import "./layout.scss";
import {LeftPane } from "../LeftPane/LeftPane"
import { props } from "../specs/types";
import {RightPane} from "../RightPane/RightPane";
import { Outlet } from "react-router-dom";
export function Layout(props:props){
   console.log(props.children)
    return <>
    <div id="layout" className="layout">
     <LeftPane />
     <Outlet />
    </div>
    </>
}
