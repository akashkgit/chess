import "./playArea.scss"
import React from "react"
import {ChessBoard} from "../ChessBoard/ChessBoard"
import {OppComp} from "../oppComp/OppComp"
import {PlayerComp} from "../PlayerComp/PlayerComp"
export function playArea(){
    return <div id="playArea" className="playArea">

    <OppComp />
    <ChessBoard />
    <OppComp />
    
    </div>
}