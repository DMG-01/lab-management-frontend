
import { useParams } from "react-router-dom";
import RenderServiceDetail from "./serviceRender";

function RenderServiceDetailWrapper() {
  const { id } = useParams<{ id: string }>();
  return <RenderServiceDetail serviceId={Number(id)} />;
}

export default RenderServiceDetailWrapper;
