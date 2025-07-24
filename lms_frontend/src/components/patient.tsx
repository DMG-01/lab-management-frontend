import axios from "axios";
import Navigation from "./navigation"
import {useNavigate} from "react-router-dom"
import { useState, useEffect } from "react";

function Patient() {
    const navigate = useNavigate()
  const [patient, setPatientDetails] = useState<any[]>([]);
  const [patientFirstName, setPatientFirstName]= useState<string>()
  const [patientLastName, setPatientlastName] = useState<string>()
  const [patientPhoneNumber, setPatientPhoneNumber] = useState<string>()
  const [patientMail, setPatientMail] = useState<string>()

  const allPatient = async () => {

    const filters : any  = {}
    filters.firstName = patientFirstName
    filters.lastName = patientLastName, 
    filters.phoneNumber = patientPhoneNumber, 
    filters.email = patientMail
    try {
     const response = await axios.get(`http://localhost:5000/staff/patientHistory`, {
  params: {
    firstName: patientFirstName,
    lastName: patientLastName,
    phoneNumber: patientPhoneNumber,
    email: patientMail
  },
  withCredentials: true
});

      if (response.status === 200) {
        setPatientDetails(response.data._patientHistory);
      } else {
        alert(response.status);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    allPatient();
  }, [patientFirstName, patientLastName, patientPhoneNumber, patientMail]);

  const handleRowClick = (patient: any) => {
    navigate(`/viewPatientDetail/${patient.id}`)
    console.log("Clicked patient:", patient);
  };

  return (
    <div className="patientBody">
        <Navigation/>
      <div>
        <button className="back_btn">
          <i className="bi bi-arrow-left"></i> back
        </button>

        <div className="patientNavigation">
          <input type="text" placeholder="firstName" value = {patientFirstName} onChange= {(e)=> {setPatientFirstName(e.target.value)}} />
          <input type="text" placeholder="lastName"  value = {patientLastName}  onChange = {(e)=> {setPatientlastName(e.target.value)}}/>
          <input type="text" placeholder="phoneNumber" value = {patientPhoneNumber} onChange = {(e)=>{setPatientPhoneNumber(e.target.value)}}/>
          <input type="text" placeholder="patientMail" value ={patientMail} onChange={((e)=> {setPatientMail(e.target.value)})} />
        </div>

        <div className="patientOverview" >
            <div><h2>Patient Overview</h2></div>
            <div className="overviewDisplay">
                <div className="overViewCard">
                    <h2>{patient.length}</h2>
                    <p>No of Patients</p>
                </div>


                <div className="overViewCard">
                    <h2>{patient.length}</h2>
                    <p>No of Patients</p>
                </div>


            </div>
        </div>
      </div>

      <div className="table">
        <table border={1}>
          <thead>
            <tr>
                <th>S/n</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>No of Visits</th>
            </tr>
          </thead>
          <tbody>
            {patient.map((_patient: any, index: number) => (
              <tr
                key={index}
                onClick={() => handleRowClick(_patient)}
                style={{ cursor: "pointer" }} // make it look clickable
              > <td>{index + 1}</td>
                <td>{_patient.firstName}</td>
                <td>{_patient.lastName}</td>
                <td>{_patient.phoneNumber}</td>
                <td>{_patient.email}</td>
                <td>{_patient.dateOfBirth}</td>
                <td>{_patient.tests?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Patient;
