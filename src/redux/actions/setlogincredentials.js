import { SET_ADMIN_LISTMESSAGES, SET_ADMIN_NAV, SET_CONVERSATIONS, SET_LOGIN_CREDENTIALS, SET_ORDERS_DATA } from "../types/types";

export const setlogincredentials = (state = {status: false, adminID: "", fullName: ""}, action) => {
    switch(action.type){
        case SET_LOGIN_CREDENTIALS:
            return action.logincredentials;
        default:
            return state;
    }
}

export const setadminnav = (state = [], action) => {
    switch(action.type){
        case SET_ADMIN_NAV:
            return action.adminNav;
        default:
            return state;
    }
}

export const setadminlistmessages = (state = [], action) => {
    switch(action.type){
        case SET_ADMIN_LISTMESSAGES:
            return action.adminlistmessages;
        default:
            return state;
    }
}

export const setconversations = (state = [], action) => {
    switch(action.type){
        case SET_CONVERSATIONS:
            return action.conversations;
        default:
            return state;
    }
}

export const setordersdata = (state = {}, action) => {
    switch(action.type){
        case SET_ORDERS_DATA:
            return action.ordersdata;
        default:
            return state;
    }
}