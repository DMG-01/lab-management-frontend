import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import test from "node:test";

interface ResultInterface {
  testVisitNumber : number, 
  serviceId : number, 
  parameterTemplateId : number, 
  result : string 
}

function ViewRegister() {
  const { id } = useParams<{ id: string }>();
  const [registerDetail, setRegisterDetail] = useState<any>(null);
  const [result, setResult] = useState<any>()
  const [resultValue, setResultValue] = useState<string>()
  const [isEditing, setIsEditing] = useState(false)

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

  useEffect(() => {
    if (id) {
      getRegisterDetail();
    }
  }, [id]);

  return (
    <div className="viewRegister">
      <div className="viewRehHeading">
        <div className="name">
          <h3>Name : {registerDetail?.patient?.firstName} {registerDetail?.patient?.lastName}</h3>
        </div>
        <div className="phoneNumber">
          <h3>Phone Number : {registerDetail?.patient?.phoneNumber}</h3>
        </div>
        <div className="email">
          <h3>Email : {registerDetail?.patient?.email}</h3>
        </div>
        <div className="date">
          <h3>Date Taken : {registerDetail?.dateTaken}</h3>
        </div>
        <div className="amountPaid">
          <h3>Amount Paid : #{registerDetail?.amountPaid}</h3>
        </div>

        <div><button onClick={ ()=> setIsEditing(true)}>edit</button></div>

        {isEditing &&
        <div>
          <input type="text" value = {resultValue} onChange={(e)=> {setResultValue(e.target.value)}} />
          <button  onClick = { async ()=> {

            try {
              const response = await axios.patch(`http://localhost:5000/staff/Result/edit`, {
                serviceId : result.serviceId, 
                resultId : result.id,
                newValue : resultValue
              })

            if(response.status === 200) {
              alert(` result change successful`)
            }
            }catch(error) {
              alert(error)
            }
          }}>save</button>
          </div>
        
        }
      </div>

      <div className="registerServices">
  <h3>Services:</h3>
  {registerDetail?.services?.map((eachService: any) => (
    <div className="eachService" key={eachService.id}>
      <h4>Test: {eachService.name}</h4>
      <p>Price: #{eachService.price}</p>

     <div className="parameters">
  <h5>Parameters:</h5>

<div className="eachServiceResult">
  {
    !eachService?.testResult || eachService.testResult.length === 0 ? (
      <p>no result found</p>
    ) : (
      eachService.testResult.map((eachResult: any) => (
        <div className="resultComponent" key={eachResult.id}>
          <button onClick = {()=> {
            setResult(eachResult)
            setResultValue(eachResult.value)
          }}>
          <p>{eachResult.parameter.name}</p>
          <p>{eachResult.value}</p>
          <p>{eachResult.parameter.referenceValue}{eachResult.parameter.unit}</p>
          </button>
        </div>
      ))
    )
  }
</div>

</div>

    </div>
  ))}
</div>

    </div>
  );
}

export default ViewRegister;
