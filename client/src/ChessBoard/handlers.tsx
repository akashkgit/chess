import { mapping } from "../specs/data";
import { isAllowed } from "./helper";
import { initCoinPos } from "./types";
let disp;
function king(state: { [k: string]: any }, position: initCoinPos, event: any,myCoin:string,dryRun:boolean,byPass?:HTMLDivElement) {
    // //console.log(" king ")
    let origin = state.el as HTMLDivElement;
    let success=true;
    let { top, left, bottom, width, height,right } = origin.getBoundingClientRect();
    let tempX:number,tempY:number;
    let cBox=document.querySelector("#chessBoard").getBoundingClientRect();
    if(event.clientY<=top){
let res=    check(top-height, left, state, position, event, width, height, top, left, 0, -1 ,false,myCoin,dryRun,byPass)
return res;
    }
    if(event.clientY>=bottom){
    let res=check(top+height, left, state, position, event, width, height, top, left, 0, 1 ,false,myCoin,dryRun,byPass)
    return res;
    }
    if(event.clientX<=left){
    let res=check(top, left-width, state, position, event, width, height, top, left, -1, 0 ,false,myCoin,dryRun,byPass)
    return res;
    }
    if(event.clientX>=right){
    let res=check(top, left+width, state, position, event, width, height, top, left, 1, 0 ,false,myCoin,dryRun,byPass)
    return res;
    }
    return [false];

}

function queen(state: { [k: string]: any }, position: initCoinPos, event: any,myCoin:string,dryRun:boolean,byPass?:HTMLDivElement) {

    // //console.log(" queen ")
    let res:any=rook(state,position,event,myCoin,dryRun,byPass)
    if(res[0])return res;
    res=bishop(state,position,event,myCoin,dryRun,byPass);
    return res;

}



function bishop(state: { [k: string]: any }, position: initCoinPos, event: any,myCoin:string,dryRun:boolean,byPass?:HTMLDivElement) {
    // //console.log(" bishop ")
    let origin = state.el as HTMLDivElement;
    let success=false;
    let { top, left, bottom, width, height,right } = origin.getBoundingClientRect();
    let tempX:number,tempY:number;
    let cBox=document.querySelector("#chessBoard").getBoundingClientRect();
    // //console.log(event.clientX>=right , event.clientY<=top);
    if((event.clientX>=right && event.clientY<=top) || byPass!==undefined){
        let i=1;
        tempX=left+width;
        tempY=top-height;
        // //console.log("diagnol ",tempX,cBox.right , tempY,cBox.top)
         //console.log("c1")
            while(tempX<=cBox.right && tempY>=cBox.top){
                // //console.log("traversing")
                let res= check(tempY, tempX, state, position, event, width, height, top, left, i, -i ,false,myCoin,dryRun,byPass)
               if(res[0]){return [true,i,-i,res[1],res[2],res[3]]}
                tempX=tempX+width;
                tempY=tempY-height;
                i++;
            }
        
    }
    if((event.clientX<=left && event.clientY<=top) || byPass!==undefined){
        let i=1;
        tempX=left-width;
        tempY=top-height;
         //console.log("c2")
        // //console.log("diagnol ",tempX,cBox.right , tempY,cBox.top)
            while(tempX>=cBox.left && tempY>=cBox.top){
                // //console.log("traversing")
                let res=check(tempY, tempX, state, position, event, width, height, top, left, -i, -i ,false,myCoin,dryRun,byPass)
               
               if(res[0]){return [true,-i,-i,res[1],res[2],res[3]]}
               else if (res[2]==="interrupted")break;
                tempX=tempX-width;
                tempY=tempY-height;
                i++;
            }
        
    }
   if((event.clientX>=right && event.clientY>=bottom ) || byPass!==undefined){
        let i=1;
        tempX=left+width;
        tempY=top+height;
         //console.log("c3")
        // //console.log("diagnol ",tempX,cBox.right , tempY,cBox.top)
            while(tempX<=cBox.right && tempY>=cBox.top){
                // //console.log("traversing")
                let res=check(tempY, tempX, state, position, event, width, height, top, left, i, i ,false,myCoin,dryRun,byPass)
                if(res[0] ){return [true,i,i,res[1],res[2],res[3]]}
                else if (res[2]==="interrupted")break;
                tempX=tempX+width;
                tempY=tempY+height;
                i++;
            }
        
    }
    if((event.clientX<=left && event.clientY>=bottom) || byPass!==undefined){
        let i=1;
        tempX=left-width;
         //console.log("c4")
        tempY=top+height;
        // //console.log("diagnol ",tempX,cBox.right , tempY,cBox.top)
            while(tempX>=cBox.left && tempY>=cBox.top){
                // //console.log("traversing")
               let res=check(tempY, tempX, state, position, event, width, height, top, left, -i, i ,false,myCoin,dryRun,byPass);
                
               if(res[0] ){return [true,-i,i,res[1],res[2],res[3]]}
               else if (res[2]==="interrupted")break; 
               tempX=tempX-width;
                tempY=tempY+height;
                i++;
            }
        
    }
    return [success];
    
}

