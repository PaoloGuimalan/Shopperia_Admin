import { createStore, combineReducers } from 'redux'
import { setadminlistmessages, setadminnav, setconversations, setlogincredentials, setordersdata } from '../actions/setlogincredentials'
import { setbranches, setincomingorders, setondelivery, setorderstodeliver, setridersav, setshipinassigned, setshipinunassigned, setshipoutassigned, setshipoutunassigned, settransferringbranch } from '../actions/setorderslist';

const combine = combineReducers({
   logincredentials: setlogincredentials,
   adminNav: setadminnav,
   adminlistmessages: setadminlistmessages,
   conversations: setconversations,
   ordersdata: setordersdata,
   incomingorders: setincomingorders,
   ridersav: setridersav,
   orderstodeliver: setorderstodeliver,
   branches: setbranches,
   transferringbranch: settransferringbranch,
   ondelivery: setondelivery,
   shipinunassigned: setshipinunassigned,
   shipoutunassigned: setshipoutunassigned,
   shipinassigned: setshipinassigned,
   shipoutassigned: setshipoutassigned
});

const store = createStore(combine);

export default store;