import {mapping} from "../specs/data"
import { initCoinPos } from "./types";
import {handlerMapping} from "./handlers";
import { switchTurn } from "../reduxFiles/configs";
import {handlerCheckMateMapping} from "./checkMateHandler";
import {handlerKingMapping} from "./kingHandler"



export function mouseOver(event:any){
}


export function isAttacked(mycoin:string,byPass:HTMLDivElement){
    let oppCoin=mycoin==="white"?"black":"white";
    let myCoins=Object.keys(mapping[mycoin])
    let myCoinMap=mapping[mycoin];
    let kingCoin=oppCoin.split("")[0]+"k";
    console.log(" king coin is ",`div[data-coin="${kingCoin}"]`," and bypass",byPass)
    let state:{[k:string]:any}={
        
        
    dest:document.querySelector(`div[data-coin="${kingCoin}"]`)
        
     }
     let out=Array.from(document.querySelectorAll(`div[data-mycoin="${mycoin}"]`)).filter((val:HTMLDivElement)=>{
let coin=val.dataset.coin;
return coin.split("")[0]===mycoin.split("")[0]
     })
     console.log("---->",out)
    for(let c=0;c<out.length;c++){
        console.log(myCoinMap[myCoins[c]].split("")[0]!==mycoin.split("")[0]);
        
        state.el= out[c]
       console.log("\t-====>",state.el," passing bypass") 
        let {top,left,right,bottom,width,height}=state.el.getBoundingClientRect();
    let res=handlerMapping[state.el.dataset.coin.split("")[1]](state,undefined,mycoin,true,true,false,true)
        if(res[0])return false;
        
    }
    return true;

}



export function isAllowed(mycoin:string,byPass:HTMLDivElement){
    let oppCoin=mycoin==="white"?"black":"white";
    let oppCoins=Object.keys(mapping[oppCoin])
    let oppCoinMap=mapping[oppCoin];
    let kingCoin=mycoin.split("")[0]+"k";
    console.log(" king coin is ",`div[data-coin="${kingCoin}"]`," and bypass",byPass)
    let state:{[k:string]:any}={
        
        
    dest:document.querySelector(`div[data-coin="${kingCoin}"]`)
        
     }
     let out=Array.from(document.querySelectorAll(`div[data-mycoin="${mycoin}"]`)).filter((val:HTMLDivElement)=>{
let coin=val.dataset.coin;
return coin.split("")[0]===oppCoin.split("")[0]
     })
     console.log("---->",out)
    for(let c=0;c<out.length;c++){
        console.log(oppCoinMap[oppCoins[c]].split("")[0]!==oppCoin.split("")[0]);
        
        state.el= out[c]
       console.log("\t-====>",state.el," passing bypass") 
        let {top,left,right,bottom,width,height}=state.el.getBoundingClientRect();
        let res= handlerKingMapping[state.el.dataset.coin.split("")[1]](state,undefined,undefined,mycoin,true,byPass)
        console.log("(((((( ",state.el.id,res,")))))))))))");
        if(!res[0]){
            console.log("(((((( ---->",state.el.id,res,"<--------)))))))))))");
            return res[0];
        }
        
    }
    return true;

}



export function isCheckMate(mycoin:string,byPass:HTMLDivElement){
    let oppCoin=mycoin==="white"?"black":"white";
    let oppCoins=Object.keys(mapping[oppCoin])
    let oppCoinMap=mapping[oppCoin];
    let kingCoin=mycoin.split("")[0]+"k";
    console.log(" king coin is ",`div[data-coin="${kingCoin}"]`," and bypass",byPass)
    let state:{[k:string]:any}={
        
        
    dest:document.querySelector(`div[data-coin="${kingCoin}"]`)
        
     }
     let out=Array.from(document.querySelectorAll(`div[data-mycoin="${mycoin}"]`)).filter((val:HTMLDivElement)=>{
let coin=val.dataset.coin;
return coin.split("")[0]===oppCoin.split("")[0]
     })
     console.log("---->",out)
    for(let c=0;c<out.length;c++){
        console.log(oppCoinMap[oppCoins[c]].split("")[0]!==oppCoin.split("")[0]);
        
        state.el= out[c]
       console.log("\t-====>",state.el," passing bypass") 
        let {top,left,right,bottom,width,height}=state.el.getBoundingClientRect();
        let res= handlerCheckMateMapping[state.el.dataset.coin.split("")[1]](state,undefined,undefined,mycoin,true,byPass)
        console.log("(((((( ",state.el.id,res,")))))))))))");
        if(!res[0]){
            console.log("(((((( ---->",state.el.id,res,"<--------)))))))))))");
            return res[0];
        }
        
    }
    return true;

}


