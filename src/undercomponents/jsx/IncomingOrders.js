import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { SET_INCOMING_ORDERS } from '../../redux/types/types';
import'../css/IncomingOrders.css';

function IncomingOrders() {

  const dispatch = useDispatch();
  const adminNav = useSelector(state => state.adminNav);
  const adminBranch = adminNav.map((branch) => branch.branch).join("");

  const incomingorders = useSelector(state => state.incomingorders);
  const ridersav = useSelector(state => state.ridersav);

  const [rider_id, setrider_id] = useState("");

  useEffect(() => {
      Axios.get(`http://localhost:3001/incomingorders/${adminBranch}`, {
          headers: {
              "x-access-token": localStorage.getItem('token')
          }
      }).then((response) => {
        //   console.log(ridersav);
        dispatch({type: SET_INCOMING_ORDERS, incomingorders: response.data});
      }).catch((err) => console.log(err));
    // console.log(adminBranch);
  }, [adminNav, adminBranch]);

  const controlOrder = (followOrder_id) => {
      if(rider_id == ""){
          alert("No Rider");
      }
      else{
        Axios.post('http://localhost:3001/assignRider', {
            order_id: followOrder_id,
            rider_id: rider_id
        },{
            headers:{
                "x-access-token": localStorage.getItem('token')
            }
        }).then((response) => {
            //response
            if(response.data.status){
                setrider_id("");
            }
        }).catch((err) => {console.log(err)});
      }
  }

  const confirmTransfer = (order_id_receiver) => {
    Axios.post("http://localhost:3001/confirmTransfer", {
        order_id: order_id_receiver,
        branch: adminBranch
    }, {
        headers:{
            "x-access-token": localStorage.getItem('token')
        }
    }).then((response) => {
        //alert notif
    }).catch((err) => console.log(err));
  }

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
                    <th>
                        Navigations
                    </th>
                </tr>
                {incomingorders.length == 0? (
                    <h4 className='no_label'>No Incoming Orders</h4>
                ) : incomingorders.map((orders) => {
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
                            <td>
                                <p className='label_orders'>{orders.status} <br /> {orders.remarks} <br /> {orders.payment_status} - {orders.payment_method}</p>
                            </td>
                            <td>
                                <select className='selector_class' value={rider_id} onChange={(e) => setrider_id(e.target.value)} disabled={orders.remarks == `Transferring to ${adminBranch}`? true:false} >
                                    <option default value='none'>--select a rider---</option>
                                    {ridersav.map((rdrs) => {
                                        return(
                                            <option default value={rdrs.rider_id} key={rdrs.rider_id}>{rdrs.rider_lastName}, {rdrs.rider_firstName}, {rdrs.rider_middleName}</option>
                                        )
                                    })}
                                </select>
                                <button className='selector_class' disabled={orders.remarks == `Transferring to ${adminBranch}`? true:false} onClick={() => {controlOrder(orders.order_id)}}>Retrieve Order</button>
                                <button className='selector_class' style={{display: orders.remarks == `Transferring to ${adminBranch}`? "block":"none"}} onClick={() => {confirmTransfer(orders.order_id)}}>Mark as Received</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default IncomingOrders