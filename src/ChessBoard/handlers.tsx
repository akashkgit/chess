import { mapping } from "../specs/data";
import { initCoinPos } from "./types";

function king(state: { [k: string]: any }, position: initCoinPos, event: any) {
    //console.log(" king ")
    let origin = state.el as HTMLDivElement;
    let success=true;
    let { top, left, bottom, width, height,right } = origin.getBoundingClientRect();
    let tempX:number,tempY:number;
    let cBox=document.querySelector("#chessBoard").getBoundingClientRect();
    if(event.clientY<=top)
    check(top-height, left, state, position, event, width, height, top, left, 0, -1 ,false)
    if(event.clientY>=bottom)
    check(top+height, left, state, position, event, width, height, top, left, 0, 1 ,false)
    if(event.clientX<=left)
    check(top, left-width, state, position, event, width, height, top, left, -1, 0 ,false)
    if(event.clientX>=right)
    check(top, left+width, state, position, event, width, height, top, left, 1, 0 ,false)

}

function queen(state: { [k: string]: any }, position: initCoinPos, event: any) {

    //console.log(" queen ")
    if(!rook(state,position,event))
    bishop(state,position,event);

}



function bishop(state: { [k: string]: any }, position: initCoinPos, event: any) {
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
               if(! check(tempY, tempX, state, position, event, width, height, top, left, i, -i ,false)){success=false;break;}

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
               if(! check(tempY, tempX, state, position, event, width, height, top, left, -i, -i ,false)){success=false;break;}

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
               if(! check(tempY, tempX, state, position, event, width, height, top, left, i, i ,false)){success=false;break;}

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
               if(! check(tempY, tempX, state, position, event, width, height, top, left, -i, i ,false)){success=false;break;}

                tempX=tempX-width;
                tempY=tempY+height;
                i++;
            }
        
    }
    return success;
    
}

function horse(state: { [k: string]: any }, position: initCoinPos, event: any) {
    let origin = state.el as HTMLDivElement;
    let { top, left, bottom, width, height,right } = origin.getBoundingClientRect();
    
    let cBox=document.querySelector("#chessBoard").getBoundingClientRect();

    check(top-height, left+ 2 * width, state, position, event, width, height, top, left, 2, -1 ,false)
    check(top-2 * height, left+ 1 * width, state, position, event, width, height, top, left, 1, -2 ,false)

    check(top-height, left- 2 * width, state, position, event, width, height, top, left, -2, -1 ,false)
    check(top-2 * height, left- 1 * width, state, position, event, width, height, top, left, -1, -2 ,false)
    
    check(top+height, left+ 2 * width, state, position, event, width, height, top, left, 2, 1 ,false)
    check(top+2 * height, left+ 1 * width, state, position, event, width, height, top, left, 1, 2 ,false)

    check(top+height, left- 2 * width, state, position, event, width, height, top, left, -2, 1 ,false)
    check(top+2 * height, left- 1 * width, state, position, event, width, height, top, left, -1, 2 ,false)



}


function rook(state: { [k: string]: any }, position: initCoinPos, event: any) {
    let origin = state.el as HTMLDivElement;
    let { top, left, bottom, width, height,right } = origin.getBoundingClientRect();
    let temp:number;
    let cBox=document.querySelector("#chessBoard").getBoundingClientRect();
    let success=true;
    if(event.clientY<=top){
    temp=top;
    let i=0;
    while(temp>=cBox.top){

        
       if(!check(temp, left, state, position, event, width, height, top, left, 0, -1 * i,false)){success=false;break;}
        
        i++;
        temp=temp-height;
    }
}
else if(event.clientY>=bottom){
    temp=bottom;
    let i=1;
    while(temp>=cBox.top){

        
       if(!check(temp, left, state, position, event, width, height, top, left, 0, +1 * i,false)){success=false;break;}
        
        i++;
        temp=temp+height;
    }
}
else if(event.clientX>=left){
    temp=right;
    let i=1;
    while(temp>=cBox.top){

        
       if(!check(top, temp, state, position, event, width, height, top, left, i , 0,false)){success=false;break;}
        
        i++;
        temp=temp+width;
    }
}
else if(event.clientX<=left){
    temp=left-width;
    let i=1;
    while(temp>=cBox.top){

        
       if(!check(top, temp, state, position, event, width, height, top, left, i* -1 , 0,false)){success=false;break;}
        
        i++;
        temp=temp-width;
    }
}

 return success;   


}

function pawn(state: { [k: string]: any }, position: initCoinPos, event: any) {

    let origin = state.el as HTMLDivElement;
    let { top, left, bottom, width, height } = origin.getBoundingClientRect();
    for (let i = 1; i <= 2; i++)
       if(! check(top - (i * height), left, state, position, event, width, height, top, left, 0, -1 * i,false))break;
    check(top - (1 * height), left+width, state, position, event, width, height, top, left, 1,-1,true);  
}


function check(y: number, x: number, state: { [k: string]: any }, position: initCoinPos, event: any, width: number, height: number, top: number, left: number, xTrans: number, yTrans: number,killOnly:boolean) {


    //outofbox edge case

    let cbBox = document.querySelector("#chessBoard").getBoundingClientRect();
    let [centerX, centerY] = [width / 2 + x, height / 2 + y];
    //console.log(cbBox.top <= centerY, cbBox.bottom >= centerY, cbBox.left <= centerX, cbBox.right >= centerX)
    if (!(cbBox.top <= centerY && cbBox.bottom >= centerY && cbBox.left <= centerX && cbBox.right >= centerX)) {
        //console.log("** OOB ERROR **");
        return;
    }
    //console.log(" point ? ", (event.clientX >= x && event.clientX <= x + width && event.clientY >= y && event.clientY <= y + width))
    let fromPoint = document.elementFromPoint(centerX, centerY);
    let fromPointPos = fromPoint.getBoundingClientRect();
    //console.log(fromPoint, state.dest);
    if (fromPoint && state.dest && fromPoint.id === state.dest.id) {


        document.querySelector("#chessBoard").removeChild(state.dest);
        let futurePos = getComputedStyle(state.el).transform + `translateY(${yTrans * 100}%) translateX(${xTrans * 100}%)`
        state.el.style.transform = futurePos;

        //console.log("Yes vetting " + state.dest.id)
    }
    else if (event.clientX >= x && event.clientX <= x + width && event.clientY >= y && event.clientY <= y + width && !killOnly) {
        //console.log("moving to clicked destinationless box")
        //console.log("ytrans ",yTrans)
        let futurePos = getComputedStyle(state.el).transform + `translateY(${yTrans * 100}%) translateX(${xTrans * 100}%)`
        state.el.style.transform = futurePos;
        


    }
    else if(fromPoint && mapping[fromPoint.id]&& fromPoint.id!==state.el.id){
        //console.log(" interrupted ")
        return false;
    }


return true;



}

export let handlerMapping: { [k: string]: any } = {
    'p': pawn,
    'q': queen,
    'b': bishop,
    'h': horse,
    'r': rook,
    'k': king
}


