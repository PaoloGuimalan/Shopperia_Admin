import { createStore, combineReducers } from 'redux'
import { setadminlistmessages, setadminnav, setconversations, setlogincredentials, setordersdata } from '../actions/setlogincredentials'

const combine = combineReducers({
   logincredentials: setlogincredentials,
   adminNav: setadminnav,
   adminlistmessages: setadminlistmessages,
   conversations: setconversations,
   ordersdata: setordersdata
});

const store = createStore(combine);

export default store;