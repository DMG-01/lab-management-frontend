
import { useParams } from "react-router-dom";
import RenderServiceDetail from "./serviceRender";
import ViewRegister from "./viewRegisterPage";

function RenderServiceDetailWrapper() {
  const { id } = useParams<{ id: string }>();
  return <RenderServiceDetail serviceId={Number(id)} />;
}


function RenderViewRegisterWrapper() {
  const {id} = useParams<{id : string}>()
  return <ViewRegister id= {Number(id)} />
}

export {RenderServiceDetailWrapper, RenderViewRegisterWrapper}
