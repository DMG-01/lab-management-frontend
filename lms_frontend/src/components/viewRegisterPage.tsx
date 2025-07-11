import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewRegister() {
  const { id } = useParams<{ id: string }>();
  const [registerDetail, setRegisterDetail] = useState<any>(null);
  const [result, setResult] = useState<any>();
  const [resultValue, setResultValue] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingServiceId, setUploadingServiceId] = useState<number | null>(null);
  const [parameterInputs, setParameterInputs] = useState<any[]>([]);
  const [uploadResultValue, setUploadResultValue] = useState<string|undefined>()

  const getRegisterDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/register/${id}`);
      if (response.status === 200) {
        setRegisterDetail(response.data.register);
      } else {
        alert("An error occurred while fetching register detail.");
      }
    } catch (error) {
      alert("Error fetching register detail.");
      console.error(error);
    }
  };

  const uploadResult = async (serviceTemplateId: number, serviceId: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/service/${serviceTemplateId}`);
      if (response.status === 200) {
        setUploadingServiceId(serviceId);
        setParameterInputs(response.data._service.testParameters);
      }
    } catch (error) {
      alert("Error fetching service parameters");
    }
  };

  useEffect(() => {
    if (id) {
      getRegisterDetail();
    }
  }, [id]);

  return (
    <div className="viewRegister">
      <div className="viewRehHeading">
        <h3>Name: {registerDetail?.patient?.firstName} {registerDetail?.patient?.lastName}</h3>
        <h3>Phone: {registerDetail?.patient?.phoneNumber}</h3>
        <h3>Email: {registerDetail?.patient?.email}</h3>
        <h3>Date Taken: {registerDetail?.dateTaken}</h3>
        <h3>Amount Paid: #{registerDetail?.amountPaid}</h3>

        <button onClick={() => setIsEditing(true)}>Edit</button>
        {isEditing && (
          <div>
            <input type="text" value={resultValue} onChange={(e) => setResultValue(e.target.value)} />
            <button
              onClick={async () => {
                try {
                  const response = await axios.patch(`http://localhost:5000/staff/Result/edit`, {
                    serviceId: result.serviceId,
                    resultId: result.id,
                    newValue: resultValue,
                  });
                  if (response.status === 200) {
                    alert("Result changed successfully");
                    setIsEditing(false);
                    getRegisterDetail(); // Refresh
                  }
                } catch (error) {
                  alert("Error saving result");
                }
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div className="registerServices">
        <h3>Services:</h3>
        {registerDetail?.services?.map((eachService: any) => (
          <div key={eachService.id} className="eachService">
            <h4>Test: {eachService.name}</h4>
            <p>Price: #{eachService.price}</p>

            <button onClick={() => uploadResult(eachService.serviceTemplateId, eachService.id)}>
              Upload Result
            </button>

            {uploadingServiceId === eachService.id && (
              <div className="uploadForm">
                {parameterInputs.map((param: any) => (
                  <div key={param.id}>
                    <p>{param.name}</p>
                    <input
                      type="text"
                      placeholder={`Enter ${param.name}`}
                      value = {uploadResultValue}
                      onChange = {(e)=>{setUploadResultValue(e.target.value)}}
                      // You can track values using another state if needed
                    />
                    <button onClick= {async ()=> {

                      if(uploadResultValue === undefined) {
                        alert("empty input string")
                      }

                      try {
                      const response = await axios.patch(`http://localhost:5000/staff/upload`, {
                        serviceId : eachService.id, 
                        parameterTemplateId : param.id, 
                        result : uploadResultValue
                      })

                      if(response.status === 200) {
                        alert(`upload successful`)
                        setUploadResultValue("")
                      }

                    }catch(error) {
                      alert(error)
                    }
                    }}>SAVE</button>
                  </div>
                ))}
              </div>
            )}

            <div className="parameters">
              <h5>Parameters:</h5>
              {!eachService?.testResult || eachService.testResult.length === 0 ? (
                <p>No result found</p>
              ) : (
                eachService.testResult.map((eachResult: any) => (
                  <div className="resultComponent" key={eachResult.id}>
                    <button
                      onClick={() => {
                        setResult(eachResult);
                        setResultValue(eachResult.value);
                      }}
                    >
                      <p>
                        {eachResult.parameter.name} ({eachResult.parameter.unit})
                      </p>
                      <p>{eachResult.value}</p>
                      <p>{eachResult.parameter.referenceValue}</p>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewRegister;
