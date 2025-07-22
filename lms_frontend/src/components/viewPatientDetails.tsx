import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
const PatientDetail: React.FC<{ patientId: number }> = ({ patientId }) => {
    const navigate = useNavigate()
  const [patientDetail, setPatientDetail] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/staff/patientHistory/${patientId}`, 
          {withCredentials : true}
        );
        const data = await response.data;
        setPatientDetail(data.patientDetail);
      } catch (error) {
        alert("Error fetching patient detail");
      }
    };

    fetchDetails();
  }, [patientId]);

  if (!patientDetail) return <div>Loading patient details...</div>;

  return (
    <div className="patientDeatilRender">
    <div><button onClick= {
        ()=> {
            navigate("/patient")
        }
    }>Back</button></div>
    <div className="RenderPatientDetail">
      <h3>First Name: {patientDetail.firstName}</h3>
      <h3>Last Name: {patientDetail.lastName}</h3>
      <h3>Phone Number : {patientDetail.phoneNumber}</h3>
      <h3>Email : {patientDetail.email}</h3>
      <h3>dateOfBirth : {patientDetail.dateOfBirth}</h3>
    </div>

    <div className="registerVisit">
        {patientDetail.tests.map((testVisit : any, index : number)=> (
            <div className="eachVisit" key={index}>
                <div className="testVisitHead">
                <p>Status : {testVisit.status}</p>
                <p>Amount paid : {testVisit.amountPaid}</p>
                <p>Date : {testVisit.dateTaken}</p>
                <p>Referral : {testVisit.referralId}</p>
                </div>

                <div className="testVisitServices">
                    {testVisit.services.map((testVisit : any, index : number)=> (
                        <div className="eachTestVisitServices" key ={index}>
                            <p>Test : {testVisit.name} </p>
                            <p>Price :{testVisit.price}</p>
                            <p>Parameters :</p>
                            <div className="testVistServiceResult">
                                {testVisit.testResult.map((result : any, index : number)=> (
                                    <div className="eachResult" key = {index}>
                                        <p>value : {result.value}</p>
                                        <p>Parameter : {`${result.parameter.name}(${result.parameter.unit})`}</p>
                                        <p>Reference Value : {result.parameter.referenceValue}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
    </div>
  );
};

export default PatientDetail;
