import { setMove, setUndo, startGame, setResign, switchTurn,setDraw, endGame, drawGame, setWin, reset, setTurn, setPause, setResume} from "../reduxFiles/configs";

export let boardMode={
    defaultMode:[
        "#e9eecc",
        "rgba(119,153,85,1)"
    ]
    }
export 
let boxMap=(()=>{
    let arr=Array.from({length:8},(val,id)=>String(8-id))
    let arr2=Array.from({length:8},(val,id)=>String.fromCharCode(97+id))
    return comb(arr,arr2);
})();
// let blackCoins=[
//     [],
//     []
// ]
function comb(arr1:string[],arr2:string[]){
    let boxId=Array.from({length:8}).map(()=>Array.from({length:8}))
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
          boxId[i][j]=arr1[i]+arr2[j];
        }
    }

    return boxId;
}

export let urls={
    
    br:"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/br.png",

    bh:"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bh.png",
    bb:"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bb.png",
    bk:"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bk.png",
    bq:"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bq.png",
    bp:"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png",
    wr:"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wr.png",
    wh:"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wh.png",
    wb:"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wb.png",
    wk:"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wk.png",
    wq:"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wq.png",
    wp:"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png",
}

export const coins=["1","2","7","8"];    

export let mapping:{[key:string]:{[key:string]:string}}={
    "white":{
    '8h':"br",
    '8g':"bh",
    '8f':"bb",
    '8e':"bk",
    '8d':"bq",
    '8c':"bb",
    '8b':"bh",
    '8a':"br",
    

    '7h':"bp",
    '7g':"bp",
    '7f':"bp",
    '7e':"bp",
    '7d':"bp",
    '7c':"bp",
    '7b':"bp",
    '7a':"bp",

    '1h':"wr",
    '1g':"wh",
    '1f':"wb",
    '1e':"wk",
    '1d':"wq",
    '1c':"wb",
    '1b':"wh",
    '1a':"wr",

    '2h':"wp",
    '2g':"wp",
    '2f':"wp",
    '2e':"wp",
    '2d':"wp",
    '2c':"wp",
    '2b':"wp",
    '2a':"wp",
    },
"black":{
    '1a':"wr",
    '1b':"wh",
    '1c':"wb",
    '1d':"wq",
    '1e':"wk",
    '1f':"wb",
    '1g':"wh",
    '1h':"wr",
    

    '2a':"wp",
    '2b':"wp",
    '2c':"wp",
    '2d':"wp",
    '2e':"wp",
    '2f':"wp",
    '2g':"wp",
    '2h':"wp",

    '8a':"br",
    '8b':"bh",
    '8c':"bb",
    '8d':"bq",
    '8e':"bk",
    '8f':"bb",
    '8g':"bh",
    '8h':"br",

    '7a':"bp",
    '7b':"bp",
    '7c':"bp",
    '7d':"bp",
    '7e':"bp",
    '7f':"bp",
    '7g':"bp",
    '7h':"bp",
    
}
}



export let url={
    "logsign":"https://chess.akasharchives.com:8081"
}

//------------------- Handlers ----------------------------------
export let wsHandler=(activate:any,clearId:any,setSrc:any,disp:any,setTimingOption:any,start:boolean,opp:string, uname:string, ws:WebSocket)=>{
    return (msg:any)=>{
        console.log("incoming msg",msg);
        msg=JSON.parse(msg.data);
      //  alert("called"+JSON.stringify(msg));
        if(msg && msg.type && msg.type==="requestInit"){
          //  alert(" inside ")
            activate(true);
            
            if(msg.src){
           // alert(" setting src to "+msg)
            setSrc(msg.src);
            


            }
            if(msg.timingOption){
              setTimingOption(msg.timingOption)
            }
            
            if(clearId.current!==0)window.clearInterval(clearId.current);
            clearId.current=window.setInterval(()=>{
                activate(false);
            },10000)

            
        }
        else if(msg && msg.type && msg.type==="requestAck"){
          //  alert(" acknowledgement recieved "+JSON.stringify(msg)+" "+JSON.stringify({start:true,myCoin:"white",opp:msg.dest}))
           disp(startGame({start:true,myCoin:"white",opp:msg.dest}))
          //  disp(switchTurn());
          disp(setTurn(true));
           if(start){
            disp(reset(true));
            let dataSend=JSON.stringify({action:"matchManager","type":"resign","dest":opp,"src":uname});
            ws.send(dataSend);

           }
            
        }
        else if (msg && msg.type && msg.type==="play"){
          //  alert(" reccoeved the move "+JSON.stringify(msg.coinMoved)+" "+JSON.stringify(msg))
            disp(setMove({move:msg.coinMoved}))
            disp(switchTurn());
        }
        else if (msg && msg.type && msg.type==="undo"){
            //  alert(" reccoeved the move "+JSON.stringify(msg.coinMoved)+" "+JSON.stringify(msg))
            console.log("undo ",msg);
            disp(setUndo(true));
            // yield control to the opponent....
            // disp(switchTurn());
          }
          else if (msg && msg.type && msg.type==="draw"){
            //  alert(" reccoeved the move "+JSON.stringify(msg.coinMoved)+" "+JSON.stringify(msg))
            console.log("draw ",msg);
            disp(setDraw(true));
            
              
              // yield control to the opponent....
            //   disp(switchTurn());
            // End match 
          }
          else if (msg && msg.type && msg.type==="timeout"){
            //  alert(" reccoeved the move "+JSON.stringify(msg.coinMoved)+" "+JSON.stringify(msg))
            console.log("timeout ",msg);
            disp(setWin(msg.winner));
            disp(endGame(true));
            disp(reset(true));
              // yield control to the opponent....
            //   disp(switchTurn());
            // End match 
          }
         
          else if (msg && msg.type && msg.type==="resign"){
            //  alert(" reccoeved the move "+JSON.stringify(msg.coinMoved)+" "+JSON.stringify(msg))
            console.log("draw ",msg);
            disp(endGame(true)); //true optional
            disp(setResign(true));
            disp(reset(true));
            //   disp(resignedGame());
              // alert(" ending game ....");
              
              // yield control to the opponent....
            //   disp(switchTurn());
            // End match 
          }
          else if (msg && msg.type && msg.type === "pause"){
            disp(setPause(true));
          }
          else if (msg && msg.type && msg.type === "resume"){
            disp(setResume(true));
          }
    }
}
    
    export function reqAck(){

        return (msg:any)=>{

        }
    }