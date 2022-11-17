import { Outlet, Navigate} from "react-router-dom";

const ManagerRoutes = () => {
    // localStorage.setItem('error',"access denied")
    return (
       (localStorage.getItem('role')=='manager') ? <Outlet/> : <Navigate to='/accessdenied'/>
    );
  };
  
  export default ManagerRoutes;