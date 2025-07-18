
import { useParams } from "react-router-dom";
import RenderServiceDetail from "./serviceRender";
import ViewRegister from "./viewRegisterPage";
import Patient from "./patient";

import PatientDetail from "./viewPatientDetails"

function RenderServiceDetailWrapper() {
  const { id } = useParams<{ id: string }>();
  return <RenderServiceDetail serviceId={Number(id)} />;
}


function RenderViewRegisterWrapper() {
  const {id} = useParams<{id : string}>()
  return <ViewRegister id={Number(id)} />
}

function RenderPatientDetailWrapper() {
  const {id} = useParams<{id : string}>()
  return <PatientDetail patientId={Number(id)} />

}

export {RenderServiceDetailWrapper, RenderPatientDetailWrapper, RenderViewRegisterWrapper}
