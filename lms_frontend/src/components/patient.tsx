import axios from "axios";
import Navigation from "./navigation"
import {useNavigate} from "react-router-dom"
import { useState, useEffect } from "react";

function Patient() {
    const navigate = useNavigate()
  const [patient, setPatientDetails] = useState<any[]>([]);

  const allPatient = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/staff/patientHistory`);
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
  }, []);

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
              >
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
