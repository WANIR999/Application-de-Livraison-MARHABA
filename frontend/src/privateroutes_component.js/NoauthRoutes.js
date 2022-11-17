import { Outlet, Navigate } from "react-router-dom";

const NoauthRoutes = () => {
 const auth=localStorage.getItem('token')
 const url="/auth/"+localStorage.getItem("role")+"/home"
  return (
      !auth ? <Outlet/> : <Navigate to={url}/>
  );
};

export default NoauthRoutes;