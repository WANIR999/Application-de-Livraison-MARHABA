import {Outlet, Link} from "react-router-dom";
import Logout from "./logout";

const Navbar = () => {
    const homeurl="/auth/"+localStorage.getItem("role")+"/home"
    const reseturl="/auth/"+localStorage.getItem("role")+"/resetpassword"
    return (
       <div>
        <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid d-flex justify-content-between align-items-center">
            <Link to={homeurl}  className="btn navbar-brand" >marhaba</Link>
            <div className="w-25 d-flex justify-content-around align-items-center">
            <Link to={reseturl}  className="btn text-white" >Reset password</Link>
            <Logout/>
            </div>
        </div>
        </nav>
        <Outlet />
       </div>
    );
  };
  
  export default Navbar;