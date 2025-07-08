import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./navigation";

function RenderServiceDetail(props: { serviceId: number }) {
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState("")
  const [unit, setUnit] = useState(" ")
  const [referenceValue, setReferenceValue] = useState("")
  const [newName, setNewName] = useState<string>("")
  const [newValue, setNewValue] = useState<string>(" ")
  const [newReferenceRange, setNewReferenceRange] = useState<string>(" ")

  const [parameterId, setParameterId] = useState<number>()
  const [serviceId, setServiceId] =useState<number>()
  
  const getServiceDetails = async (serviceId: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/service/${serviceId}`);
      console.log(response.status);
      setService(response.data._service); // assumes _service is a single object
    } catch (error) {
      console.error("Error fetching service:", error);
    }
  };


  const editParameter = (parameterId : number, serviceId : number, name : string, unit : string, referenceValue : string )=> {
    setEdit(true)
    try {
      setName(name)
      setUnit(unit)
      setReferenceValue(referenceValue)
      setParameterId(parameterId)
      setServiceId(serviceId)

    }catch(error) {
      console.error
    }
  }

  const returnBack = () => {
    navigate("/services");
  };

  useEffect(() => {
    getServiceDetails(props.serviceId);
  }, [props.serviceId]);

  return (
    <div className="serviceDetailBody">
      <Navigation />
      <div className="serviceDetail">
        <div className="heading">
          <div className="navBtn">
          <button className="back" onClick={returnBack}>
            <i className="bi bi-arrow-left-short">back</i>
          </button>

          <button className = "addNewProp">
            <i className="bi bi-plus">Add new</i>
          </button>
          </div>
          <h2>Service Name: {service ? service.name : "..."}</h2>
          <h3>Price: {service ? service.price : "..."} </h3>
          <h3>Service Id: {service ? service.id : "..."} </h3>
          <h3>
            Created At:{" "}
            {service?.createdAt?.includes("T")
              ? service.createdAt.split("T")[0]
              : "..."}
          </h3>
          <h3>
            Last Updated At:{" "}
            {service?.updatedAt?.includes("T")
              ? service.updatedAt.split("T")[0]
              : "..."}
          </h3>
        </div>

{
  !edit &&
        <div className="testParameter">
          <div className="eachParamsHeading">
            <div><p>Name</p></div>
            <div><p>Unit</p></div>
            <div><p>Reference Value</p></div>
            <div><p>Created At</p></div>
            <div><p>Last Updated</p></div>
            <div></div>
          </div>

          {
          
          service?.testParameters?.map((parameter: any, index: number) => (
            <div className="eachParams" key={index}>
              <p>{parameter.name}</p>
              <p>{parameter.unit}</p>
              <p>{parameter.referenceValue}</p>
              <p>
                {parameter.createdAt?.includes("T")
                  ? parameter.createdAt.split("T")[0]
                  : parameter.createdAt}
              </p>
              <p>
                {parameter.updatedAt?.includes("T")
                  ? parameter.updatedAt.split("T")[0]
                  : parameter.updatedAt}
              </p>
              <div>
                <button className="editButton" onClick={()=> {editParameter(parameter.id,parameter.serviceTemplateId, parameter.name, parameter.unit, parameter.referenceValue)}}><i className="bi bi-pencil-fill"></i></button>
                <button className="deleteButton"  onClick = {async()=> {

                  const response = await axios.delete(`http://localhost:5000/service/${parameter.serviceTemplateId}/property/${parameter.id}`)
                  if(response.status == 200) {
                    alert("successfully deleted")
                  }
                  else {
                    alert("an error occured")
                  }
                }}><i className="bi bi-trash3-fill"></i></button>
              </div>
            </div>
          ))}
          
        </div>

}
{
    edit 
    &&
<div className="editSection">
        <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder ="unit" value = {unit} onChange={(e)=> setUnit(e.target.value)} />
        <input type="text" placeholder="referenceValue" value = {referenceValue}  onChange={(e)=> setReferenceValue(e.target.value)}/>
        <button onClick={async ()=> {
          setEdit(false)
          const response = await axios.patch(`http://localhost:5000/service/${serviceId}/property/${parameterId}`,{
            name,
            unit,
            referenceValue
          })
         if(response.status === 200) {
          alert(`parameters changed successful`)
          getServiceDetails(serviceId!)
         } else {
          alert("an error occured")
         }
          }}>SAVE</button>
      </div>

      }

      <div className="addNewParameter">
        <div className="eachInput">
           <div>property name*</div>
            <div> <input type="text" placeholder="property name" value={newName} onChange={(e)=> {setNewName(e.target.value)}} /> </div>
        </div>

         <div className="eachInput">
           <div>property unit*</div>
            <div><input type="text" placeholder="property unit" value = {newValue} onChange={(e)=> {setNewValue(e.target.value)}} /></div>
        </div>

          <div className="eachInput">
           <div>reference value*</div>
            <div><input type="text" placeholder="reerence value" value={newReferenceRange} onChange={(e)=> {setNewReferenceRange(e.target.value)}} /></div>
        </div>


        <div><button onClick= {

            
          async ()=> {

            try{
             
              if(newName === "" || newValue === " " || newReferenceRange === " ") {
              alert(`empty input field`)
            }

            else {
              alert({ newName, serviceId, newValue, newReferenceRange });

            const response = await axios.patch(`http://localhost:5000/service/addProperty`,{
              "propertyName":newName, 
              "serviceId" : service.id, 
              "propertyUnit" : newValue, 
              "referenceValue" : newReferenceRange
            })

            alert(response.status)
            if(response.status == 200) {
              alert("new property added")
              getServiceDetails(serviceId!)
              setNewName(" ")
              setNewValue(" ")
              setNewReferenceRange(" ")
            }
          }
            }catch(error) {
              alert(error)
            }
            
        }
      }>ADD</button></div>
        
      </div>
      </div>

      
    </div>
  );
}

export default RenderServiceDetail;