export function isChecked(mycoin:string,byPass:HTMLDivElement){
    let oppCoin=mycoin==="white"?"black":"white";
    let myCoins=Object.keys(mapping[mycoin])
    let myCoinMap=mapping[mycoin];
    let kingCoin=oppCoin.split("")[0]+"k";
    console.log(" king coin is ",`div[data-coin="${kingCoin}"]`," and bypass",byPass)
    let state:{[k:string]:any}={
        
        
    dest:document.querySelector(`div[data-coin="${kingCoin}"]`)
        
     }
     let out=Array.from(document.querySelectorAll(`div[data-mycoin="${mycoin}"]`)).filter((val:HTMLDivElement)=>{
let coin=val.dataset.coin;
return coin.split("")[0]===mycoin.split("")[0]
     })
     console.log("---->",out)
    for(let c=0;c<out.length;c++){
        console.log(myCoinMap[myCoins[c]].split("")[0]!==mycoin.split("")[0]);
        
        state.el= out[c]
       console.log("\t-====>",state.el," passing bypass") 
        let {top,left,right,bottom,width,height}=state.el.getBoundingClientRect();
        let res= handlerKingMapping[state.el.dataset.coin.split("")[1]](state,undefined,undefined,mycoin,true,byPass)
        console.log("|||||| ",state.el.id,res,"|||||||");
        if(!res[0]){
            console.log("|||| ---->",state.el.id,res,"<--------|||||||");
            return res[0];
        }
        
    }
    return true;

}



 export  let moveCoin=(event:any,state:{[k:string]:any},position:initCoinPos,myCoin:string)=>{
    

    
    
   // console.log(" CLick event stats ",event.target.dataset.mycoin===myCoin,myCoin,event.target.dataset.mycoin)
        if(state.click===false ){
           
           if(event.target.dataset.mycoin===myCoin){
            
            
            
            
        
            state.el=event.target;
            
            console.log(" clicking to true");
            state.click=true;
            event.stopPropagation();
           }
            }
            else{

                
                state["dest"]=event.target;
                console.log("Dest",state["dest"]);
            }
       
       
        
        
    
    
   

        
}

function checkIfPossible(futurePos:String, coin:HTMLDivElement){

    let coinName=coin.dataset.coin;
    let coinBox=coin.getBoundingClientRect();

   




}


export function putPiece(event:any,state:{[k:string]:any},position:initCoinPos,myCoin:string,disp:any,wsock:WebSocket,uname:any,opp:any){
//alert(" putting piece ");
if(state.click===true){

    let origin:HTMLDivElement=state.el;
    let {top,left,right,bottom,width,height}=origin.getBoundingClientRect();
    let details=origin.dataset.coin.split("");
  // console.log("calling",details[1]);
    let switching=handlerMapping[details[1]](state,position,event,myCoin)
    let check=!isChecked(myCoin,undefined);
    let cMate=false;
    


    if(switching[0]){
   // console.log("!!switching"+switching)
    // freeze the clock
    // switch
    disp(switchTurn());
    let dataSend=JSON.stringify({action:"matchManager","type":"play","coinMoved":{coin:{"type":details[1],"boxId":origin.dataset.pos},"Pos":[switching[1],switching[2]],"kill":{"kill":switching[3],dataPos:switching[4]},"check":check},"dest":opp,"src":uname})
    if(check)alert(" Check ");

    wsock.send(dataSend)




    }
    //console.log(" to ",top)
   
    state.click=false;
}
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
    
   let futurePos=cur.transform+`translateY(${yy}px) translateX(${xx}px)`
   state.el.style.transform= futurePos;

   checkIfPossible(futurePos,state.el);
   
   



}


//state.click===true
if(false){


    if(!state.dest){
    console.log("need to be placed");

    approximate();


   Object.keys(mapping).forEach((keys:string)=>{
        let coin=document.querySelector(`[data-pos="${keys}"]`);
        let {top,left,bottom,right,width,height}=coin.getBoundingClientRect();
        let elPos=(state.el as HTMLDivElement).getBoundingClientRect();

        
        if(elPos.top>=top && elPos.bottom<=bottom && elPos.right<=right && elPos.left>=left && coin.id!==state.el.id )
        console.log("overlapping or not ",elPos.left,elPos.right,left,right,keys,state.el.id);
         
        

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
    
   Object.keys((keys:string)=>{
    let coin=document.querySelector(`#${keys}`);
    let {top,left,bottom,right,width,height}=coin.getBoundingClientRect();
    let elPos=(state.el as HTMLDivElement).getBoundingClientRect();

    console.log(elPos,top,left,bottom,right);
    if(elPos.top>=top && elPos.bottom<=bottom && elPos.right<=right && elPos.left>=left)
    alert("over an element");
     
    

})
    state.click=false;
}




}
}

export function mouseDown(event:any,drag:{[k:string]:any},position:initCoinPos){
    event.preventDefault();
  
    

   // console.log(event.detail,"is the count")
   
    drag.dragging=true;
   //console.log("mousedown");
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
    //console.log("mousedown");
   // console.log("!! target is ",target,event.currentTarget);
    let parent=target.parentElement;



    parent.addEventListener("mouseup",mouseUp)
    
    parent.addEventListener("mousemove",moving)
    

    
}


