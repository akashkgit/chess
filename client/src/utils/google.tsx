
import { wsChanger,login} from "../reduxFiles/configs"
export function logout(disp:any,ws:any,nav:any){
    localStorage.removeItem("jwt")
    localStorage.removeItem("username")
    localStorage.removeItem("login")
    ws.close();
    nav("/");
    disp(wsChanger({ws:null}));
    disp(login({login:false}));
    

}