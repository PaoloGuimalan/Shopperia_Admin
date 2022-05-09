import React, { useState, useEffect } from 'react';
import '../css/InsideVerificationsSeller.css';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { SET_RIDER_LIST } from '../../redux/types/types';
import { motion } from 'framer-motion';

function InsideVerificationRider() {

  const dispatch = useDispatch();
  
  const loginstatus = useSelector(state => state.logincredentials.status);
  const adminID = useSelector(state => state.logincredentials.adminID);
  const adminNav = useSelector(state => state.adminNav);
  const riderlist = useSelector(state => state.riderlist);

  const [loaderstatus, setloaderstatus] = useState(false);

  const [searchdata, setsearchdata] = useState("");

  const [addridertoggle, setaddridertoggle] = useState(false)

  const [lastname, setlastname] = useState("");
  const [firstname, setfirstname] = useState("");
  const [middlename, setmiddlename] = useState("");

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:3001/getRiderLists/${adminNav.map((info) => info.branch)}`, {
      headers:{
        "x-access-token": localStorage.getItem('token')
      }
    }).then((response) => {
      dispatch({type: SET_RIDER_LIST, riderlist: response.data})
    }).catch((err) => {
      console.log(err);
    })
  }, [adminID, adminNav, loaderstatus]);

  const verificationProcess = (riderID, ver) => {
    const verification = ver == "disabled"? "enabled" : "disabled";
    // alert(verification);

    Axios.post('http://localhost:3001/verificationRiderProcess', {
        riderID: riderID,
        data: verification
    }, {
      headers:{
        "x-access-token": localStorage.getItem('token')
      }
    }).then((response) => {
      if(response.data.status){
        setloaderstatus(!loaderstatus);
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  const btnSearcher = () => {
    alert(searchdata);
  }

  const addRiderProcess = () => {
    const data = {
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      email: email,
      password: password,
      branch: adminNav.map((info) => info.branch)
    }

    Axios.post('http://localhost:3001/addRiderProcess', data, {
      headers:{
        "x-access-token": localStorage.getItem('token')
      }
    }).then((response) => {
      if(response.data.status){
        setloaderstatus(!loaderstatus);
        setaddridertoggle(false);
        setfirstname("");
        setmiddlename("");
        setlastname("");
        setemail("");
        setpassword("");
      }
    }).catch((err) => {
      console.log(err);
    })

    // console.log(data);
  }

  return (
    <div id='div_verifications'>
      <nav id='main_nav_verifications'>
        <li className='main_nav_verifications_li'>
          <h4>Rider List</h4>
          <button id='rider_button_add' onClick={() => {setaddridertoggle(!addridertoggle)}}>{addridertoggle? "Cancel" : "Add Rider"}</button>
          <table id='tbl_first_li'>
            <tbody>
              <tr>
                <th>Rider ID</th>
                <th>Full Name</th>
                <th>Branch</th>
                <th>Email</th>
                <th>Password</th>
                <th>Status</th>
              </tr>
              <motion.tr className='tr_lists'
                animate={{
                  display: addridertoggle? "table-row" : "none"
                }}
              >
                <td>Automated ID</td>
                <td>
                  <input type='text' className='inputs_addrider' placeholder='Last Name' value={lastname} onChange={(e) => {setlastname(e.target.value)}} />
                  <input type='text' className='inputs_addrider' placeholder='First Name' value={firstname} onChange={(e) => {setfirstname(e.target.value)}} />
                  <input type='text' className='inputs_addrider' placeholder='Middle Name' value={middlename}onChange={(e) => {setmiddlename(e.target.value)}} />
                </td>
                <td>{adminNav.map((info) => info.branch)}</td>
                <td><input type='text' className='inputs_addrider' placeholder='Email' value={email}onChange={(e) => {setemail(e.target.value)}} /></td>
                <td><input type='text' className='inputs_addrider' placeholder='Password' value={password}onChange={(e) => {setpassword(e.target.value)}} /></td>
                <td>
                  disabled<br />
                  <button className={`btn_verify`} id='pending' onClick={() => {addRiderProcess()}}>Confirm</button>
                </td>
              </motion.tr>
              {riderlist.length == 0? (
                <h4>No Rider Enlisted</h4>
              ) : (
                riderlist.map((list) => {
                  return(
                    <tr className='tr_lists' key={list.rider_id}>
                      <td>{list.rider_id}</td>
                      <td>{list.rider_lastName}, {list.rider_firstName}, {list.rider_middleName}</td>
                      <td>{list.branch}</td>
                      <td>{list.email}</td>
                      <td>{list.password}</td>
                      <td>
                        {list.acc_status}<br />
                        <button className={`btn_verify ${list.acc_status}`} onClick={() => {verificationProcess(list.rider_id, list.acc_status)}} >{list.acc_status == 'disabled'? "Enable" : "Disable"}</button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </li>
        <li className='main_nav_verifications_li'>
          <h4>Search Rider</h4>
          <nav>
            <li>
              <span><input type='text' name='search_scan' id='search_scan' value={searchdata} onChange={(e) => {setsearchdata(e.target.value)}} placeholder='Input Rider ID'/></span>
            </li>
            <li>
              <span><button id='btn_searcher' disabled={searchdata == ""? true:false} onClick={btnSearcher}>Search</button></span>
            </li>
          </nav>
        </li>
      </nav>
    </div>
  )
}

export default InsideVerificationRider