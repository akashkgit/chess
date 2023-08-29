import { initCoinPos } from "./types";

function pawn(state:{[k:string]:any},position:initCoinPos,event:any){
    let origin:HTMLDivElement=state.el;
    let {top,left,right,bottom,width,height}=origin.getBoundingClientRect();
    
    let iTop=top,iBottom=bottom;
    for(let i=1;i<=2;i++){
        let nTop=top-height;
        let nBottom=top;

        if(event.clientY>=nTop && event.clientY <= nBottom && event.clientX >=left && event.clientX<=right ){
            

            console.log(" element from point ",document.elementFromPoint((nTop+nBottom)/2,(left+right)/2));
            
            let futurePos=position[state.el.id].transform+`translateY(${nTop-position[state.el.id].top}px) translateX(${0}px)`
            
            
            state.el.style.transform= futurePos;
            console.log(" translating Y by ",nTop-iTop);
            console.log(" clientX ",event.clientX,left,right,event.clientX >=left,event.clientX <=right)
            console.log("possible",event.clientX,event.clientY,nTop,nBottom,state.el.style.transform);
            

        }
        top=nTop;
        bottom=nBottom;
    }

    // checking for possible vetu
  
    let killTop=iTop-height;
    let killBottom=iTop;
    let killLeft=left+width;
    let killRight=killLeft+width;
    let cdiv=document.createElement("div")
    cdiv.style.position="absolute";
    cdiv.style.top=killTop+"px";
    cdiv.style.left=killLeft+"px";
    cdiv.style.width=width+"px";
    cdiv.style.height=height+"px";
    cdiv.style.backgroundColor="white";
    //document.body.appendChild(cdiv)

    let cb=document.querySelector("#chessBoard") as HTMLDivElement

    let refDest=document.elementFromPoint(((height)/2)+killLeft,(width)/2 + killTop);
    console.log(" checking to kill @",(killBottom-killTop)/2 + killTop,((-killLeft+killRight)/2)+killLeft,iTop,bottom,left,right,killLeft,killRight);
    console.log("width ",width,height)
    cdiv=document.createElement("div")
    cdiv.style.position="absolute";
    cdiv.style.top=((killBottom-killTop)/2 + killTop)+"px";
    cdiv.style.left=(((-killLeft+killRight)/2)+killLeft)+"px";
    cdiv.style.width=width+"px";
    cdiv.style.height=height+"px";
    cdiv.style.backgroundColor="gold";
    //document.body.appendChild(cdiv)

    
    console.log("Refdest ",refDest,state.dest);

    if(state.dest!==undefined && refDest.id===state.dest.id){
        let futurePos=position[state.el.id].transform+`translateY(${killTop-position[state.el.id].top}px) translateX(${killLeft-position[state.el.id].left}px)`
            
            
        state.el.style.transform= futurePos;

        console.log("removing element");
         document.querySelector("#chessBoard").removeChild(state.dest);
   
        


    }


}
function rook(){
    
}
function queen(){


}

function bishop(){

}
function horse(){


}
function king(){

}

export  let handlerMapping:{[k:string]:any}={
     'p':pawn,
     'q':queen,
     'b':bishop,
     'h':horse,
     'r':rook,
     'k':king
}


