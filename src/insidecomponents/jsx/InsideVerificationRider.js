import React, { useState, useEffect } from 'react';
import '../css/InsideVerificationsSeller.css';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';

function InsideVerificationRider() {
  return (
    <div id='div_verifications'>
      <nav id='main_nav_verifications'>
        <li className='main_nav_verifications_li'>
          <h4>Rider List</h4>
          <table id='tbl_first_li'>
            <tbody>
              <tr>
                <th>Seller ID</th>
                <th>Full Name</th>
                <th>Address</th>
                <th>Email / Contact #</th>
                <th>Status</th>
              </tr>
              <tr className='tr_lists'>
                <td>Sample</td>
                <td>Sample</td>
                <td>Sample</td>
                <td>Sample</td>
                <td>Sample</td>
              </tr>
            </tbody>
          </table>
        </li>
        <li className='main_nav_verifications_li'>
          <h4>Search Rider</h4>
        </li>
      </nav>
    </div>
  )
}

export default InsideVerificationRider