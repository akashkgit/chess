import { mapping } from "../specs/data";
import { initCoinPos } from "./types";

function king(state: { [k: string]: any }, position: initCoinPos, event: any,myCoin:string) {
    //console.log(" king ")
    let origin = state.el as HTMLDivElement;
    let success=true;
    let { top, left, bottom, width, height,right } = origin.getBoundingClientRect();
    let tempX:number,tempY:number;
    let cBox=document.querySelector("#chessBoard").getBoundingClientRect();
    if(event.clientY<=top)
    check(top-height, left, state, position, event, width, height, top, left, 0, -1 ,false,myCoin)
    if(event.clientY>=bottom)
    check(top+height, left, state, position, event, width, height, top, left, 0, 1 ,false,myCoin)
    if(event.clientX<=left)
    check(top, left-width, state, position, event, width, height, top, left, -1, 0 ,false,myCoin)
    if(event.clientX>=right)
    check(top, left+width, state, position, event, width, height, top, left, 1, 0 ,false,myCoin)

}

function queen(state: { [k: string]: any }, position: initCoinPos, event: any,myCoin:string) {

    //console.log(" queen ")
    let res:any=rook(state,position,event,myCoin)
    if(res[0])return res;
    res=bishop(state,position,event,myCoin);
    return res;

}



function bishop(state: { [k: string]: any }, position: initCoinPos, event: any,myCoin:string) {
    //console.log(" bishop ")
    let origin = state.el as HTMLDivElement;
    let success=true;
    let { top, left, bottom, width, height,right } = origin.getBoundingClientRect();
    let tempX:number,tempY:number;
    let cBox=document.querySelector("#chessBoard").getBoundingClientRect();
    //console.log(event.clientX>=right , event.clientY<=top);
    if(event.clientX>=right && event.clientY<=top){
        let i=1;
        tempX=left+width;
        tempY=top-height;
        //console.log("diagnol ",tempX,cBox.right , tempY,cBox.top)
            while(tempX<=cBox.right && tempY>=cBox.top){
                //console.log("traversing")
                let res= check(tempY, tempX, state, position, event, width, height, top, left, i, -i ,false,myCoin)
               if(res[0]){return [true,i,-i,res[1],res[2]]}
                tempX=tempX+width;
                tempY=tempY-height;
                i++;
            }
        
    }
    else if(event.clientX<=left && event.clientY<=top){
        let i=1;
        tempX=left-width;
        tempY=top-height;
        //console.log("diagnol ",tempX,cBox.right , tempY,cBox.top)
            while(tempX>=cBox.left && tempY>=cBox.top){
                //console.log("traversing")
                let res=check(tempY, tempX, state, position, event, width, height, top, left, -i, -i ,false,myCoin)
               
               if(res[0]){return [true,-i,-i,res[1],res[2]]}
                tempX=tempX-width;
                tempY=tempY-height;
                i++;
            }
        
    }
   else  if(event.clientX>=right && event.clientY>=bottom){
        let i=1;
        tempX=left+width;
        tempY=top+height;
        //console.log("diagnol ",tempX,cBox.right , tempY,cBox.top)
            while(tempX<=cBox.right && tempY>=cBox.top){
                //console.log("traversing")
                let res=check(tempY, tempX, state, position, event, width, height, top, left, i, i ,false,myCoin)
                if(res[0]){return [true,i,i,res[1],res[2]]}

                tempX=tempX+width;
                tempY=tempY+height;
                i++;
            }
        
    }
    else if(event.clientX<=left && event.clientY>=bottom){
        let i=1;
        tempX=left-width;
        tempY=top+height;
        //console.log("diagnol ",tempX,cBox.right , tempY,cBox.top)
            while(tempX>=cBox.left && tempY>=cBox.top){
                //console.log("traversing")
               let res=check(tempY, tempX, state, position, event, width, height, top, left, -i, i ,false,myCoin);
                
               if(res[0]){return [true,-i,i,res[1],res[2]]}
                tempX=tempX-width;
                tempY=tempY+height;
                i++;
            }
        
    }
    return success;
    
}

function horse(state: { [k: string]: any }, position: initCoinPos, event: any,myCoin:string) {
    let origin = state.el as HTMLDivElement;
    let { top, left, bottom, width, height,right } = origin.getBoundingClientRect();
    
    let cBox=document.querySelector("#chessBoard").getBoundingClientRect();

    let res=check(top-height, left+ 2 * width, state, position, event, width, height, top, left, 2, -1 ,false,myCoin)
    if(res[0]){return [true,2,-1,res[1],res[2]]}
    res=check(top-2 * height, left+ 1 * width, state, position, event, width, height, top, left, 1, -2 ,false,myCoin)
    if(res[0]){return [true,1,-2,res[1],res[2]]}
    res=check(top-height, left- 2 * width, state, position, event, width, height, top, left, -2, -1 ,false,myCoin)
    if(res[0]){return [true,-2,-1,res[1],res[2]]}
    res=check(top-2 * height, left- 1 * width, state, position, event, width, height, top, left, -1, -2 ,false,myCoin)
    if(res[0]){return [true,-1,-2,res[1],res[2]]}
    res=check(top+height, left+ 2 * width, state, position, event, width, height, top, left, 2, 1 ,false,myCoin)
    if(res[0]){return [true,2,1,res[1],res[2]]}
    res=check(top+2 * height, left+ 1 * width, state, position, event, width, height, top, left, 1, 2 ,false,myCoin)
    if(res[0]){return [true,1,2,res[1],res[2]]}
    res=check(top+height, left- 2 * width, state, position, event, width, height, top, left, -2, 1 ,false,myCoin)
    if(res[0]){return [true,-2,1,res[1],res[2]]}
    res=check(top+2 * height, left- 1 * width, state, position, event, width, height, top, left, -1, 2 ,false,myCoin)
    if(res[0]){return [true,-1,2,res[1],res[2]]}
    else return [false]



}


