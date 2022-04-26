import React, { useState, useEffect } from 'react';
import '../css/InsideVerificationsSeller.css';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { SET_SELLER_LIST } from '../../redux/types/types';

function InsideVerificationsSeller() {

  const dispatch = useDispatch();
  
  const loginstatus = useSelector(state => state.logincredentials.status);
  const adminID = useSelector(state => state.logincredentials.adminID);
  const adminNav = useSelector(state => state.adminNav);
  const sellerlist = useSelector(state => state.sellerlist);

  const [loaderstatus, setloaderstatus] = useState(false);

  const [searchdata, setsearchdata] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:3001/getSellerLists/${adminNav.map((info) => info.branch)}`, {
      headers:{
        "x-access-token": localStorage.getItem('token')
      }
    }).then((response) => {
      dispatch({type: SET_SELLER_LIST, sellerlist: response.data})
    }).catch((err) => {
      console.log(err);
    })
  }, [adminID, adminNav, loaderstatus]);

  const verificationProcess = (shopID, ver) => {
    const verification = ver == "unverified"? "verified" : "unverified";
    // alert(verification);

    Axios.post('http://localhost:3001/verificationSellerProcess', {
        shopID: shopID,
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
  
  
  return (
    <div id='div_verifications'>
      <nav id='main_nav_verifications'>
        <li className='main_nav_verifications_li'>
          <h4>Seller List</h4>
          <table id='tbl_first_li'>
            <tbody>
              <tr>
                <th>Seller ID</th>
                <th>Shop Name</th>
                <th>Full Name</th>
                <th>Address</th>
                <th>Email / Contact #</th>
                <th>Status</th>
              </tr>
              {sellerlist.length == 0? (
                <h4>No Seller Enlisted</h4>
              ) : (
                sellerlist.map((list) => {
                  return(
                    <tr className='tr_lists' key={list.shopID}>
                      <td>{list.shopID}</td>
                      <td>{list.shopName}</td>
                      <td>{list.full_name}</td>
                      <td>{list.fullAddress}</td>
                      <td>{list.email}<br />{list.contactNumber}</td>
                      <td>
                        {list.ver_status_two}<br />
                        <button className={`btn_verify ${list.ver_status_two}`} onClick={() => {verificationProcess(list.shopID ,list.ver_status_two)}}>{list.ver_status_two == 'unverified'? "Verify" : "Unverfiy"}</button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </li>
        <li className='main_nav_verifications_li'>
          <h4>Search Seller</h4>
          <nav>
            <li>
              <span><input type='text' name='search_scan' id='search_scan' value={searchdata} onChange={(e) => {setsearchdata(e.target.value)}} placeholder='Input Seller ID'/></span>
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

export default InsideVerificationsSeller