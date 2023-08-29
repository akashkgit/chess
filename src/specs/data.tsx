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

export let mapping:{[key:string]:string}={
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

    '1a':"wr",
    '1b':"wh",
    '1c':"wb",
    '1d':"wk",
    '1e':"wq",
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
    
}

