import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../app.css";
import FormInput from "./Forminput";
import axios from 'axios'

const Reset = () => {
  const navigate=useNavigate()
  const [errmsg,seterrmsg]=useState(false)
  const [msg,setmsg]=useState(false)
  const [values, setValues] = useState({
    email: "",
    password:"",
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const handleSubmit = async(e) => {
    e.preventDefault();
    const body={
      email:values.email,
      password:values.password,
    }
    try{
     const user= await axios.post('http://localhost:8080/api/auth/resetpassword',{...body})
     console.log(user.data)
     if(user.data.msg) navigate("/auth/"+localStorage.getItem("role")+"/home")
     if(user.data.errmsg) seterrmsg(user.data.errmsg)
    }catch(error){
        seterrmsg(error.msg)
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="App ">
      <form onSubmit={handleSubmit} className="bgf">
        <h1>Reset password</h1>
        {errmsg ? (
          <div className="alert alert-danger text-center" role="alert">{errmsg}</div>
        ):msg? (
          <div className="alert alert-success text-center" role="alert">{msg}</div>
        ):""}
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Reset;