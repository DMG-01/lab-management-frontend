import axios from "axios";
import { useState, useEffect } from "react";

function RenderServiceDetail(props: { serviceId: number }) {
  const [service, setService] = useState<any>(null);

  const getServiceDetails = async (serviceId: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/service/${serviceId}`);
      console.log(response.status);
      setService(response.data._service); // assumes _services is a single object
    } catch (error) {
      console.error("Error fetching service:", error);
    }
  };

  useEffect(() => {
    getServiceDetails(props.serviceId);
  }, [props.serviceId]);

  return (
 
    <div className="serviceDetail">
      <div className="heading">
        <p><i className="bi bi-arrow-left-short"></i> Back</p>
        <h2>Service Name : {service ? service.name : "..."}</h2>
        <h3>Price : {service? service.price :":..."} </h3>
        <h3>Service Id : {service ? service.id : "..."} </h3>
        <h3> Created AT : {service ? new Date(service.createdAt).toLocaleDateString() : "..."}</h3>
        <h3> Last Updated AT: : {service ? new Date(service.updatedAt).toLocaleDateString() : "..."}</h3>
      </div>

      <div className="testParameter">
        
            <div className="eachParamsHeading">
                <div><p>Name</p></div>
                <div><p>Unit</p></div>
                <div><p>referenceValue</p></div>
                <div><p>CreatedAt</p></div>
                <div><p>Last updated</p></div>
                <div></div>
            </div>
            {
            service?.testParameters?.map((parameter : any, index : number)=> (
                    <div className="eachParams" key={index}>
                        <p>{parameter.name}</p>
                        <p>{parameter.unit}</p>
                        <p>{parameter.referenceValue}</p>
                        <p>{parameter.createdAt}</p>
                        <p>{parameter.updatedAt}</p>
                        
                    </div>
            ))
        }
      </div>
    </div>
  );
}

export default RenderServiceDetail;
