import React, { useEffect } from "react"
import "./login.css"
import {Link, Outlet} from "react-router-dom"
export function authResp(token:any){
    alert(" inside auth serverr");
}
export function SignUp(){

    let global:any = window;
    function resp(){
        alert(" received ");
    }
    global.google.accounts.id.initialize({


        client_id:"409051565209-dndi5u65rkdcf6rfgt9kiu691vhjtj92.apps.googleusercontent.com",
        callback:resp
    })

    useEffect(()=>{
        console.log(" inside global ", global.google.id)
        global.google.accounts.id.renderButton(document.querySelector("#googleOAuth"),{size:"large",thene:"outline"});
    })
    return <>
    <div className="container">
        <Link to="/login" className="signupLogin"><p>Login</p></Link>
        <div className="chessLabel3"><a>Chess.com</a></div>
        <div className="remComp">
        <h1>Create your chess.com account</h1>
        <img src="https://www.chess.com/bundles/web/images/pawn-on-board.svg"></img>
        <Link to="direct"><button className="signup">signup</button></Link>
        <div className="dividerDiv">
            <span className="divider"></span>
            <span className="OR ">OR</span>
            <span className="divider"></span>
        </div>
     {/* <Link to="/google"><span className="google"></span><span >Continue with Google</span></Link> */}
        <div className="oAuth">
{/*             
            <div id="g_id_onload"
     data-client_id="409051565209-dndi5u65rkdcf6rfgt9kiu691vhjtj92.apps.googleusercontent.com"
     data-context="signin"
     data-ux_mode="popup"
     data-callback="authResp"
     data-auto_prompt="false">
</div>

<div className="g_id_signin"
     data-type="standard"
     data-shape="rectangular"
     data-theme="outline"
     data-text="signin_with"
     data-size="large"
     data-locale="en"
     data-logo_alignment="left"
     data-width="300">
        
</div> */}
            {/* <Link to=""><span className="google"></span><span id="googleOAuth"></span></Link> */}
            <div id="googleOAuth"></div>
            <Link to="/apple"><span className="apple"></span><span >Continue with apple</span></Link>
            <Link to="/facebook"><span className="facebook"></span><span >Continue with facebook</span></Link>
        </div>
        <div className="guest">Play as Guest</div>
        </div>
    </div>
    
    </>
}
