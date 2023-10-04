import React from "react"
import "./login.css"
import {Link, Outlet} from "react-router-dom"
export function SignUp(){
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
     
        <div className="oAuth">
            <Link to="/google"><span className="google"></span><span >Continue with Google</span></Link>
            <Link to="/apple"><span className="apple"></span><span >Continue with apple</span></Link>
            <Link to="/facebook"><span className="facebook"></span><span >Continue with facebook</span></Link>
        </div>
        <div className="guest">Play as Guest</div>
        </div>
    </div>
    
    </>
}
