import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../css/InsideMessages.css';
import Axios from 'axios';
import { SET_ADMIN_LISTMESSAGES, SET_ORDERS_DATA } from '../../redux/types/types';
import MessagesInbox from '../../undercomponents/jsx/MessagesInbox';
import { motion } from 'framer-motion';

function InsideMessages() {

   const { userID } = useParams();

   const navigate = useNavigate();
   const dispatch = useDispatch();
  
   const loginstatus = useSelector(state => state.logincredentials.status);
   const adminID = useSelector(state => state.logincredentials.adminID);
   const adminNav = useSelector(state => state.adminNav);
   const adminlistmessages = useSelector(state => state.adminlistmessages);
   const ordersdata = useSelector(state => state.ordersdata);

   const [searchdata, setsearchdata] = useState("");

   useEffect(() => {
      Axios.get(`http://localhost:3001/messagesAdmin/${adminID}`, {
          headers:{
              "x-access-token": localStorage.getItem('token')
          }
      }).then((response) => {
          dispatch({type: SET_ADMIN_LISTMESSAGES, adminlistmessages: response.data});
      }).catch((err) => console.log(err));
   }, [adminID, adminlistmessages]);

//    useEffect(() => {
//        if(!userID){
//         dispatch({type: SET_ORDERS_DATA, ordersdata: {}});
//        }
//    }, [userID])

   const btnSearcher = () => {
        Axios.get(`http://localhost:3001/userOrdersData/${searchdata}`, {
            headers:{
                "x-access-token": localStorage.getItem('token')
            }
        }).then((response) => {
            setsearchdata("");
            dispatch({type: SET_ORDERS_DATA, ordersdata: response.data});
            console.log(ordersdata);
        }).catch((err) => console.log(err));
   }

   const chatSeller = (shopIDidentifier) => {
       navigate(`/home/messages/${shopIDidentifier}`);
   }

  return (
    <div id='div_messages'>
      <nav id='nav_messages'>
          <li className='li_messages'>
              <h4>Messages</h4>
              <nav id='nav_list_messages'>
                {adminlistmessages.length == 0? (
                    <h4 id='label_noh4'>No Messages</h4>
                ) : (
                    adminlistmessages.map((list) => {
                        return(
                            <Link to={`/home/messages/${list.from == adminID? list.to : list.from}`} className='link_messages'>
                                <li className='li_list_messages'>
                                    <nav id='nav_list_ind'>
                                        <li>
                                            <img src='http://localhost:3001/profileImgs/Default_Male.jpg' className='img_container'/>
                                        </li>
                                        <li>
                                            <table className='tbl_message_list'>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <h4 className='label_h4'>{list.from == adminID? list.to : list.from}</h4>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p className='label_p'>{list.from == adminID? list.message_content : list.message_content}</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </li>
                                    </nav>
                                </li>
                            </Link>
                        )
                    })
                )}
              </nav>
          </li>
          <motion.li className='li_messages'
          animate={{
              width: userID? "50%" : "75%"
          }}
          >
              {userID? (
                  <MessagesInbox />
              ) : (
                <div id='div_background_drop'></div>
              )}
          </motion.li>
          <motion.li className='li_messages'
          animate={{
              display: userID? "block" : "none"
          }}
          >
              <nav id='nav_scan'>
                  <li>
                      <h4>Orders Navigation</h4>
                  </li>
                  <li>
                      <span><input type='text' name='search_scan' id='search_scan' value={searchdata} onChange={(e) => {setsearchdata(e.target.value)}} placeholder='Search for an Order ID'/></span>
                  </li>
                  <li>
                      <span><button id='btn_searcher' disabled={searchdata == ""? true:false} onClick={btnSearcher}>Search</button></span>
                  </li>
                  <li id='li_searcher_container'>
                      {Object.keys(ordersdata).length == 0? (<h4 id='label_h4'>Search to Navigate Orders</h4>) : (
                          <div>
                              <h4>Order Details</h4>
                              <nav id='nav_searcher_result'>
                                    <li>
                                        <img src={ordersdata.results.result_two.var_img} id='var_img_container' />
                                    </li>
                                    <li>
                                        <h4>{ordersdata.results.result_one.order_id}</h4>
                                        <table id='tbl_search_results'>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p id='receiver_label'><b>Username: </b></p>
                                                    </td>
                                                    <td>
                                                        <p id='receiver_label'>{ordersdata.results.result_one.user_id}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p id='receiver_label'><b>Receiver: </b></p>
                                                    </td>
                                                    <td>
                                                        <p id='receiver_label'>{ordersdata.results.result_one.receiver}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p id='receiver_label'><b>Delivery Address: </b></p>
                                                    </td>
                                                    <td>
                                                        <p id='receiver_label'>{ordersdata.results.result_one.fulladdress}, {ordersdata.results.result_one.province}, {ordersdata.results.result_one.postalCode}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </li>
                                </nav>
                                <motion.nav id='nav_searcher_result'
                                animate={{
                                    backgroundColor: ordersdata.results.result_one.status == "Pending"? "orange" : ordersdata.results.result_one.status == "OnDelivery"? "lime" : ordersdata.results.result_one.status == "Received"? "limegreen" : ordersdata.results.result_one.status == "Cancelled"? "red" : "black"
                                }}
                                >
                                    <li>
                                        <table id='tbl_search_results'>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p id='receiver_label'>{ordersdata.results.result_one.status} - {ordersdata.results.result_one.remarks}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </li>
                                </motion.nav>
                                <nav id='nav_searcher_result'>
                                    <li>
                                        <table id='tbl_search_results'>
                                            <tbody>
                                                <tr>
                                                    <td className='tbl_product_details'>
                                                        <p id='receiver_label'><b>Product ID: </b></p>
                                                    </td>
                                                    <td>
                                                        <p id='receiver_label' className='label_id'>{ordersdata.results.result_one.product_id}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className='tbl_product_details'>
                                                        <p id='receiver_label'><b>Variety ID: </b></p>
                                                    </td>
                                                    <td>
                                                        <p id='receiver_label' className='label_id'>{ordersdata.results.result_one.var_id}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </li>
                                </nav>
                                <nav id='nav_searcher_result'>
                                    <li>
                                        <table id='tbl_search_results'>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p id='receiver_label'><b>Payment Status: </b></p>
                                                    </td>
                                                    <td>
                                                        <p id='receiver_label'>{ordersdata.results.result_one.payment_status == "paid"? "Paid" : "Not Paid Yet"}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p id='receiver_label'><b>Payment Method: </b></p>
                                                    </td>
                                                    <td>
                                                        <p id='receiver_label'>{ordersdata.results.result_one.payment_method}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p id='receiver_label'><b>Quantity: </b></p>
                                                    </td>
                                                    <td>
                                                        <p id='receiver_label'>{ordersdata.results.result_one.variety}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p id='receiver_label'><b>Total Price: </b></p>
                                                    </td>
                                                    <td>
                                                        <p id='receiver_label'> &#8369;{ordersdata.results.result_one.order_total}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </li>
                                </nav>
                                <h4>Shop Details</h4>
                                <nav id='nav_shopdetails'>
                                    <li id='li_shopimage_container'>
                                        <img src={ordersdata.results.result_three.shop_preview} id='shop_preview' />
                                    </li>
                                    <li>
                                        <table id='tbl_shop_details'>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p id='receiver_label'><b>{ordersdata.results.result_three.shopName} | {ordersdata.results.result_three.shopID}</b></p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span><button id='btn_chat' onClick={() => {chatSeller(ordersdata.results.result_three.shopID)}}>Chat</button></span>
                                                        {/* <span><button>View Shop</button></span> */}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </li>
                                </nav>
                                <h4>Customer Details</h4>
                          </div>
                      )}
                  </li>
              </nav>
          </motion.li>
      </nav>
    </div>
  )
}

export default InsideMessages