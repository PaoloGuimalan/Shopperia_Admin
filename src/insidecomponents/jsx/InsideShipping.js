import React, { useState, useEffect } from 'react'
import '../css/InsideShipping.css';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import IncomingOrders from '../../undercomponents/jsx/IncomingOrders';
import OrdersToDeliver from '../../undercomponents/jsx/OrdersToDeliver';
import TransferringBranch from '../../undercomponents/jsx/TransferringBranch';
import OnDelivery from '../../undercomponents/jsx/OnDelivery';
import { SET_BRANCHES, SET_RIDERS_AV } from '../../redux/types/types';
import ShipIn from '../../undercomponents/jsx/ShipIn';
import ShipOut from '../../undercomponents/jsx/ShipOut';

function InsideShipping() {

  const [orderslistlabel, setorderslistlabel] = useState("For Ship Out");

  const adminNav = useSelector(state => state.adminNav);
  const dispatch = useDispatch();
  const adminBranch = adminNav.map((branch) => branch.branch).join("");
  // const adminBranch = useSelector(state => state.adminNav);

  const [shipstatus, setshipstatus] = useState("Ship In");
  const [assignmentstatus, setassignmentstatus] = useState("Unassigned");

  // console.log(adminNav)

  useEffect(() => {
    Axios.get(`http://localhost:3001/availriders/${adminBranch}`, {
      headers:{
        "x-access-token": localStorage.getItem('token')
      }
    }).then((response) => {
      dispatch({type: SET_RIDERS_AV, ridersav: response.data});
      // console.log(response.data);
    }).catch((err) => console.log(err));
  }, [adminNav]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/selectBranches`, {
      headers:{
        "x-access-token": localStorage.getItem('token')
      }
    }).then((response) => {
      dispatch({type: SET_BRANCHES, branches: response.data});
      // console.log(response.data);
    }).catch((err) => console.log(err));
  }, [adminNav]);

  return (
    <div id='div_insideshipping'>
      <nav id='nav_shipping'>
        <li className='li_shipping'>
          <span id='label_shipping'>Shipping Navigations | {orderslistlabel}</span>
          <span id='label_shipping_sec'>Shipping Status | {shipstatus} - {assignmentstatus}</span>
        </li>
        <li className='li_shipping'>
          <nav id='nav_selections_shipping'>
            <li className='li_selections_shipping'>
              <nav id='nav_incoming_shipping'>
                <li className='li_incoming_shipping'>
                  <nav id='nav_btns'>
                    <li>
                      <button className='nav_btns_indv' onClick={() => setorderslistlabel("For Ship Out")}>Incoming Orders</button>
                    </li>
                    <li>
                      <button className='nav_btns_indv' onClick={() => setorderslistlabel("In Warehouse")}>Orders to Deliver</button>
                    </li>
                    <li>
                      <button className='nav_btns_indv' onClick={() => setorderslistlabel("Transferring to")}>Transferring Branch</button>
                    </li>
                    <li>
                      <button className='nav_btns_indv' onClick={() => setorderslistlabel("Out for Delivery")}>On Delivery</button>
                    </li>
                  </nav>
                </li>
                <li className='li_incoming_shipping'>
                  {orderslistlabel == "For Ship Out"? <IncomingOrders /> : ""}
                  {orderslistlabel == "In Warehouse"? <OrdersToDeliver /> : ""}
                  {orderslistlabel == "Transferring to"? <TransferringBranch /> : ""}
                  {orderslistlabel == "Out for Delivery"? <OnDelivery /> : ""}
                </li>
              </nav>
            </li>
            <li className='li_selections_shipping'>
              <nav id='nav_incoming_shipping'>
                <li className='li_incoming_shipping'>
                  <nav id='nav_btns_sec'>
                    <li className='li_btns_sec'>
                      <nav id='nav_btns_ins'>
                        <li>
                          <button className='nav_btns_indv' onClick={() => {setshipstatus("Ship In")}}>Ship In</button>
                        </li>
                        <li>
                          <button className='nav_btns_indv' onClick={() => {setshipstatus("Ship Out")}}>Ship Out</button>
                        </li>
                      </nav>
                    </li>
                    <li className='li_btns_sec'>
                      <nav id='nav_btns_inside'>
                        <li>
                          <button className='nav_btns_indv' onClick={() => {setassignmentstatus("Unassigned")}}>Unassigned Orders</button>
                        </li>
                        <li>
                          <button className='nav_btns_indv' onClick={() => {setassignmentstatus("Assigned")}}>Assigned Orders</button>
                        </li>
                      </nav>
                    </li>
                  </nav>
                </li>
                <li className='li_incoming_shipping_low'>
                  {shipstatus == "Ship In" ? <ShipIn assstatus={assignmentstatus} /> : ""}
                  {shipstatus == "Ship Out"? <ShipOut assstatus={assignmentstatus} /> : ""}
                </li>
              </nav>
            </li>
          </nav>
        </li>
      </nav>
    </div>
  )
}

export default InsideShipping