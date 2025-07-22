import {useState, useEffect} from "react"
import axios from "axios"


const  referralDetailOnclick =()=> {
    alert(`clicked`)
}
function Referral() {
const [referral, setReferral]= useState<any[]>([])

const returnAllReferral = async()=> {

    try {
        const response = await axios.get(`http://localhost:5000/referrals`, 
            {withCredentials: true}
        )
        if(response.status === 200) {
                setReferral(response.data.allReferral)
                
        }else {
            alert(response.status)
        }
    }catch(error) {
        alert(error)
    }
}

useEffect(()=> {
    returnAllReferral()
}, [])
    return(
        <div className="referralBody">

            <div className="table">
                <table>
                <thead>
                    <tr>
                        <th>S/n</th>
                        <th>Referral Name</th>
                        <th>Account Number</th>
                        <th>Bank Name</th>
                    </tr>
                </thead>
                <tbody>
                    {referral.map((_referral : any, index : number)=> (
                        <tr
                        key = {index}
                          style={{cursor : "pointer"}}
                            onClick = {()=> referralDetailOnclick()}>
                            <td>{index + 1}</td>
                            <td>{_referral.name}</td>
                            <td>{_referral.accountNumber}</td>
                            <td>{_referral.bankname}</td>
                          </tr>
                      
                    ))}
                </tbody>
                </table>
            </div>

        </div>
    )
}



export default Referral