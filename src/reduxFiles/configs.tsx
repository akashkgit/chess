import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useDispatch
 } from "react-redux";
const loginSlice=createSlice({
    name:"login",
    initialState:{
        login:false,
    },
    reducers:{
        login:(state,action)=>{
            
            
            return{login: action.payload.login,uname:action.payload.uname};
         
        
        }
    }

})
export let globalState=configureStore({
    reducer:{
        "loginRed":loginSlice.reducer
    }
})
export const {login}=loginSlice.actions

export function authCheck(){
   
}