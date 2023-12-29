import { mapping } from "../specs/data";
import { initCoinPos } from "./types";

function king(state: { [k: string]: any }, position: initCoinPos, event: any,myCoin:string,dryRun:boolean,byPass?:HTMLDivElement) {
    //console.log(" king ")
    let origin = state.el as HTMLDivElement;
    let success=true;
    let { top, left, bottom, width, height,right } = origin.getBoundingClientRect();
    let tempX:number,tempY:number;
    let cBox=document.querySelector("#chessBoard").getBoundingClientRect();
    
let res=  check(top-height, left, state, position, event, width, height, top, left, 0, -1 ,false,myCoin,dryRun,byPass)
if(res[0])return [false]
     res=check(top+height, left, state, position, event, width, height, top, left, 0, 1 ,false,myCoin,dryRun,byPass)
     if(res[0])return [false]


     res=check(top, left-width, state, position, event, width, height, top, left, -1, 0 ,false,myCoin,dryRun,byPass)
     if(res[0])return [false]

    
     res=check(top, left+width, state, position, event, width, height, top, left, 1, 0 ,false,myCoin,dryRun,byPass)
     if(res[0])return [false]
    
    return [true];

}

function queen(state: { [k: string]: any }, position: initCoinPos, event: any,myCoin:string,dryRun:boolean,byPass?:HTMLDivElement) {

    //console.log(" queen ")
    let res:any=rook(state,position,event,myCoin,dryRun,byPass)
    console.log("ROOOOOK ",res)
    if(!res[0])return [false];
    res=bishop(state,position,event,myCoin,dryRun,byPass);
    console.log("BISHOP ",res)
    return [res[0]]

}



function bishop(state: { [k: string]: any }, position: initCoinPos, event: any,myCoin:string,dryRun:boolean,byPass?:HTMLDivElement) {
    //console.log(" bishop ")
    let origin = state.el as HTMLDivElement;
    let success=true;
    let { top, left, bottom, width, height,right } = origin.getBoundingClientRect();
    let tempX:number,tempY:number;
    let cBox=document.querySelector("#chessBoard").getBoundingClientRect();
    //console.log(event.clientX>=right , event.clientY<=top);
    
        let i=1;
        tempX=left+width;
        tempY=top-height;
        //console.log("diagnol ",tempX,cBox.right , tempY,cBox.top)
        console.log("c1")
            while(tempX<=cBox.right && tempY>=cBox.top){
                //console.log("traversing")
                let res= check(tempY, tempX, state, position, event, width, height, top, left, i, -i ,false,myCoin,dryRun,byPass)
               if(res[0]){return [false]}
              else  if(res[2]==="interrupted")break;
                tempX=tempX+width;
                tempY=tempY-height;
                i++;
            }
        
    
    
         i=1;
        tempX=left-width;
        tempY=top-height;
        console.log("c2")
        //console.log("diagnol ",tempX,cBox.right , tempY,cBox.top)
            while(tempX>=cBox.left && tempY>=cBox.top){
                //console.log("traversing")
                let res=check(tempY, tempX, state, position, event, width, height, top, left, -i, -i ,false,myCoin,dryRun,byPass)
               
               if(res[0]){return [false]}
               else if (res[2]==="interrupted")break;
                tempX=tempX-width;
                tempY=tempY-height;
                i++;
            }
        
    
   
         i=1;
        tempX=left+width;
        tempY=top+height;
        console.log("c3")
        //console.log("diagnol ",tempX,cBox.right , tempY,cBox.top)
            while(tempX<=cBox.right && tempY>=cBox.top){
                //console.log("traversing")
                let res=check(tempY, tempX, state, position, event, width, height, top, left, i, i ,false,myCoin,dryRun,byPass)
                if(res[0] ){return [false]}
                else if (res[2]==="interrupted")break;
                tempX=tempX+width;
                tempY=tempY+height;
                i++;
            }
        
    
   
    i=1;
        tempX=left-width;
        console.log("c4")
        tempY=top+height;
        //console.log("diagnol ",tempX,cBox.right , tempY,cBox.top)
            while(tempX>=cBox.left && tempY>=cBox.top){
                //console.log("traversing")
               let res=check(tempY, tempX, state, position, event, width, height, top, left, -i, i ,false,myCoin,dryRun,byPass);
                
               if(res[0] ){return [false]}
               else if (res[2]==="interrupted")break; 
               tempX=tempX-width;
                tempY=tempY+height;
                i++;
            }
        
    
    return [success];
    
}

