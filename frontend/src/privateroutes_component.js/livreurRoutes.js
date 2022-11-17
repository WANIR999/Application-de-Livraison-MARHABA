import { Outlet, Navigate} from "react-router-dom";

const LivreurRoutes = () => {
    // localStorage.setItem('error',"access denied")
    return (
       (localStorage.getItem('role')=='livreur') ? <Outlet/> : <Navigate to='/accessdenied'/>
    );
  };
  
  export default LivreurRoutes;