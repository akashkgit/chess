import React, { useEffect, useState } from "react";

import "./Clock.css";
import { useSelector } from "react-redux";

export function Clock(props:any) {
    //let start=false;

    console.log(" MY TURN ",props.tick)
    let [minute, setMinute] = useState("10")
    let [second, setSecond] = useState("00")
    useEffect(() => {

        
        let id:NodeJS.Timeout
        
        if(true === props.tick){
        id =setInterval(() => {
            
            setSecond((second: string) => {
                if ("01" === second) setMinute((min) => String(Number(min) - 1))
                let newVal: number | String = Number(second) - 1 < 0 ? 59 : Number(second) - 1;

                newVal = newVal < 10 ? "0" + newVal : newVal;
                console.log(newVal)



                let prevDeg = window.getComputedStyle(document.querySelector(`#${props.clockId} line`)).rotate;
                let newDeg = (Number(prevDeg.split("deg")[0]) + 90) % 360;
                (document.querySelector(`#${props.clockId} line`) as HTMLElement).style.rotate = newDeg + "deg";
                console.log("deg :", newDeg)



                return String(newVal)
            });

        }, 1000)
        return ()=>{
            console.log(" clearning interval....\n");
            clearInterval(id);
        }
        // return ()=>{
        //     clearInterval(id);
        // }
    }

    }, [props.tick])
    return <>
        <div className="clockContainer" id={props.clockId}>
            <svg width="107" className={"clockSVG"}height="96" viewBox="0 0 107 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Frame 1">
                    <g clip-path="url(#clip0_1_2)">
                        <path id="Ellipse 1" d="M105 48C105 73.2066 82.1522 94 53.5 94C24.8478 94 2 73.2066 2 48C2 22.7934 24.8478 2 53.5 2C82.1522 2 105 22.7934 105 48Z" stroke="white" stroke-width="4" />
                        <line id="Line 1" x1="53" y1="46" x2="98" y2="46" stroke="#FAFAFA" stroke-width="4" />
                    </g>
                </g>
                <defs>
                    <clipPath id="clip0_1_2">
                        <rect width="107" height="96" fill="white" />
                    </clipPath>
                </defs>
            </svg>

            <span>{minute}:{second}</span>
        </div>

    </>
}