function horse(state: { [k: string]: any }, position: initCoinPos, event: any,myCoin:string,dryRun:boolean,byPass?:HTMLDivElement) {
    let origin = state.el as HTMLDivElement;
    let { top, left, bottom, width, height,right } = origin.getBoundingClientRect();
    
    let cBox=document.querySelector("#chessBoard").getBoundingClientRect();
    console.log("cBox ",cBox)
    let res=check(top-height, left+ 2 * width, state, position, event, width, height, top, left, 2, -1 ,false,myCoin,dryRun,byPass)
    if(res[0]){return [false,2,-1,res[1],res[2]]}
    res=check(top-2 * height, left+ 1 * width, state, position, event, width, height, top, left, 1, -2 ,false,myCoin,dryRun,byPass)
    if(res[0]){return [false,1,-2,res[1],res[2]]}
    res=check(top-height, left- 2 * width, state, position, event, width, height, top, left, -2, -1 ,false,myCoin,dryRun,byPass)
    if(res[0]){return [false,-2,-1,res[1],res[2]]}
    res=check(top-2 * height, left- 1 * width, state, position, event, width, height, top, left, -1, -2 ,false,myCoin,dryRun,byPass)
    if(res[0]){return [false,-1,-2,res[1],res[2]]}
    res=check(top+height, left+ 2 * width, state, position, event, width, height, top, left, 2, 1 ,false,myCoin,dryRun,byPass)
    if(res[0]){return [false,2,1,res[1],res[2]]}
    res=check(top+2 * height, left+ 1 * width, state, position, event, width, height, top, left, 1, 2 ,false,myCoin,dryRun,byPass)
    if(res[0]){return [false,1,2,res[1],res[2]]}
    res=check(top+height, left- 2 * width, state, position, event, width, height, top, left, -2, 1 ,false,myCoin,dryRun,byPass)
    if(res[0]){return [false,-2,1,res[1],res[2]]}
    res=check(top+2 * height, left- 1 * width, state, position, event, width, height, top, left, -1, 2 ,false,myCoin,dryRun,byPass)
    if(res[0]){return [false,-1,2,res[1],res[2]]}
    else return [true]



}


function rook(state: { [k: string]: any }, position: initCoinPos, event: any,myCoin:string,dryRun:boolean,byPass?:HTMLDivElement) {
    let origin = state.el as HTMLDivElement;
    let { top, left, bottom, width, height,right } = origin.getBoundingClientRect();
    let temp:number;
    let cBox=document.querySelector("#chessBoard").getBoundingClientRect();
    let success=true;
    
    temp=top;
    let i=0;
    console.log("ROOOK 1")
    while(temp>=cBox.top && temp<=cBox.bottom ){

        let res=check(temp, left, state, position, event, width, height, top, left, 0, -1 * i,false,myCoin,dryRun,byPass);
       
       if(res[0]){return [false]}
       else if (res[2]==="interrupted")break; 
        i++;
        temp=temp-height;
    }


    temp=bottom;
     i=1;
     console.log("ROOOK 2")
    while(temp>=cBox.top&& temp<=cBox.bottom){

        let res=check(temp, left, state, position, event, width, height, top, left, 0, +1 * i,false,myCoin,dryRun,byPass)
       
       if(res[0]){return [false]}
       else if (res[2]==="interrupted")break; 
        i++;
        temp=temp+height;
    }

    console.log("ROOOK 3")
    temp=right;
     i=1;
    while(temp>=cBox.left && temp<=cBox.right){

        let res=check(top, temp, state, position, event, width, height, top, left, i , 0,false,myCoin,dryRun,byPass)
       if(res[0]){return [false]}
       else if (res[2]==="interrupted")break; 
        i++;
        temp=temp+width;
    }

    console.log("ROOOK 4")
    temp=left-width;
     i=1;
    while(temp>=cBox.left && temp<=cBox.right){

        
        let res=check(top, temp, state, position, event, width, height, top, left, i* -1 , 0,false,myCoin,dryRun,byPass)
       if(res[0]){return [false]}
       else if (res[2]==="interrupted")break; 
        i++;
        temp=temp-width;
    }

console.log(" ROOK RETURNING ",[success])
 return [success];   


}

