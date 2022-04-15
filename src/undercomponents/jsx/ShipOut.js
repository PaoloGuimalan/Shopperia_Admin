import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { SET_SHIP_OUT_ASSIGNED, SET_SHIP_OUT_UNASSIGNED } from '../../redux/types/types';

function ShipOut(props) {

  const assstatus = props.assstatus;

  const dispatch = useDispatch();
  const adminNav = useSelector(state => state.adminNav);
  const adminBranch = adminNav.map((branch) => branch.branch).join("");

  const shipoutunassigned = useSelector(state => state.shipoutunassigned);
  const shipoutassigned = useSelector(state => state.shipoutassigned);

  useEffect(() => {
    Axios.get(`http://localhost:3001/shipOutUnassigned/${adminBranch}`, {
        headers:{
            "x-access-token": localStorage.getItem('token')
        }
    }).then((response) => {
        dispatch({type: SET_SHIP_OUT_UNASSIGNED, shipoutunassigned: response.data});
    }).catch(err => console.log(err));
  }, [adminBranch, adminNav]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/shipOutAssigned/${adminBranch}`, {
        headers:{
            "x-access-token": localStorage.getItem('token')
        }
    }).then((response) => {
        dispatch({type: SET_SHIP_OUT_ASSIGNED, shipoutassigned: response.data});
    }).catch(err => console.log(err));
  }, [adminNav, adminBranch]);
    
  return (
    <div id='div_shipin'>
        <h4>Orders to Ship Out | {assstatus}</h4>
        <table className='tbl_shippin'>
            <tbody>
                <tr>
                    <th>
                        Order ID
                    </th>
                    <th>
                        Status
                    </th>
                    <th>
                        {assstatus == "Unassigned"? "Date of Ship Out" : "Assigned Rider"}
                    </th>
                </tr>
                {assstatus == "Unassigned"? (
                    shipoutunassigned.length == 0? (
                        <h4 className='blank_label'>No Unassigned Orders to Ship In</h4>
                    ) : (
                        shipoutunassigned.map((orders) => {
                            return(
                                <tr>
                                    <td>
                                        <span className='details_break'>{orders.order_id}</span>
                                    </td>
                                    <td>
                                        <span className='details_break'>{orders.status}</span> <br /> <span className='details_break'>{orders.remarks}</span>
                                    </td>
                                    <td>
                                        <span className='details_break'>{orders.date_ordered}</span>
                                    </td>
                                </tr>
                            )
                        })
                    )
                ) : ""}
                {assstatus == "Assigned"? (
                    shipoutassigned.length == 0? (
                        <h4 className='blank_label'>No Assigned Orders to Ship In</h4>
                    ) : (
                        shipoutassigned.map((orders) => {
                            return(
                                <tr>
                                    <td>
                                        <span className='details_break'>{orders.order_id}</span>
                                    </td>
                                    <td>
                                        <span className='details_break'>{orders.status}</span> <br /> <span className='details_break'>{orders.remarks}</span>
                                    </td>
                                    <td>
                                        <span className='details_break'>{orders.rider_fullName}</span>
                                    </td>
                                </tr>
                            )
                        })
                    )
                ) : ""}
            </tbody>
        </table>
    </div>
  )
}

export default ShipOut