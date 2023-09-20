import {createRoot} from 'react-dom/client';
import React, { useEffect } from 'react';
import { Outlet,Link, RouterProvider,createBrowserRouter } from '../../node_modules/react-router-dom/dist/index';
import {Layout} from "../Layout/Layout"
import { useDispatch } from 'react-redux';

export function App(){
    let disp=useDispatch();
    useEffect(()=>{    
        
        let jwt=localStorage.getItem("jwt");
        console.log("jwt is ",jwt)
    },[])

    return <>
    
    <Layout />
    
    
    
    
    </>
}

