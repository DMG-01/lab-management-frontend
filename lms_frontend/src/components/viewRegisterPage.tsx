import {useState, useEffect} from "react"
import axios from "axios"

function ViewRegister(props : {id : number}) {

    const [registerDetail, setRegisterDetail] = useState<any>()


    const getRegisterDetail = async()=> {
        
        try {
            const response = await axios.get(`http://localhost:5000/register/${props.id}`)

            if(response.status == 200) {
                setRegisterDetail(response.data.register)
                alert("register detailed gotten")
            }else {
                alert("an error occured")
            }

        }catch(error) {
            alert(error)
        }
    }

    useEffect(()=> {
        getRegisterDetail()
    }, [])

    return(
        <div className="viewRegister">
            <div className="viewRehHeading">
                <div className="name"><h3>{registerDetail?.patient.firstName}</h3></div>
                <div className="phoneNumber"><h3></h3></div>
                <div className="date"><h3></h3></div>
                <div className="amountPaid"><h3></h3></div>
                <div className="email"><h3></h3></div>
            </div>
        </div>
    )

   
}

 export default ViewRegister