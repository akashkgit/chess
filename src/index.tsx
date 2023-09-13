import "./index.scss"
import {createRoot} from 'react-dom/client';
import React, { Children } from 'react';
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import {App} from "./App/app";
import { SignUp } from './signup/SignUp';
import {DirectSignUp} from "./signup/DirectSignUp"
import { LogIn } from './login/login';

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
       children:[{
        index:true,
        element:<App />
        
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
rRoot.render(<RouterProvider router={router} />);

function App2(){
    return <><h2>app5</h2></>
}
