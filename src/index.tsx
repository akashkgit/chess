import {createRoot} from 'react-dom/client';
import React, { Children } from 'react';
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import {App} from "./App/app";



const router=createBrowserRouter([
    {
        path:"/",
        element:<App />,
       children:[{
        index:true,
        element:<App2 />
        
       }]

    }

])
let rRoot=createRoot(document.querySelector("#reactRoot") as Element)
rRoot.render(<RouterProvider router={router} />);

function App2(){
    return <><h2>app5</h2></>
}
