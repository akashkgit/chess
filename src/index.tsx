import "./index.scss"
import {createRoot} from 'react-dom/client';
import React, { Children } from 'react';
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import {App} from "./App/app";
import { SignUp } from './signup/SignUp';
import {DirectSignUp} from "./signup/DirectSignUp"
import { LogIn } from './login/login';
import {configureStore} from "@reduxjs/toolkit"
import { Provider } from "react-redux";
import { authCheck, globalState } from "./reduxFiles/configs";
import { RightPane } from "./RightPane/RightPane";
import { AtPlay, AtRest } from "./SideBar/SideBar";



const router=createBrowserRouter([
    {
        path:"/signup",
        children:[
        {
            element:<SignUp />,
            index:true

        
        },
        {
            path:"direct",
            element:<DirectSignUp />
        }
        ]
        

    },
    {
        path:"/",
        element:<App />,
       children:[{
        index:true,
        element:<RightPane />
       },{
        path:"play",
        element:<RightPane />,
        children:[{
            index:true,
            element:<AtRest />

        },
        {
            path:"online",
            element:<AtPlay />
        }
    ]
       }]

    },
    {
        path:"/login",
        children:[
        {
            element:<LogIn />,
            index:true

        
        },
        {
            path:"direct",
            element:<DirectSignUp />
        }
        ]
        

    }
   

])
let rRoot=createRoot(document.querySelector("#reactRoot") as Element)
rRoot.render(<Provider store={globalState} ><RouterProvider router={router} /></Provider>);

function App2(){
    return <><h2>app5</h2></>
}
