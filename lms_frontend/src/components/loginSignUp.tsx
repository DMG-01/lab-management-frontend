import {useState, useEffect} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export  interface messageInterface {
    message : string 
    color : string 
}


function LoginSignUp() {
    const navigate = useNavigate()

    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [message, setMessage] = useState<messageInterface>()
    const [checkingSession, setCheckingSession] = useState(true);
    

     useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth", {
          withCredentials: true,
        });
        if (!mounted) return;

        if (res.status === 200) {
        
          navigate("/dashboard", { replace: true });
        }
      } catch {

      } finally {
        mounted && setCheckingSession(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [navigate]);
    const login = async (phoneNumber : string , password : string)=> {

        try {

            if(!phoneNumber|| !password) {
                setMessage({
                    message : `Input field cannot be left blank`, 
                    color : "red"
                })
                return
            }

            const response = await axios.post(`http://localhost:5000/staff/login`, {
                phoneNumber, 
                password
            }, {
                withCredentials : true
            })

            if(response.status === 202) {
                setMessage({
                    message : ` login Successful, redirecting...`, 
                    color : `#111827`
                })
                navigate("/dashboard",{replace:true})
            }

          

        }catch( error: any) {
          const status = error?.response?.status

            if(status === 404)   {

                setMessage({
                    message : `Invalid phone number `, 
                    color : `lightcoral`
                })
            } 
              if(status === 401) {
                setMessage({
                    message : `Invalid Credentials`, 
                    color : "red"
                })
            }
        }
    }
    return(
        <div className="loginSection">
        <div className="loginSignUp">
            <h1>Log In</h1>
               <div className="eachInput">
                <label htmlFor="">Phone Number</label>
                <input type="text" value = {phoneNumber} onChange = {(e)=> {setPhoneNumber(e.target.value)}} placeholder="+234*********" /> 
            </div>
            <div className="eachInput">
                <label htmlFor="">Password</label>
                <input type="password" value = {password}  onChange = { (e)=> {setPassword(e.target.value)}} placeholder="********"/>
            </div>
            <div><p style={{"color" : `${message?.color}`}}>{message?.message}</p></div>
            <div><button onClick={()=> {
                login(phoneNumber, password)
            }}>Log In</button></div>
        </div>
        </div>
    )

  
}

  export default LoginSignUp