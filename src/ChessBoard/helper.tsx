import { initCoinPos } from "./types";
export function mouseOver(event:any){
}


export function mouseDown(event:any,drag:{[k:string]:any},position:initCoinPos){
    
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
        target.parentElement.removeEventListener("mouseup",mouseUp);
        target.removeEventListener("mousemove",moving);
    
        
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
            
            console.log("inital ",transform,yy,xx,"top ", top," left ",left,event.clientX,event.clientY);
            
        }

        
    }
    
    let target=event.target 
    

    console.log("!! target is ",target,event.currentTarget);
    let parent=target.parentElement;



    parent.addEventListener("mouseup",mouseUp)
    
    parent.addEventListener("mousemove",moving)

    
}


