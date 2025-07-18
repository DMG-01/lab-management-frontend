import type Patient from "./patient";
import {useState, useEffect} from "react"


function PatientDetail (props : {patientId : number}) {
    const [patientDetail, setPatientDetail] = useState<any[]>()

    
  return(
    <div className="RenderPatientDetail">

        <div className="patientDetail">
            <div><h3>First Name : {}</h3></div>
        </div>

        </div>

  )
}

export default PatientDetail