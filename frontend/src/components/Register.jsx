import { useState } from "react";
import "../app.css";
import FormInput from "./Forminput";
import axios from "axios"
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [errmsg,seterrmsg]=useState(false)
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "name",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body={
      name:values.name,
      email:values.email,
      password:values.password,
    }
    try{
     const user= await axios.post('http://localhost:8080/api/auth/register',{...body})
    //  console.log(user.data.msg)
     if(user.data.msg) navigate('/login')
     if(user.data.errmsg) seterrmsg(user.data.errmsg)
    }catch(error){

    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="App auth fill">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {errmsg ? (
          <div class="alert alert-danger" role="alert">{errmsg}</div>
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
        <div className="w-100 d-flex justify-content-between align-items-center pb-3">
        <Link to="/login"  className="btn text-secondary" >sign-in?</Link>
        <Link to="/forgetpassword"  className="btn text-secondary" >forget ur password?</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;