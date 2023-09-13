import {createRoot} from 'react-dom/client';
import React from 'react';
import { Outlet,Link, RouterProvider,createBrowserRouter } from '../../node_modules/react-router-dom/dist/index';
import {Layout} from "../Layout/Layout"

export function App(){
    
    return <>
    
    <Layout />
     <Link to="/play" ><h1>click me</h1> </Link>
    
    
    
    </>
}

