import { Navigate, useLocation } from "react-router-dom";
import useCurrentUser from "../shared/hooks/useCurrentUser";

function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();
  // const { user, loading } = useCurrentUser();

  // if (!user && !loading) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  return children;
}

export default RequireAuth;
