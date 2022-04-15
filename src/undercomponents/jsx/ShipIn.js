import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import '../css/ShipIn.css';
import { SET_SHIP_IN_ASSIGNED, SET_SHIP_IN_UNASSIGNED } from '../../redux/types/types';

function ShipIn(props) {

  const assstatus = props.assstatus;

  const dispatch = useDispatch();
  const adminNav = useSelector(state => state.adminNav);
  const adminBranch = adminNav.map((branch) => branch.branch).join("");

  const shipinunassigned = useSelector(state => state.shipinunassigned);
  const shipinassigned = useSelector(state => state.shipinassigned);

  useEffect(() => {
    Axios.get(`http://localhost:3001/shipInUnassigned/${adminBranch}`, {
        headers:{
            "x-access-token": localStorage.getItem('token')
        }
    }).then((response) => {
        dispatch({type: SET_SHIP_IN_UNASSIGNED, shipinunassigned: response.data});
    }).catch(err => console.log(err));
  }, [adminNav, adminBranch]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/shipInAssigned/${adminBranch}`, {
        headers:{
            "x-access-token": localStorage.getItem('token')
        }
    }).then((response) => {
        dispatch({type: SET_SHIP_IN_ASSIGNED, shipinassigned: response.data});
    }).catch(err => console.log(err));
  }, [adminNav, adminBranch]);

  return (
    <div id='div_shipin'>
        <h4>Orders to Ship In | {assstatus}</h4>
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
                    {assstatus == "Unassigned"? "Date of Ship In" : "Assigned Rider"}
                    </th>
                </tr>
                {assstatus == "Unassigned"? (
                    shipinunassigned.length == 0? (
                        <h4 className='blank_label'>No Unassigned Orders to Ship In</h4>
                    ) : (
                        shipinunassigned.map((orders) => {
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
                    shipinassigned.length == 0? (
                        <h4 className='blank_label'>No Assigned Orders to Ship In</h4>
                    ) : (
                        shipinassigned.map((orders) => {
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

export default ShipIn