function horse(state: { [k: string]: any }, position: initCoinPos, event: any,myCoin:string,dryRun:boolean,byPass?:HTMLDivElement) {
    let origin = state.el as HTMLDivElement;
    let { top, left, bottom, width, height,right } = origin.getBoundingClientRect();
    
    let cBox=document.querySelector("#chessBoard").getBoundingClientRect();

    let res=check(top-height, left+ 2 * width, state, position, event, width, height, top, left, 2, -1 ,false,myCoin,dryRun,byPass)
    if(res[0]){return [true,2,-1,res[1],res[2],res[3]]}
    res=check(top-2 * height, left+ 1 * width, state, position, event, width, height, top, left, 1, -2 ,false,myCoin,dryRun,byPass)
    if(res[0]){return [true,1,-2,res[1],res[2],res[3]]}
    res=check(top-height, left- 2 * width, state, position, event, width, height, top, left, -2, -1 ,false,myCoin,dryRun,byPass)
    if(res[0]){return [true,-2,-1,res[1],res[2],res[3]]}
    res=check(top-2 * height, left- 1 * width, state, position, event, width, height, top, left, -1, -2 ,false,myCoin,dryRun,byPass)
    if(res[0]){return [true,-1,-2,res[1],res[2],res[3]]}
    res=check(top+height, left+ 2 * width, state, position, event, width, height, top, left, 2, 1 ,false,myCoin,dryRun,byPass)
    if(res[0]){return [true,2,1,res[1],res[2],res[3]]}
    res=check(top+2 * height, left+ 1 * width, state, position, event, width, height, top, left, 1, 2 ,false,myCoin,dryRun,byPass)
    if(res[0]){return [true,1,2,res[1],res[2],res[3]]}
    res=check(top+height, left- 2 * width, state, position, event, width, height, top, left, -2, 1 ,false,myCoin,dryRun,byPass)
    if(res[0]){return [true,-2,1,res[1],res[2],res[3]]}
    res=check(top+2 * height, left- 1 * width, state, position, event, width, height, top, left, -1, 2 ,false,myCoin,dryRun,byPass)
    if(res[0]){return [true,-1,2,res[1],res[2],res[3]]}
    else return [false]



}


function rook(state: { [k: string]: any }, position: initCoinPos, event: any,myCoin:string,dryRun:boolean,byPass?:HTMLDivElement) {
    let origin = state.el as HTMLDivElement;
    let { top, left, bottom, width, height,right } = origin.getBoundingClientRect();
    let temp:number;
    let cBox=document.querySelector("#chessBoard").getBoundingClientRect();
    let success=false;
    if(event.clientY<=top || byPass!==undefined ){
    temp=top;
    let i=0;
    while(temp>=cBox.top && temp<=cBox.bottom ){

        let res=check(temp, left, state, position, event, width, height, top, left, 0, -1 * i,false,myCoin,dryRun,byPass);
       
       if(res[0]){return [true,0,-1* i,res[1],res[2],res[3]]}
        i++;
        temp=temp-height;
    }
}
if(event.clientY>=bottom|| byPass!==undefined ){
    temp=bottom;
    let i=1;
    while(temp>=cBox.top&& temp<=cBox.bottom){

        let res=check(temp, left, state, position, event, width, height, top, left, 0, +1 * i,false,myCoin,dryRun,byPass)
       
       if(res[0]){return [true,0,i,res[1],res[2],res[3]]}
       else if (res[2]==="interrupted")break; 
        i++;
        temp=temp+height;
    }
}
 if(event.clientX>=left || byPass!==undefined){
    temp=right;
    let i=1;
    while(temp>=cBox.left && temp<=cBox.right){

        let res=check(top, temp, state, position, event, width, height, top, left, i , 0,false,myCoin,dryRun,byPass)
       if(res[0]){return [true,i,0,res[1],res[2],res[3]]}
       else if (res[2]==="interrupted")break; 
        i++;
        temp=temp+width;
    }
}
if(event.clientX<=left || byPass!==undefined){
    temp=left-width;
    let i=1;
    while(temp>=cBox.left && temp<=cBox.right){

        
        let res=check(top, temp, state, position, event, width, height, top, left, i* -1 , 0,false,myCoin,dryRun,byPass)
       if(res[0]){return [true,-1 * i ,0,res[1],res[2],res[3]]}
       else if (res[2]==="interrupted")break; 
        i++;
        temp=temp-width;
    }
}

 return [success];   


}

