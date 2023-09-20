import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useDispatch
 } from "react-redux";
import { wsHandler } from "../specs/data";
const loginSlice=createSlice({
    name:"login",
    initialState:{
        login:false,
        ws:null,
    },
    reducers:{
        login:(state,action)=>{
          

            
            return{...state,login: action.payload.login,uname:action.payload.uname,};
         
        
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
        myCoin:"",
    },
    reducers:{
        startGame:(state,action)=>{
          

            
            return {start:action.payload.start,myCoin:action.payload.myCoin};
         
        
        },
       
    }

})
export let globalState=configureStore({
    reducer:{
        "loginRed":loginSlice.reducer,
        "game":gameSlice.reducer
    }
})
export const {login,wsChanger}=loginSlice.actions
export const {startGame}=gameSlice.actions

export function authCheck(){
   
}