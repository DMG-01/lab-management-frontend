import axios from "axios";
import { useState, useEffect } from "react";
import Navigation from "./navigation"

interface Service {
  id: number;
  name: string;
  price: number;
  updatedAt: string;
  createdAt : string;
}

function Services() {
  const [services, setServices] = useState<Service[]>([]);

  const getServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/service/");
      console.log(response.status);
      setServices(response.data._AllServices);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div className="serviceBody">
    <Navigation />
    <div className="serviceSection">
      <div className="serviceHeading">
        <div>
          <h2>Service Management</h2>
        </div>
        <div>
          <p>Track and monitor services and their parameter</p>
        </div>
      </div>

      <div className="serviceFiltering">
        <div>
          <input type="text" placeholder=" 🔍 search by name" />
        </div>
      </div>

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
          <h3>createdAt</h3>
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
            <p>{new Date(service.createdAt).toLocaleDateString()}</p>
            <button ><i className="bi bi-three-dots-vertical"></i></button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Services;
