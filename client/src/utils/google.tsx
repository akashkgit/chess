
import { wsChanger,login, reset, setGameProps} from "../reduxFiles/configs"
export function logout(disp:any,ws:any,nav:any){
    localStorage.removeItem("jwt")
    localStorage.removeItem("username")
    localStorage.removeItem("login")
    ws.close();
    nav("/");
    disp(wsChanger({ws:null}));
    disp(login({login:false,uname:""}));
    disp(setGameProps({opp:"",start:false}));
    
    disp(reset(true));
    
    

}