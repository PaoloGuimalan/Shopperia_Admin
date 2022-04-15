import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { SET_ORDERS_TO_DELIVER, SET_TRANSFERRING_BRANCH } from '../../redux/types/types';

function TransferringBranch() {

  const dispatch = useDispatch();
  const adminNav = useSelector(state => state.adminNav);
  const adminBranch = adminNav.map((branch) => branch.branch).join("");

  const transferringbranch = useSelector(state => state.transferringbranch);

  useEffect(() => {
    Axios.get(`http://localhost:3001/tranferringList/${adminBranch}`, {
        headers: {
            "x-access-token": localStorage.getItem('token')
        }
    }).then((response) => {
        // console.log(response.data);
      dispatch({type: SET_TRANSFERRING_BRANCH, transferringbranch: response.data});
    }).catch((err) => console.log(err));
  // console.log(adminBranch);
}, [adminNav, adminBranch]);

  return (
    <div id='div_incomingOrders'>
        <table id='table_incoming'>
            <tbody>
                <tr>
                    <th>
                        Order ID
                    </th>
                    <th>
                       Item / Quantity / Price
                    </th>
                    <th>
                        Receiver Address
                    </th>
                    <th>
                        Shop Address
                    </th>
                    <th>
                        Status
                    </th>
                </tr>
                {transferringbranch.length == 0? (
                    <h4 className='no_label'>No Transferred Orders</h4>
                ) : transferringbranch.map((orders) => {
                    return(
                        <tr key={orders.order_id} className='orders_list_tr'>
                            <td>
                                <p className='label_orders'>{orders.order_id}</p>
                            </td>
                            <td>
                                <p className='label_orders'>{orders.product_id} <br /> Quantity: {orders.variety} <br /> Total Price: {orders.order_total}</p>
                            </td>
                            <td>
                                <p className='label_orders'>{orders.fulladdress}</p>
                            </td>
                            <td>
                                <p className='label_orders'>{orders.fullshopAddress}</p>
                            </td>
                            <td className={orders.status == "Pending"? "pendingBackground" : "ondeliveryBackground"}>
                                <p className='label_orders'>{orders.status} <br /> {orders.remarks} <br /> {orders.payment_status} - {orders.payment_method}</p>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default TransferringBranch