import React, { useEffect, useRef, useState } from "react";

import "./Clock.css";
import { useDispatch, useSelector } from "react-redux";
import { endGame, setWin,reset as Reset} from "../reduxFiles/configs";

export function Clock(props:any) {
    //let start=false;
    let timingOption = useSelector((state:any)=>state.gameSession.timingOption);
    let uname=props.uname;
    let actualUName = useSelector((state:any)=>state.loginRed.uname);
    let start = useSelector((state:any)=>state.game.start);
    let opp = useSelector((state:any)=>state.game.opp);
    let ws = useSelector((state:any)=>state.loginRed.ws);
    // console.log(" MY TURN ",props.tick)
    let [minute, setMinute] = useState("00")
    let [second, setSecond] = useState("00")
    let disp = useDispatch();
    let intervalId = useRef<NodeJS.Timeout>(null);
    
    // useEffect(()=>{
    //     if(reset){
            
    //         clearInterval(intervalId)
    //     }
    // },[reset])
    
    useEffect(()=>{
            console.log(" changing clock time ",timingOption, timingOption.option);
            if(timingOption.option){
            let [count,unit]=timingOption.option.split(" ");
            if("min" === unit){
                // console.log("changing time");
                if(0 === Number(count)/10)setMinute("0"+count);
                else setMinute(count);
                setSecond("00");
            }
            }

    },[timingOption])
    
    useEffect(()=>{
        console.log("gameover","00" === minute && "00"=== second && start, minute, second, start)
            
            if(0 === Number(minute) && 0 === Number(second) && start && uname === actualUName){
                    disp(endGame(true));
                    disp(setWin(opp));
                    alert(opp+" wins ");

                    ws.send(JSON.stringify({action:"matchManager","winner":opp,"type":"timeout","dest":opp,"src":actualUName}))
                    disp(Reset(true));
            }
            else if(0 === Number(minute) && 0 === Number(second) && start){
                console.log("timeout 0 0 ",intervalId.current);
                clearInterval(intervalId.current);
            }
            
    },[second])

    useEffect(() => {

        
        let id:NodeJS.Timeout;
        
        if(true === props.tick){
        id =setInterval(() => {
            
            setSecond((second: string) => {

                
                if (Number(second) - 1 < 0) setMinute((min) => String(Number(min) - 1))
                let newVal: number | String = Number(second) - 1 < 0 ? 59 : Number(second) - 1;

                newVal = newVal < 10 ? "0" + newVal : newVal;
                // console.log(newVal)



                let prevDeg = window.getComputedStyle(document.querySelector(`#${props.clockId} line`)).rotate;
                let newDeg = (Number(prevDeg.split("deg")[0]) + 90) % 360;
                (document.querySelector(`#${props.clockId} line`) as HTMLElement).style.rotate = newDeg + "deg";
                // console.log("deg :", newDeg)



                return String(newVal)

            });

        }, 1000)
        intervalId.current=id;

        return ()=>{
            // console.log(" clearning interval....\n");
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