import "../app.css";
import { useState, useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";




const Dashboard = () => {
    const navigate=useNavigate()
    const [values,setvalues]=useState([])
    const up =useRef()
const data= async ()=>{
    const users= await axios.get('http://localhost:8080/api/auth/allUsers')
   setvalues(users.data)
   }
useEffect(()=>{
    data();
},[])

const update= async (a)=>{
    const id=a.target.value
   const updates= await axios.post('http://localhost:8080/api/auth/switchtoliv',{id})
  if( updates.data.msg) window.location.reload(false);
//    console.log(updates.data)
}

  return (
    <div className="App">
        <div className="container tbl">
        <table className="table ">
        <thead>
            <tr>
            <th scope="col">name</th>
            <th scope="col">email</th>
            <th scope="col">role</th>
            <th scope="col">status</th>
            <th scope="col">switch it</th>
            </tr>
        </thead>
        <tbody >
            {
            values.map((e)=>(
               
                    <tr key={e._id} >
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.role}</td>
                    <td>{e.confirmation? "confirmed":"not confirmed"}</td>
                        <td className="d-flex justify-content-center align-items-center">
                        <button type="submit"  value={e._id}  onClick={update} className="d-flex justify-content-center align-items-center h-25 w-50"></button>
                        </td>
                    </tr>
                  
            ))
        }
        </tbody>
        </table>

        </div>
       
    </div>
  );
};

export default Dashboard;