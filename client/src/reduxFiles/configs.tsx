import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useDispatch
 } from "react-redux";
import { wsHandler } from "../specs/data";
const loginSlice=createSlice({
    name:"login",
    initialState:{
        login:false,
        ws:null,
        uname:""
    },
    reducers:{
        login:(state,action)=>{
          

            
            return{...state,login: action.payload.login,uname:action.payload.uname?action.payload.uname:state.uname};
         
        
        },
        wsChanger:(state,action)=>{
          //  console.log(" chaning ws in reduceer ", state,action.payload.ws);
            
            //alert("removing the old ws from state");
            if(state.ws)
            state.ws.close();
            return {...state,ws:action.payload.ws}
        }
    }

})
const gameSlice=createSlice({
    name:"game",
    initialState:{
        start:false,
        myCoin:"black",
        opp:""
    },
    reducers:{
        startGame:(state,action)=>{
          

            
            return {...state,start:action.payload.start,myCoin:action.payload.myCoin,opp:action.payload.opp};
         
        
        },
       
    }

})

const gameSession=createSlice({
    name:"gameSession",
    initialState:{
        myTurn:false,
        move:null

        
    },
    reducers:{
        switchTurn:(state)=>{
          

            
            return {...state,myTurn:!state.myTurn}
         
        
        },
        setMove:(state,action)=>{
          //  alert(" setting move"+JSON.stringify(action))
            return {...state,move:action.payload.move}
        }
       
    }

})
export let globalState=configureStore({
    reducer:{
        "loginRed":loginSlice.reducer,
        "game":gameSlice.reducer,
        "gameSession":gameSession.reducer
    }
})
export const {login,wsChanger}=loginSlice.actions
export const {startGame}=gameSlice.actions
export const {switchTurn,setMove}=gameSession.actions

export function authCheck(){
   
}