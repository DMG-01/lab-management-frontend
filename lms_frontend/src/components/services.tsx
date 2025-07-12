import axios from "axios";
import { useState, useEffect } from "react";
import Navigation from "./navigation"
import {useNavigate} from "react-router-dom";

interface Service {
  id: number;
  name: string;
  price: number;
  updatedAt: string;
  createdAt : string;
}

function Services() {

    const navigate = useNavigate()
  const [services, setServices] = useState<Service[]>([]);
  const [addingNewService, setAddingNewService] = useState(false)
  const [newServiceName, setNewServiceName] = useState<string>()
  const [newServicePrice, setNewServicePrice] = useState<string>()

  const viewMore = (serviceId : number) =>{
    navigate(`/services/${serviceId}`)
  }
  const getServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/service/");
      console.log(response.status);
      setServices(response.data._AllServices);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
const addNewService = async () => {
  alert(`clicked`);
  try {
    if (!newServiceName || !newServicePrice) {
      alert(`empty input field`);
    } else {
      const response = await axios.post("http://localhost:5000/service", {
        name: newServiceName,
        price: Number(newServicePrice), // ✅ FIXED LINE
      });

      alert(response.status);

      if (response.status === 200 || response.status === 201) {
        alert("new service added");
        setNewServiceName(undefined);
        setNewServicePrice(undefined);
        setAddingNewService(false);
        getServices(); // ✅ this is fine
      }
    }
  } catch (error: any) {
    console.error(error);
    alert(error?.response?.data?.msg || "Error occurred");
  }
};


  useEffect(() => {
    getServices();
  }, [addingNewService]);

  return (
    <div className="serviceBody">
    <Navigation />
    <div className="serviceSection">
      <div className="serviceHeading">
        <div>
          <h2
          >Service Management</h2>
        </div>
        <div>
          <p>Track and monitor services and their parameter</p>
        </div>
      </div>

      <div className="serviceFiltering">
        <div>
          <input type="text" placeholder=" 🔍 search by name" />
        </div>

        <div><button  onClick={()=> {setAddingNewService(true)}}><i className="bi bi-plus">New service</i></button></div>
      </div>

    {

      !addingNewService

      &&
      <div>
      <div className="servicePlaceholder">
        <div>
          <h3>s/n</h3>
        </div>
        <div>
          <h3>name</h3>
        </div>
        <div>
          <h3>price</h3>
        </div>
        <div>
          <h3>updatedAt</h3>
        </div>

        <div>

        </div>
      </div>

      <div className="eachServices">
        {services.map((service, index) => (
          <div className="eachServiceComponent" key={service.id}>
            <p>{index + 1}</p>
            <p>{service.name}</p>
            <p>{service.price}</p>
            <p>{new Date(service.updatedAt).toLocaleDateString()}</p>

            <p><button onClick = {()=>{viewMore(service.id)}}><i className="bi bi-three-dots-vertical"></i></button></p>
          </div>
        ))}
      </div>

      </div>

}

      {
        addingNewService

        &&
        <div className="addNewService">
        <div className="eachInput">
          <div><p>Service Name*</p></div>
          <div><input type="text" placeholder="service name"  value= {newServiceName}   onChange={(e)=> {setNewServiceName(e.target.value)}}/></div>
        </div>

        <div className="eachInput">
          <div><p>Service Price</p></div>
          <div><input type="text" placeholder="service price" value= {newServicePrice}  onChange={(e)=> {setNewServicePrice(e.target.value)}} /></div>
        </div>

        <div className="newButtons">
          <button onClick = {()=> {setAddingNewService(false)}}>Back</button>
          <button  onClick={()=>addNewService()}>SAVE</button></div>
      </div>

}
    </div>
    </div>
  );
}

export default Services;
