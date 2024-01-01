import {createRoot} from 'react-dom/client';
import React, { useEffect } from 'react';
import { Outlet,Link, RouterProvider,createBrowserRouter, useNavigate } from '../../node_modules/react-router-dom/dist/index';
import {Layout} from "../Layout/Layout"
import { useDispatch } from 'react-redux';
import { init,Notification} from "../index";

export function App(){
    let disp=useDispatch();
    let nav=useNavigate();
    
    init(disp,nav);
    useEffect(()=>{    
        
        let jwt=localStorage.getItem("jwt");
        console.log("jwt is ",jwt)
        
    },[])

    return <>
    <Notification />    
    <Layout />
    
    
    
    
    </>
}

