import "../app.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Logout = () => {
    const navigate= useNavigate()
  const onClick = async() => {
    const log= await axios.get('http://localhost:8080/api/auth/logout')
    localStorage.removeItem('token')
    localStorage.removeItem('role')
   navigate('/login')
  };

  return (
    <div>
     <button  onClick={onClick} className="btn  h-25 text-center text-light p-0 m-0">log out</button>
    </div>
  );
};

export default Logout;