function rook(state: { [k: string]: any }, position: initCoinPos, event: any,myCoin:string) {
    let origin = state.el as HTMLDivElement;
    let { top, left, bottom, width, height,right } = origin.getBoundingClientRect();
    let temp:number;
    let cBox=document.querySelector("#chessBoard").getBoundingClientRect();
    let success=true;
    if(event.clientY<=top){
    temp=top;
    let i=0;
    while(temp>=cBox.top){

        let res=check(temp, left, state, position, event, width, height, top, left, 0, -1 * i,false,myCoin);
       
       if(res[0]){return [true,0,-1* i,res[1],res[2]]}
        i++;
        temp=temp-height;
    }
}
else if(event.clientY>=bottom){
    temp=bottom;
    let i=1;
    while(temp>=cBox.top){

        let res=check(temp, left, state, position, event, width, height, top, left, 0, +1 * i,false,myCoin)
       
       if(res[0]){return [true,0,i,res[1],res[2]]}
        i++;
        temp=temp+height;
    }
}
else if(event.clientX>=left){
    temp=right;
    let i=1;
    while(temp>=cBox.top){

        let res=check(top, temp, state, position, event, width, height, top, left, i , 0,false,myCoin)
       if(res[0]){return [true,i,0,res[1],res[2]]}
        
        i++;
        temp=temp+width;
    }
}
else if(event.clientX<=left){
    temp=left-width;
    let i=1;
    while(temp>=cBox.top){

        
        let res=check(top, temp, state, position, event, width, height, top, left, i* -1 , 0,false,myCoin)
       if(res[0]){return [true,-1 * i ,0,res[1],res[2]]}
        i++;
        temp=temp-width;
    }
}

 return success;   


}

function pawn(state: { [k: string]: any }, position: initCoinPos, event: any,myCoin:string) {

    let origin = state.el as HTMLDivElement;
    let { top, left, bottom, width, height } = origin.getBoundingClientRect();
    for (let i = 1; i <= 2; i++)
       if(check(top - (i * height), left, state, position, event, width, height, top, left, 0, -1 * i,false,myCoin)[0])return [true,0,-1 * i,false]
    console.log(" !!!! POSSIBLE KILLING ")
    let k1= check(top - (1 * height), left+width, state, position, event, width, height, top, left, 1,-1,true,myCoin) 
    let k2= check(top - (1 * height), left-width, state, position, event, width, height, top, left, -1,-1,true,myCoin)
    console.log("k1,k2",k1,k2)
    if(k1[0])return [true,1,-1,true,k1[2]]
    else if(k2[0]) return [true,-1,-1,true,k2[2]]
    
    return false;

}


export function check(y: number, x: number, state: { [k: string]: any }, position: initCoinPos, event: any, width: number, height: number, top: number, left: number, xTrans: number, yTrans: number,killOnly:boolean,myCoin:string) {


    //outofbox edge case

    let cbBox = document.querySelector("#chessBoard").getBoundingClientRect();
    let [centerX, centerY] = [width / 2 + x, height / 2 + y];
    console.log(cbBox.top <= centerY, cbBox.bottom >= centerY, cbBox.left <= centerX, cbBox.right >= centerX)
    if (!(cbBox.top <= centerY && cbBox.bottom >= centerY && cbBox.left <= centerX && cbBox.right >= centerX)) {
        console.log("** OOB ERROR **");
        return [false];
    }
    console.log(" point ? ", (event.clientX >= x && event.clientX <= x + width && event.clientY >= y && event.clientY <= y + width))
    let fromPoint:any= document.elementFromPoint(centerX, centerY);
    let fromPointPos = fromPoint.getBoundingClientRect();
    console.log(fromPoint, state.dest);
    console.log("from point ",fromPoint,(fromPoint as HTMLDivElement).dataset.mycoin);

    if (fromPoint && state.dest && fromPoint.id === state.dest.id && fromPoint.dataset.coin===state.dest.dataset.coin )  {


        document.querySelector("#chessBoard").removeChild(state.dest);
        let futurePos = getComputedStyle(state.el).transform + `translateY(${yTrans * 100}%) translateX(${xTrans * 100}%)`
        state.el.style.transform = futurePos;
        
        console.log("Yes vetting " + state.dest.id)
        return [true,true,state.dest.dataset.pos];
    }
    else if (event.clientX >= x && event.clientX <= x + width && event.clientY >= y && event.clientY <= y + width && !killOnly) {
        console.log("moving to clicked destinationless box")
    console.log("ytrans ",yTrans)
        let futurePos = getComputedStyle(state.el).transform + `translateY(${yTrans * 100}%) translateX(${xTrans * 100}%)`
        state.el.style.transform = futurePos;
        return [true,false];
        


    }
    else if(fromPoint && mapping[myCoin][fromPoint.id] && fromPoint.id!==state.el.id){
        console.log(" interrupted ")
        return [false,false];
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


