import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, Routes, Route } from 'react-router-dom';
import '../css/Home.css'
import { motion } from 'framer-motion'
import MenuIconClose from '@material-ui/icons/Menu';
import ArrowOpen from '@material-ui/icons/ArrowLeft';
import Axios from 'axios';
import { SET_ADMIN_NAV, SET_LOGIN_CREDENTIALS } from '../../redux/types/types';
import InsideHome from '../../insidecomponents/jsx/InsideHome';
import InsideMessages from '../../insidecomponents/jsx/InsideMessages';
import InsideShipping from '../../insidecomponents/jsx/InsideShipping';
import InsideVerificationsSeller from '../../insidecomponents/jsx/InsideVerificationsSeller';
import InsideVerificationBuyer from '../../insidecomponents/jsx/InsideVerificationBuyer';
import InsideVerificationRider from '../../insidecomponents/jsx/InsideVerificationRider';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import MessagesIcon from '@material-ui/icons/MessageOutlined';
import VerifIcon from '@material-ui/icons/VerifiedUser';
import ShipIcon from '@material-ui/icons/LocalShippingOutlined';
import SellerIcon from '@material-ui/icons/MoneyOutlined';
import CustomerIcon from '@material-ui/icons/Person';
import RiderIcon from '@material-ui/icons/Motorcycle';

function Home() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginstatus = useSelector(state => state.logincredentials.status);
  const adminID = useSelector(state => state.logincredentials.adminID);
  const adminNav = useSelector(state => state.adminNav);
  const [navstate, setnavstate] = useState(true);
  const [vernav, setvernav] = useState(false);

  useEffect(() => {
    if(loginstatus){
      // console.log(document.referrer);
      navigate("/home");
    }
    else{
      // console.log(document.referrer);
      navigate("/login");
    }
  }, [loginstatus]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/adminData/${adminID}`, {
      headers: {
        "x-access-token": localStorage.getItem('token')
      }
    }).then((response) => {
      dispatch({type: SET_ADMIN_NAV, adminNav: response.data})
      // console.log(adminNav);
    })
  }, [adminID]);

  const btnLogout = () => {
    localStorage.removeItem('token');
    dispatch({type: SET_LOGIN_CREDENTIALS, logincredentials: {statue:false, adminID: "", fullName: ""}})
  }

  return (
    <div id='div_home'>
      <motion.div id='div_nav'
      animate={{
        width: navstate? "250px" : "0px"
      }}
      transition={{
        bounce: 0,
        duration: 0.2
      }}
      >
        <div id='fixed_btn' onClick={() => setnavstate(!navstate)}>{!navstate? <MenuIconClose style={{fontSize: "25px"}} /> : <ArrowOpen style={{fontSize: "25px"}} />}</div>
        {adminNav.map((det) => {
          return(
            <nav id='nav_dashboard' key={det.id}>
              <li>
                <img src={det.base_preview} className='img_holder'/>
              </li>
              <li>
                <h4>{det.fullName}</h4>
              </li>
              <li>
                <Link className='link_verifier' to='/home'><span className='span_flexer'><HomeIcon style={{fontSize: "20px", marginRight: "5px"}} /><span>Home</span></span></Link>
              </li>
              <li>
                <Link className='link_verifier' to='/home/messages'><span className='span_flexer'><MessagesIcon style={{fontSize: "20px", marginRight: "5px"}} /><span>Messages</span></span></Link>
              </li>
              <li>
                <span className='span_flexer'><span className='link_verifier' onClick={() => setvernav(!vernav)}><VerifIcon style={{fontSize: "20px", marginRight: "5px"}} />Verifications</span></span>
              </li>
              <motion.li id='li_nav'
              animate={{
                height: vernav? "auto" : "0px"
              }}
              >
                <table id='tbl_selections_ver'>
                  <tbody>
                    <tr>
                      <td>
                        <Link className='link_under' to='/home/verifications/seller'><span className='span_flexer'><SellerIcon style={{fontSize: "20px", marginRight: "5px"}} /><span>Seller</span></span></Link>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link className='link_under' to='/home/verifications/customer'><span className='span_flexer'><CustomerIcon style={{fontSize: "20px", marginRight: "5px"}} /><span>Customer</span></span></Link>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link className='link_under' to='/home/verifications/rider'><span className='span_flexer'><RiderIcon style={{fontSize: "20px", marginRight: "5px"}} /><span>Rider</span></span></Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </motion.li>
              <li>
                <Link className='link_verifier' to='/home/shipping'><span className='span_flexer'><ShipIcon style={{fontSize: "20px", marginRight: "5px"}} /><span>Shipping</span></span></Link>
              </li>
              <li>
                <button onClick={() => {btnLogout()}} id='btn_logout'>Logout</button>
              </li>
            </nav>
          )
        })}
      </motion.div>
      <Routes>
        <Route path='/*' element={<InsideHome />} />
        <Route path='/messages/:userID' element={<InsideMessages />} />
        <Route path='/messages/*' element={<InsideMessages />} />
        <Route path='/shipping' element={<InsideShipping />} />
        <Route path='/verifications/seller' element={<InsideVerificationsSeller />} />
        <Route path='/verifications/customer' element={<InsideVerificationBuyer />} />
        <Route path='/verifications/rider' element={<InsideVerificationRider />} />
      </Routes>
    </div>
  )
}

export default Home