function pawn(state: { [k: string]: any }, position: initCoinPos, event: any,myCoin:string,dryRun:boolean,byPass?:HTMLDivElement) {

    let origin = state.el as HTMLDivElement;
    let { top, left, bottom, width, height } = origin.getBoundingClientRect();
    for (let i = 1; i <= 2; i++)
       if(check(top - (i * height), left, state, position, event, width, height, top, left, 0, -1 * i,false,myCoin,dryRun)[0])return [false]
   // console.log(" !!!! POSSIBLE KILLING ")
    let k1= check(top - (1 * height), left+width, state, position, event, width, height, top, left, 1,-1,true,myCoin,dryRun,byPass) 
    let k2= check(top - (1 * height), left-width, state, position, event, width, height, top, left, -1,-1,true,myCoin,dryRun,byPass)
   // console.log("k1,k2",k1,k2)
    if(k1[0])return [false]
    else if(k2[0]) return [false]
    
    return [true];

}

export function check(y: number, x: number, state: { [k: string]: any }, position: initCoinPos, event: any, width: number, height: number, top: number, left: number, xTrans: number, yTrans: number,killOnly:boolean,myCoin:string,dryRun:boolean,byPass?:HTMLDivElement) {


    //outofbox edge case
    
    let cbBox = document.querySelector("#chessBoard").getBoundingClientRect();
    console.log("BBOX ",cbBox);
    let [centerX, centerY] = [width / 2 + x, height / 2 + y];
    //console.log(cbBox.top <= centerY, cbBox.bottom >= centerY, cbBox.left <= centerX, cbBox.right >= centerX)
    if (!(cbBox.top <= centerY && cbBox.bottom >= centerY && cbBox.left <= centerX && cbBox.right >= centerX)) {
        console.log("** OOB ERROR **");
        return [false];
    }
  //  console.log(" point ? ", (event.clientX >= x && event.clientX <= x + width && event.clientY >= y && event.clientY <= y + width))
    let fromPoint:any= document.elementFromPoint(centerX, centerY);
    console.log("fromPoint ",fromPoint)

    let fromPointPos = fromPoint?.getBoundingClientRect();
    console.log("fromPointEnd",fromPointPos)
    console.log(" from & state.dest ,bypass",fromPoint, state.dest,byPass);
   // console.log("from point ",fromPoint,(fromPoint as HTMLDivElement).dataset.mycoin);

    if (fromPoint && state.dest && fromPoint.id === state.dest.id && fromPoint.dataset.coin===state.dest.dataset.coin )  {
        return [true];
    }
    else if(fromPoint && fromPoint.id!=="chessBoard" && fromPoint.id!==state.el.id && (!(byPass!==undefined) || fromPoint.id!==byPass.id)){
        console.log(" interrupted ")
        return [false,false,"interrupted"];
    }


return [false];



}

export let handlerKingMapping: { [k: string]: any } = {
    'p': pawn,
    'q': queen,
    'b': bishop,
    'h': horse,
    'r': rook,
    'k': king
}




