import React, { useEffect, useState } from "react"
import "./login.css"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { DirectSignUp, UserDetails } from "./DirectSignUp";
import { serverUrl } from "../specs/config";
export function authResp(token: any) {
    // alert(" inside auth serverr");
}
function tooltip(event: any) {
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
                // alert(" Error while signing in using google !");
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
        // global.google.accounts.id.initialize({
        //     client_id: "409051565209-nd3hjg4eqsq0hljd8ko9a7tiv0f7orkm.apps.googleusercontent.com",
        //     callback: resp,
        // })
        // console.log(" inside global ", global.google.id)
        // global.google.accounts.id.renderButton(document.querySelector("#googleOAuth"), { type: "Standard", size: "large", theme: "outline", width: "390", logo_alignment: "left" });
    }, [])

    let [state, setState] = useState("startState");
    let [prevState, setPrevState] = useState("");
    let [emailId, setEmailId] = useState("");
    let [pwd, setPwd] = useState("");
    let [userName, setUserName] = useState("");

    let propsData = { state, setState, emailId, setEmailId, pwd, setPwd, prevState, setPrevState }
    let goBack = () => {
        setState(prevState);
    }
    return <>
        <div className="container">
            {prevState !== "" && <span className="backArrow" onClick={goBack}></span>}
            <Link to="/login" className="signupLogin"><p>Login</p></Link>
            <div className="chessLabel3"><a>Chess.com</a></div>
            {
                [state === "startState" && <StartState {...propsData } />,
                state === "directSignup" && <DirectSignUp  {...propsData} />,
                state === "emailPwdState" && <UserDetails  {...propsData} />,
                state === "userName" && <UserName {...propsData} />
                ]


            }
        </div>

    </>
}

function UserName(props: any) {

    let { setState, emailId, pwd, setPrevState } = props;
    let nav = useNavigate();
    useEffect(() => {
        setPrevState("emailPwdState");
    }, [])
    let continueFunc = (event: any) => {
        let url = "https://s38121vp76.execute-api.us-east-1.amazonaws.com/signup";


        let username = (document.querySelector(".uname") as HTMLInputElement).value;
        let data = JSON.stringify({ emailId: emailId, password: pwd, username: username })
        console.log("singup data", data);
        fetch(url, {
            method: "POST",
            mode: "cors",
            body: data
        }).then((val) => {
            nav("/");
            // setState("userName");
        }).catch((err) => console.log("Error ", err));

    }
    return <div className="username"><div className="directCont">

        <div className="directRemComp" >
            <h1>Choose a username</h1>
            <h4>This is what your friends and other players will see when you play</h4>
        </div>

        <div className="directRemComp2" ></div>
        <div style={{ position: "relative" }}>
            <input type={"text"} className="uname" placeholder="Username" />
        </div>

        <button onClick={continueFunc}>Continue</button>

    </div>
    </div>
}

function StartState(props: { [idx: string]: any }) {




    let { setPrevState, state, setState } = props;
    useEffect(()=>{
        setPrevState("");
        
    },[])

    //------ google signin button code -------

    let global: any = window;


    function resp(cred: any) {

        let url = serverUrl+"token/signup"

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
                // alert(" Error while signing in using google !");
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


    //-------------
    return <div className="remComp">
        <h1>Create your chess.com account</h1>
        <img src="https://www.chess.com/bundles/web/images/pawn-on-board.svg"></img>
        <div ><button className="signup" onClick={() => setState("directSignup")}>signup</button></div>
        <div className="dividerDiv">
            <span className="divider"></span>
            <span className="OR ">OR</span>
            <span className="divider"></span>
        </div>
        {/* <Link to="/google"><span className="google"></span><span >Continue with Google</span></Link> */}
        <div className="oAuth">

            {/* <div onClick={authGoogle}><span className="google"></span><span id="googleOAuth"> GOogle BOogle</span></div> */}
            <div id="googleOAuth"></div>
            <Link to="/apple" ><span className="apple"></span><span >Continue with apple</span></Link>
            <Link to="/facebook"><span className="facebook"></span><span >Continue with facebook</span></Link>
        </div>
        <div className="guest">Play as Guest</div>
    </div>
}

