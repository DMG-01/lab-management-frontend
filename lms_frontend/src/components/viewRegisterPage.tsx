import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewRegister() {
  const { id } = useParams<{ id: string }>();
  const [registerDetail, setRegisterDetail] = useState<any>(null);

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
      </div>

      <div className="registerServices">
  <h3>Services:</h3>
  {registerDetail?.services?.map((eachService: any) => (
    <div className="eachService" key={eachService.id}>
      <h4>Test: {eachService.name}</h4>
      <p>Price: #{eachService.price}</p>

      <div className="parameters">
        <h5>Parameters:</h5>
        {eachService.template?.testParameters?.map((param: any) => (
          <div key={param.id} className="parameterItem">
            <p><strong>{param.name}</strong> ({param.unit})</p>
            <p>Ref: {param.referenceValue}</p>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

    </div>
  );
}

export default ViewRegister;
