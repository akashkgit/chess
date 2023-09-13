import {createRoot} from 'react-dom/client';
import React, { Children } from 'react';
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import {App} from "./App/app";
import { Login } from './Login/Login';
import {DirectSignUp} from "./Login/DirectSignUp"


const router=createBrowserRouter([
    {
        path:"/signup",
        children:[
        {
            element:<Login />,
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
        path:"play", 
        //index:true,.mm
        element:<App />
        
       }]

    }
   

])
let rRoot=createRoot(document.querySelector("#reactRoot") as Element)
rRoot.render(<RouterProvider router={router} />);

function App2(){
    return <><h2>app5</h2></>
}
