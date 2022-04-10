import React, {useState, useEffect} from 'react'
import '../css/Login.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SET_LOGIN_CREDENTIALS } from '../../redux/types/types';

function Login() {

  const [empID, setempID] = useState("");
  const [password, setpassword] = useState("");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginstatus = useSelector(state => state.logincredentials.status);

  const loginAdmin = () => {
      Axios.post('http://localhost:3001/loginadmin', {
        employeeID: empID,
        password: password
      }).then((response) => {
          if(response.data.status){
            //   alert(response.data.message);
            dispatch({type: SET_LOGIN_CREDENTIALS, logincredentials: {status: response.data.status, adminID: response.data.employeeID, fullName: response.data.fullName}})
            localStorage.setItem('token', response.data.token);
            navigate("/home");
            // console.log(loginstatus);
          }
          else{
              alert(response.data.message);
          }
      }).catch((err) => console.log(err));
  }

  useEffect(() => {
    if(loginstatus){
        navigate("/home");
    }
  }, [loginstatus])

  return (
    <div>
        <nav id='nav_login'>
            <li>
                <h3>Login</h3>
            </li>
            <li>
                <input type='text' name='employeeID' id='employeeID' value={empID} onChange={(e) => {setempID(e.target.value)}} placeholder='Employee ID' className='input_login'/> 
            </li>
            <li>
                <input type='password' name='password' id='password' value={password} onChange={(e) => {setpassword(e.target.value)}} placeholder='Password' className='input_login'/> 
            </li>
            <li>
                <button id='btn_login' onClick={loginAdmin}>Login</button>
            </li>
        </nav>
    </div>
  )
}

export default Login