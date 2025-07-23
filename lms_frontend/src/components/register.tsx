import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navigaton from "./navigation";
import "bootstrap-icons/font/bootstrap-icons.css";

function Register() {
  const navigate = useNavigate();
  const [reload, setReload]= useState(false)
  const [patients, setPatients] = useState([]);
  const [registeringPatient, isRegisteringPatient] = useState(false);
  const [services, setServices] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [onServiceClick, setServiceClick] = useState(false);
  const [patientServices, setPatientServices] = useState<string[]>([]);
  const [serviceTemplatesIds, setServiceTemplateIds] = useState<number[]>([]);

  // filtering state 
  const [filterFirstName, setFilterFirstName] = useState<string>("")
  const [filterLastName, setFilterLastName] = useState<string>("")
  const [filterStartDate, setFilterStartDate] = useState("")
  const [filterEndDate, setFilterEndDate] =  useState("")
  const [labNumber, setLabNumber] = useState("")


  // 🔢 Pagination State
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  // 🟡 Fetch registered patients (paginated)
  const getRegister = async () => {

    const queryParams : any  = {}
    if(filterEndDate) queryParams.date = filterEndDate
    if(filterFirstName) queryParams.firstName = filterFirstName
        if(filterLastName) queryParams.lastName = filterLastName
        if(filterStartDate)  queryParams.dateTaken = filterStartDate
        if(labNumber) queryParams.labNumber  = labNumber
    try {
      const response = await axios.get(
        `http://localhost:5000/register` ,
        {params : {page, 
          limit, 
          ...queryParams}, 
        withCredentials : true}
      );
      setPatients(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔵 Fetch available services
  const getAvailableServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/service", 
        {withCredentials : true}
      );
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
    setPatientServices((prev) => prev.filter((s) => s !== serviceName));
    setServiceTemplateIds((prev) => prev.filter((id) => id !== serviceId));
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
  }, {
          withCredentials : true,
  });
  setReload(prev => !prev)
      isRegisteringPatient(false);
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  useEffect(() => {
    getRegister();
  }, [page, reload, filterFirstName, filterEndDate, filterLastName, filterStartDate, labNumber]);

  return (
    <div className="registerBody">
      <Navigaton />
      <div className="register">
        <div className="top">
          <div>
            <h4>G.G able medical laboratory</h4>
          </div>
          <div className="regNav">
           

            <button onClick={() => isRegisteringPatient(true)}>
              Register <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>

        <div className="registerFiltering">
           <input type="text" placeholder="🔍 firstName" value = {filterFirstName}  onChange={(e)=> {setFilterFirstName(e.target.value)}} />
           <input type="text" placeholder="🔍 lastName"  value = {filterLastName} onChange = {(e)=> {setFilterLastName(e.target.value)}} />
           <input type="date"  value = {filterStartDate} onChange={(e)=> {setFilterStartDate(e.target.value)}}/> ---
           <input type="date" value = {filterEndDate} onChange={(e)=> {setFilterEndDate(e.target.value)}}/>
           <input type="text" placeholder="labNumber" value={labNumber} onChange={(e)=> {setLabNumber(e.target.value)}} />
        </div>

       {!registeringPatient && (
  <div className="register">
    <table className="register-table">
      <thead className="head">
        <tr>
          <th>lab number</th>
          <th>first name</th>
          <th>last name</th>
          <th>status</th>
          <th>amount paid</th>
          <th>phone number</th>
          <th>date</th>
          <th>services</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="body">
        {patients.map((patient: any, index) => (
          <tr
            key={index}
            onClick={() => navigate(`/viewRegisterPage/${patient.id}`)}
            style={{ cursor: "pointer" }}
          >
            <td>{index + 1 + (page - 1) * limit}</td>
            <td>{patient.patient?.firstName || "-"}</td>
            <td>{patient.patient?.lastName || "-"}</td>
            <td>{patient.status}</td>
            <td>{`#${patient.amountPaid}`}</td>
            <td>{patient.patient?.phoneNumber || "-"}</td>
            <td>{patient.dateTaken}</td>
            <td>
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
            </td>
            <td>
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  try {
                    const response = await axios.delete(
                      `http://localhost:5000/register/${patient.id}`,
                      { withCredentials: true }
                    );
                    if (response.status === 200) {
                      alert("successfully deleted");
                      getRegister(); // refresh data
                    }
                  } catch (error) {
                    alert("Delete failed");
                  }
                }}
              >
                <i className="bi bi-trash3-fill"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* 🟢 Pagination UI */}
    {totalPages > 1 && (
      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    )}
  </div>
)}


        {/* 🟡 Registering New Patient UI */}
        {registeringPatient && (
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
                              onClick={() => addService(service.name, service.id)}
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
                <button onClick={() => isRegisteringPatient(false)}>
                  <i className="bi bi-arrow-return-left"></i>
                </button>
                <button onClick={submit}>SUBMIT</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
