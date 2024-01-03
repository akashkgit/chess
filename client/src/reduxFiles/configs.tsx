import { configureStore, createSlice } from "@reduxjs/toolkit";
import {
    useDispatch
} from "react-redux";
import { wsHandler } from "../specs/data";

type loginInfo = {


    login: boolean,
    ws: WebSocket | null,
    uname: string


}
let loginInitData: loginInfo = {
    login: false,
    ws: null,
    uname: ""
}
const loginSlice = createSlice({
    name: "login",
    initialState: loginInitData,
    reducers: {
        login: (state, action) => {



            return { ...state, login: action.payload.login, uname: action.payload.uname ? action.payload.uname : state.uname };


        },
        wsChanger: (state, action) => {
            //  console.log(" chaning ws in reduceer ", state,action.payload.ws);
            //alert("removing the old ws from state");
            if (state.ws)
                state.ws.close();
            return { ...state, ws: action.payload.ws }
        }
    }

})
const gameSlice = createSlice({
    name: "game",
    initialState: {
        start: false,
        myCoin: "black",
        opp: "",
    },
    reducers: {
        startGame: (state, action) => {



            return { ...state, start: action.payload.start, myCoin: action.payload.myCoin, opp: action.payload.opp };


        },
        endGame(state, action) {
            return { ...state, start: false };
        }

    }

})

const gameSession = createSlice({
    name: "gameSession",
    initialState: {
        myTurn: false,
        move: null,
        myMove: null,
        moveHistory: [],
        myKilledCoins: [],
        oppKilledCoins: [],
        undo: false,
        gameDrawn: false,
        draw: false
    },
    reducers: {

        popHistory(state){

            let lastPair = state.moveHistory[state.moveHistory.length -1 ];
            let moveHist =[...state.moveHistory];
            if(1 === lastPair.length){
                    moveHist.pop();
                    return {...state, moveHistory:moveHist};
            }
            else if ( 0 === lastPair.length){
                moveHist[moveHist.length -1].pop();
                return {...state, moveHistory:moveHist};
            }

        },

        setUndo(state, action) {
            return { ...state, undo: action.payload }
        },
        drawGame(state) {
            return { ...state, gameDrawn: true };
        },
        setDraw(state, action) {
            return { ...state, draw: action.payload }
        },
        setMyKilledCoins(state, action) {
            // state.myKilledCoins.push(action);
            console.log("killedcoin state", { ...state, myKilledCoins: [...state.myKilledCoins, action] })

            return { ...state, myKilledCoins: [...state.myKilledCoins, action.payload] }

        },
        setOppKilledCoins(state, action) {
            console.log("oppkilledcoins", state.oppKilledCoins)
            return { ...state, oppKilledCoins: [...state.oppKilledCoins, action.payload] }

        },

        switchTurn: (state) => {



            return { ...state, myTurn: !state.myTurn }


        },
        setMove: (state, action) => {
            //  alert(" setting move"+JSON.stringify(action))
            let history = [...state.moveHistory];
            if (0 === history.length) history.push([JSON.stringify(action.payload.move)]);
            else {
                if (1 == history[history.length - 1].length) {
                    history[history.length - 1] = [history[history.length - 1][0], JSON.stringify(action.payload.move)];
                }
                else history.push([JSON.stringify(action.payload.move)])
            }
            console.log("setmove state is", { ...state, move: action.payload.move, moveHistory: history });
            return { ...state, move: action.payload.move, moveHistory: history };
        },
        updateMyMove: (state, action) => {

            if ("undo" === action.type) {

            }
            else {
                let history = [...state.moveHistory];
                if (0 === history.length) history.push([action.payload]);
                else {
                    if (1 == history[history.length - 1].length) {
                        history[history.length - 1] = [history[history.length - 1][0], action.payload];
                    }
                    else history.push([action.payload])
                }
                console.log("update state is", { ...state, myMove: action.payload, moveHistory: history });
                return { ...state, myMove: action.payload, moveHistory: history };
            }
        }

    }

})
export let globalState = configureStore({
    reducer: {
        "loginRed": loginSlice.reducer,
        "game": gameSlice.reducer,
        "gameSession": gameSession.reducer
    }
})
export const { login, wsChanger } = loginSlice.actions
export const { startGame, endGame } = gameSlice.actions
export const { switchTurn, drawGame,setDraw, popHistory,setMove, setUndo, setMyKilledCoins, setOppKilledCoins, updateMyMove } = gameSession.actions

export function authCheck() {

}