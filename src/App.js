import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from './components/jsx/Login';
import Home from './authcomponents/jsx/Home';
import { useDispatch, useSelector } from 'react-redux';
import { SET_LOGIN_CREDENTIALS } from './redux/types/types';

function App() {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginstatus = useSelector(state => state.logincredentials.status);
  const logincredentials = useSelector(state => state.logincredentials);

  useEffect(() => {
    if(location.pathname == "/")
    {
      navigate("/home");
    }
  }, []) //redirector variable needed when logged out!

  useEffect(() => {
    if(loginstatus){
      navigate("/home");
    }
    else{
      navigate("/login");
    }
  }, [loginstatus]);

  useEffect(() => {
    Axios.get('http://localhost:3001/verifysessionadmin', {
      headers:{
        "x-access-token": localStorage.getItem('token')
      }
    }).then((response) => {
      if(response.data.status){
        dispatch({type: SET_LOGIN_CREDENTIALS, logincredentials: {status: response.data.status, adminID: response.data.employeeID, fullName: response.data.fullName}});
      }
      else{
        dispatch({type: SET_LOGIN_CREDENTIALS, logincredentials: {status: response.data.status, adminID: "", fullName: ""}});
      }
    }).catch(err => console.log(err));
    // console.log(logincredentials)
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home/*' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
