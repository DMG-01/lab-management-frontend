import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./navigation";

function RenderServiceDetail(props: { serviceId: number }) {
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);

  const getServiceDetails = async (serviceId: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/service/${serviceId}`);
      console.log(response.status);
      setService(response.data._service); // assumes _service is a single object
    } catch (error) {
      console.error("Error fetching service:", error);
    }
  };

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
          <button onClick={returnBack}>
            <i className="bi bi-arrow-left-short"></i> Back
          </button>
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

        <div className="testParameter">
          <div className="eachParamsHeading">
            <div><p>Name</p></div>
            <div><p>Unit</p></div>
            <div><p>Reference Value</p></div>
            <div><p>Created At</p></div>
            <div><p>Last Updated</p></div>
            <div></div>
          </div>

          {service?.testParameters?.map((parameter: any, index: number) => (
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RenderServiceDetail;
