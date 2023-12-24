import React, { useEffect } from "react"
import "./login.css"
import { Link, Outlet } from "react-router-dom"
export function authResp(token: any) {
    alert(" inside auth serverr");
}
function tooltip(event:any){
    console.log(event.target);
}
export function SignUp() {

    let global: any = window;


    function resp(cred: any) {

        let url = "http://localhost:3000/token/signup"

        type optionSpec = RequestInit;
        let options: optionSpec = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify((cred as BodyInit)),
        }
        console.log(" cred is ", cred, " body.cred ", options.body);
        fetch(url, options).then(async (succ) => {
            let resp = await succ.json();
            console.log("res ", resp)
            if (2 != succ.status / 100) {
                alert(" Error while signing in using google !");
            }
            else {
                localStorage.setItem("jwt", resp.jwt);
                localStorage.setItem("username", resp.username);
                window.location.hash = resp.url;
            }
        }).catch((err) => {
            console.log(" error ", err);
        });

    }

    useEffect(() => {
        global.google.accounts.id.initialize({
            client_id: "409051565209-nd3hjg4eqsq0hljd8ko9a7tiv0f7orkm.apps.googleusercontent.com",
            callback: resp,
        })
        console.log(" inside global ", global.google.id)
        global.google.accounts.id.renderButton(document.querySelector("#googleOAuth"), { type: "Standard", size: "large", theme: "outline", width: "390", logo_alignment: "left" });
    }, [])
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
               
                    {/* <Link to=""><span className="google"></span><span id="googleOAuth"></span></Link> */}
                    <div id="googleOAuth"></div>
                    <Link to="/apple" onClick={(ev)=>tooltip(ev)}><span className="apple"></span><span >Continue with apple</span></Link>
                    <Link to="/facebook"><span className="facebook"></span><span >Continue with facebook</span></Link>
                </div>
                <div className="guest">Play as Guest</div>
            </div>
        </div>

    </>
}
