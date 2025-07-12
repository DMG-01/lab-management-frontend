import { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import Navigaton from "./navigation"
import {useNavigate} from "react-router-dom"
import 'bootstrap-icons/font/bootstrap-icons.css';

function Register() {

  const navigate = useNavigate()
  const [patients, setPatients] = useState([]);
  const [registeringPatient, isRegisteringPatient] = useState(false)
  const [services, setServices] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [onServiceClick, setServiceClick] = useState(false);
  const [patientServices, setPatientServices] = useState<string[]>([]);
  const [serviceTemplatesIds, setServiceTemplateIds] = useState<number[]>([]);

  // Fetch registered patients
  const getRegister = async () => {
    try {
      const response = await axios.get("http://localhost:5000/register");
      setPatients(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch available services
  const getAvailableServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/service");
      setServices(response.data._AllServices);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMouseEnter = async () => {
    setServiceClick((current) => !current);
    await getAvailableServices();
  };

  const addService = (service: string, serviceId: number): void => {
    if (!patientServices.includes(service)) {
      setPatientServices((prev) => [...prev, service]);
      setServiceTemplateIds((prev) => [...prev, serviceId]);
    }
  };

  const removeService = (serviceName: string, serviceId: number): void => {
    setPatientServices((prev) =>
      prev.filter((s) => s !== serviceName)
    );
    setServiceTemplateIds((prev) =>
      prev.filter((id) => id !== serviceId)
    );
  };

  const submit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/register", {
        patientData: {
          firstName,
          lastName,
          phoneNumber,
          email,
          amountPaid,
        },
        selectedTemplateIds: serviceTemplatesIds,
      });
      isRegisteringPatient(false)
      alert("Submitted!");
      
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  useEffect(() => {
    getRegister();
  }, []);

  return (
    <div className ="registerBody">
    <Navigaton />
    <div className="register">
      <div className="top">
        <div>
          <h4 className="text-4xl font-bold text-blue-600">G.G able medical laboratory</h4>
        </div>
        <div>
          <button onClick = {()=> isRegisteringPatient(true)}>
            Register <i className="bi bi-pencil-square"></i>
          
          </button>
        </div>
      </div>

      <div className="sectionName">REGISTER</div>
{
  !registeringPatient
  &&
      <div className="register">
        <div className="head">
          <h3>lab number</h3>
          <h3>first name</h3>
          <h3>last name</h3>
          <h3>status</h3>
          <h3>amount paid</h3>
          <h3>phone number</h3>
          <h3>date</h3>
          <h3>services</h3>
        </div>

        {patients.map((patient: any, index) => (
          <div className="body" key={index}>
            <button  onClick={()=> {navigate(`/viewRegisterPage/${patient.id}`)}}>
            <p>{index + 1}</p>
            <p>{patient.patient?.firstName || "-"}</p>
            <p>{patient.patient?.lastName || "-"}</p>
            <p>{patient.status}</p>
            <p>{`#${patient.amountPaid}`}</p>
            <p>{patient.patient?.phoneNumber || "-"}</p>
            <p>{patient.dateTaken}</p>
            <p>
              {patient.services && patient.services.length > 0 ? (
                patient.services.map((service: any, i: number) => (
                  <span key={i}>
                    {service.name}
                    {i < patient.services.length - 1 ? ", " : ""}
                  </span>
                ))
              ) : (
                "-"
              )}
            </p>
            </button>
          </div>
        ))}
      </div>

}

{  registeringPatient
&&
      <div className="addRegister">
        <div className="heading">
          <h2>REGISTER PATIENT</h2>
          <h4 className="ptnDet">PATIENT DETAIL</h4>
        </div>

        <div className="regInput">
          <div className="one">
            <label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="first name*"
              />
            </label>
            <label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="last name*"
              />
            </label>
          </div>

          <div className="two">
            <label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="phone number*"
              />
            </label>
            <label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
              />
            </label>
          </div>

          <div className="three">
            <label>
              <input
                type="text"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                placeholder="amount paid"
              />
            </label>

            <div style={{ position: "relative" }}>
              <label className="services">
                <div className="services_display">
                  {patientServices.map((service, index) => (
                    <div className="registeredService" key={index}>
                      {service}
                      <button
                        className="removeService"
                        onClick={() =>
                          removeService(service, serviceTemplatesIds[index])
                        }
                      >
                        <i className="bi bi-x"></i>
                      </button>
                    </div>
                  ))}
                </div>
                <button className="displayServices" onClick={handleMouseEnter}>
                  services <i className="bi bi-arrow-down"></i>
                </button>
              </label>

              {onServiceClick && services.length > 0 && (
                <div className="services-dropdown">
                  <ul>
                    {services.map((service: any, index: number) => (
                      <li key={index}>
                        <button
                          id={`service-${service.id}`}
                          onClick={() =>
                            addService(service.name, service.id)
                          }
                        >
                          {service.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="submit">
            <button onClick = {()=> isRegisteringPatient(false)}>
              <i className="bi bi-arrow-return-left"></i>
            </button>
            <button onClick={submit}>SUBMIT</button>
          </div>
        </div>
      </div>

      }
      </div>
    </div>
  );
}

export default Register;
