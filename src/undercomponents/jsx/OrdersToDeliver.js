import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { SET_ORDERS_TO_DELIVER } from '../../redux/types/types';

function OrdersToDeliver() {

    const dispatch = useDispatch();
    const adminNav = useSelector(state => state.adminNav);
    const adminBranch = adminNav.map((branch) => branch.branch).join("");
  
    const orderstodeliver = useSelector(state => state.orderstodeliver);
    const ridersav = useSelector(state => state.ridersav);
    const branches = useSelector(state => state.branches);
  
    const [rider_id, setrider_id] = useState("");
    const [orderbranch, setorderbranch] = useState("");
  
    useEffect(() => {
        Axios.get(`http://localhost:3001/ordersToDeliver/${adminBranch}`, {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        }).then((response) => {
            // console.log(response.data);
          dispatch({type: SET_ORDERS_TO_DELIVER, orderstodeliver: response.data});
        }).catch((err) => console.log(err));
      // console.log(adminBranch);
    }, [adminNav, adminBranch]);

    const controlOrder = (followOrder_id) => {
        if(rider_id == "" || rider_id == "none"){
            alert("No Rider");
        }
        else{
          Axios.post('http://localhost:3001/deliveryRider', {
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

    const transferBranch = (updationID) => {
        if(orderbranch == "" || orderbranch == "none"){
            alert("No Branch to Transfer");
        }
        else{
            Axios.post("http://localhost:3001/transferBranch", {
                order_id: updationID,
                branch: orderbranch
            }, {
                headers:{
                    "x-access-token": localStorage.getItem('token')
                }
            }).then((response) => {
                //receive alert
            }).catch((err) => console.log(err));
        }
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
                {orderstodeliver.length == 0? (
                    <h4 className='no_label'>No Orders to Deliver</h4>
                ) : orderstodeliver.map((orders) => {
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
                            <td>
                                <select className='selector_class_otd' value={rider_id} disabled={orders.status == "Pending" ? true:false} onChange={(e) => setrider_id(e.target.value)}>
                                    <option default value='none'>--select a rider---</option>
                                    {ridersav.map((rdrs) => {
                                        return(
                                            <option default value={rdrs.rider_id} key={rdrs.rider_id}>{rdrs.rider_lastName}, {rdrs.rider_firstName}, {rdrs.rider_middleName}</option>
                                        )
                                    })}
                                </select>
                                <button className='selector_class_otd' disabled={orders.status == "Pending" ? true:false} onClick={() => {controlOrder(orders.order_id)}}>Ship Out Order</button>
                                <select className='selector_class_otd' value={orderbranch} disabled={orders.status == "Pending" ? true:false} onChange={(e) => setorderbranch(e.target.value)}>
                                    <option default value='none'>--select a branch---</option>
                                    {branches.map((rdrs) => {
                                        return(
                                            <option default value={rdrs.branch} key={rdrs.branch}>{rdrs.branch}</option>
                                        )
                                    })}
                                </select>
                                <button className='selector_class_otd' disabled={orders.status == "Pending" ? true:false} onClick={() => {transferBranch(orders.order_id)}}>Transfer Branch</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default OrdersToDeliver