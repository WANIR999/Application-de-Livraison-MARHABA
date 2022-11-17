import { Outlet, Navigate } from "react-router-dom";

const ClientRoutes = () => {
   //  localStorage.setItem('error',"access denied")
    return (
       (localStorage.getItem('role')=='client') ? <Outlet/> : <Navigate to='/accessdenied'/>
    );
  };
  
  export default ClientRoutes;