import {mapping} from "../specs/data"
import { initCoinPos } from "./types";

export function mouseOver(event:any){
}


export  let moveCoin=(event:any,state:{[k:string]:any},position:initCoinPos)=>{
    

    
    
    
        if(state.click===false){
            console.log(" clicking to true");
            
            state.click=true;
        
            state.el=event.target;
            event.stopPropagation();
            }
            else{
                
                state["dest"]=event.target;
                console.log("Dest",state["dest"]);
            }
       
       
        
        
    
    
   

        
}

export function putPiece(event:any,state:{[k:string]:any},position:initCoinPos){


function approximate(){


    let board=(document.querySelector("#chessBoard") as HTMLDivElement).getBoundingClientRect();
    let box=document.querySelector(".chessBox");
    let [top,left]=[event.clientY,event.clientX];

    let normalizedY=top-board.top;
    let normalizedX=left-board.left;
    let chessBoxW=box.getBoundingClientRect().width;
    let chessBoxH=box.getBoundingClientRect().height;
    
    
    let countY=Math.floor(normalizedY/chessBoxH)+1;
    let countX=Math.floor((normalizedX/chessBoxW))+1
   // console.log(Math.floor(normalizedY/chessBoxH)+1)//(box.getBoundingClientRect().width)!==0?Math.floor(countOfBoxesY)+1:countOfBoxesY)
    //console.log(Math.floor((normalizedX/chessBoxW))+1)//(box.getBoundingClientRect().width)!==0?Math.round(countOfBoxesX)+1:countOfBoxesX);

    let finalTop=board.top+ (countY-1)  *  chessBoxH;
    let finalLeft=board.left+ (countX-1) *  chessBoxW;

    let cur=position[state.el.id] ;
    let yy=(finalTop-cur.top);
    let xx=(finalLeft-cur.left);
    
    //console.log("target.style",target.style.border,target.style.transform,"top ",top," screenY",event.clientY,yy,xx);
    //target.style.border="2px solid yellow";
   state.el.style.transform= cur.transform+`translateY(${yy}px) translateX(${xx}px)`
   
   



}

if(state.click===true){


    if(!state.dest){
    console.log("need to be placed");

    approximate();


   Object.keys((keys:string)=>{
        let coin=document.querySelector(`#${keys}`);
        let {top,left,bottom,right,width,height}=coin.getBoundingClientRect();
        let elPos=(state.el as HTMLDivElement).getBoundingClientRect();


        if(elPos.top>=top && elPos.bottom<=bottom && elPos.right<=right && elPos.left>=left)
        alert("over an element");
         
        

   })
   state.click=false;
}
else{
    let element=state.el as HTMLDivElement;
    let dest=state.dest as HTMLDivElement;
    console.log(dest.classList.toString().split(" "))
    dest.classList.remove(...dest.classList.toString().split(" "))
    dest.classList.add(...element.classList.toString().split(" "));
    //let cb=document.querySelector("#chessBoard")
    

    element.classList.remove(element.classList.toString().split(" ")[2])
    
    console.log("bimage",element.style.backgroundImage);
    state.click=false;
}




}
}

export function mouseDown(event:any,drag:{[k:string]:any},position:initCoinPos){
    event.preventDefault();
  
    

    console.log(event.detail,"is the count")
   
    drag.dragging=true;
   console.log("mousedown");
    let style=false;
    
    function mouseUp(event:any){
        event.preventDefault();
        event.stopPropagation();
        event.cancelBubble=true;
        event.returnValue=false
        drag.dragging=false;
       alert("mouseup")
//
        let board=(document.querySelector("#chessBoard") as HTMLDivElement).getBoundingClientRect();
        let box=document.querySelector(".chessBox");
        let {top,left}=target.getBoundingClientRect();

        let normalizedY=top-board.top;
        let normalizedX=left-board.left;
        let chessBoxW=box.getBoundingClientRect().width;
        let chessBoxH=box.getBoundingClientRect().height;
        
        
        let countY=Math.floor(normalizedY/chessBoxH)+1;
        let countX=Math.floor((normalizedX/chessBoxW))+1
       // console.log(Math.floor(normalizedY/chessBoxH)+1)//(box.getBoundingClientRect().width)!==0?Math.floor(countOfBoxesY)+1:countOfBoxesY)
        //console.log(Math.floor((normalizedX/chessBoxW))+1)//(box.getBoundingClientRect().width)!==0?Math.round(countOfBoxesX)+1:countOfBoxesX);

        let finalTop=board.top+ (countY-1)  *  chessBoxH;
        let finalLeft=board.left+ (countX-1) *  chessBoxW;

        let cur=position[target.id] ;
        let yy=(finalTop-cur.top);
        let xx=(finalLeft-cur.left);
        
        //console.log("target.style",target.style.border,target.style.transform,"top ",top," screenY",event.clientY,yy,xx);
        //target.style.border="2px solid yellow";
       target.style.transform= cur.transform+`translateY(${yy}px) translateX(${xx}px)`
       
       
       
      // console.log("DROPPED inital ",cur.transform,target.style.transform,yy,xx,"top ", cur.top," left ",cur.left,finalTop,finalLeft,chessBoxH,chessBoxW)


        
        
        target.parentElement.removeEventListener("mouseup",mouseUp);
        target.parentElement.removeEventListener("mousemove",moving);
    
        
    }

   
    let  moving=function (event:any){
        
        event.preventDefault();
        event.stopPropagation();
        event.cancelBubble=true;
        event.returnValue=false;
        
        
        if(drag.dragging){
           console.log("moving...");
            let {top,left,x,y,transform}=position[target.id] ;
             let yy=(event.clientY-top);
             let xx=(event.clientX-left);
             
             //console.log("target.style",target.style.border,target.style.transform,"top ",top," screenY",event.clientY,yy,xx);
             //target.style.border="2px solid yellow";
            target.style.transform= transform+`translateY(${yy}px) translateX(${xx}px)`
            
          //  console.log("inital ",transform,yy,xx,"top ", top," left ",left,event.clientX,event.clientY);
            
        }

        
    }
    
    let target=event.target as HTMLDivElement
    console.log("mousedown");
   // console.log("!! target is ",target,event.currentTarget);
    let parent=target.parentElement;



    parent.addEventListener("mouseup",mouseUp)
    
    parent.addEventListener("mousemove",moving)
    

    
}