function pawn(state: { [k: string]: any }, position: initCoinPos, event: any,myCoin:string,dryRun:boolean,byPass?:HTMLDivElement) {

    let origin = state.el as HTMLDivElement;
    let { top, left, bottom, width, height } = origin.getBoundingClientRect();
    for (let i = 1; i <= 2; i++)
       if(check(top - (i * height), left, state, position, event, width, height, top, left, 0, -1 * i,false,myCoin,dryRun)[0])return [true,0,-1 * i,false]
   //  //console.log(" !!!! POSSIBLE KILLING ")
    let k1= check(top - (1 * height), left+width, state, position, event, width, height, top, left, 1,-1,true,myCoin,dryRun,byPass) 
    let k2= check(top - (1 * height), left-width, state, position, event, width, height, top, left, -1,-1,true,myCoin,dryRun,byPass)
   //  //console.log("k1,k2",k1,k2)
    if(k1[0])return [true,1,-1,true,k1[2],k1[3]]
    else if(k2[0]) return [true,-1,-1,true,k2[2],k2[3]]
    
    return false;

}

export function check(y: number, x: number, state: { [k: string]: any }, position: initCoinPos, event: any, width: number, height: number, top: number, left: number, xTrans: number, yTrans: number,killOnly:boolean,myCoin:string,dryRun:boolean,byPass?:HTMLDivElement) {


    //outofbox edge case

    let cbBox = document.querySelector("#chessBoard").getBoundingClientRect();
    let [centerX, centerY] = [width / 2 + x, height / 2 + y];
    // //console.log(cbBox.top <= centerY, cbBox.bottom >= centerY, cbBox.left <= centerX, cbBox.right >= centerX)
    if (!(cbBox.top <= centerY && cbBox.bottom >= centerY && cbBox.left <= centerX && cbBox.right >= centerX)) {
         //console.log("** OOB ERROR **");
        return [false];
    }
  //   //console.log(" point ? ", (event.clientX >= x && event.clientX <= x + width && event.clientY >= y && event.clientY <= y + width))
    let fromPoint:any= document.elementFromPoint(centerX, centerY);
    let fromPointPos = fromPoint.getBoundingClientRect();
     //console.log(" from & state.dest ,bypass",fromPoint, state.dest,byPass);
   //  //console.log("from point ",fromPoint,(fromPoint as HTMLDivElement).dataset.mycoin);

    if (fromPoint && state.dest && fromPoint.id === state.dest.id && fromPoint.dataset.coin===state.dest.dataset.coin )  {


        let temp=getComputedStyle(state.el).transform ;
        //if(dryRun)return [true]
        let futurePos = getComputedStyle(state.el).transform + `translateY(${yTrans * 100}%) translateX(${xTrans * 100}%)`
        // if(state.dest.dataset.coin.split("")[1]==='k'){
        //         return [false]

        // }
        // else{
            state.el.style.transform = futurePos;  
            let allowed=isAllowed(myCoin,undefined);
            //alert("allowed"+allowed);
            if(!allowed){
                state.el.style.transform=temp;
                alert(" Not permitted! try other Moves or coins");
                return [false]
            }
        document.querySelector("#chessBoard").removeChild(state.dest);
        
        // }
        
         //console.log("Yes vetting " + state.dest.id)
        return [true,true,state.dest.dataset.pos,state.dest];
    }
    else if (event.clientX >= x && event.clientX <= x + width && event.clientY >= y && event.clientY <= y + width && !killOnly) {
         //console.log("moving to clicked destinationless box")
    // //console.log("ytrans ",yTrans)
        let temp=getComputedStyle(state.el).transform ;
        let futurePos = getComputedStyle(state.el).transform + `translateY(${yTrans * 100}%) translateX(${xTrans * 100}%)`;
        
        (document.querySelector(`[data-pos="${state.el.dataset.pos}"]`) as HTMLElement).style.transform = futurePos;
        let allowed=isAllowed(myCoin,undefined);
       // alert("allowed"+allowed);
        if(!allowed){
            alert(" Not permitted! try other Moves or coins");
            state.el.style.transform=temp;
            return [false]
        }
        return [true,false];
        


    }
    else if(fromPoint && fromPoint.id!=="chessBoard" && fromPoint.id!==state.el.id && (!(byPass!==undefined) || fromPoint.id!==byPass.id)){
         //console.log(" interrupted ")
        return [false,false,"interrupted"];
    }


return [false];



}

export let handlerMapping: { [k: string]: any } = {
    'p': pawn,
    'q': queen,
    'b': bishop,
    'h': horse,
    'r': rook,
    'k': king
}


