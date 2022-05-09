import { SET_BRANCHES, SET_INCOMING_ORDERS, SET_ONDELIVERY, SET_ORDERS_TO_DELIVER, SET_RIDERS_AV, SET_RIDER_LIST, SET_SHIP_IN_ASSIGNED, SET_SHIP_IN_UNASSIGNED, SET_SHIP_OUT_ASSIGNED, SET_SHIP_OUT_UNASSIGNED, SET_TRANSFERRING_BRANCH } from "../types/types";

export const setridersav = (state = [], action) => {
    switch(action.type){
        case SET_RIDERS_AV:
            return action.ridersav;
        default:
            return state;
    }
}

export const setbranches = (state = [], action) => {
    switch(action.type){
        case SET_BRANCHES:
            return action.branches;
        default:
            return state;
    }
}

export const setincomingorders = (state = [], action) => {
    switch(action.type){
        case SET_INCOMING_ORDERS:
            return action.incomingorders;
        default:
            return state;
    }
}

export const setorderstodeliver = (state = [], action) => {
    switch(action.type){
        case SET_ORDERS_TO_DELIVER:
            return action.orderstodeliver;
        default:
            return state;
    }
}

export const settransferringbranch = (state = [], action) => {
    switch(action.type){
        case SET_TRANSFERRING_BRANCH:
            return action.transferringbranch;
        default:
            return state;
    }
}

export const setondelivery = (state = [], action) => {
    switch(action.type){
        case SET_ONDELIVERY:
            return action.ondelivery;
        default:
            return state;
    }
}

export const setshipinunassigned = (state = [], action) => {
    switch(action.type){
        case SET_SHIP_IN_UNASSIGNED:
            return action.shipinunassigned;
        default:
            return state;
    }
}

export const setshipoutunassigned = (state = [], action) => {
    switch(action.type){
        case SET_SHIP_OUT_UNASSIGNED:
            return action.shipoutunassigned;
        default:
            return state;
    }
}

export const setshipinassigned = (state = [], action) => {
    switch(action.type){
        case SET_SHIP_IN_ASSIGNED:
            return action.shipinassigned;
        default:
            return state;
    }
}

export const setshipoutassigned = (state = [], action) => {
    switch(action.type){
        case SET_SHIP_OUT_ASSIGNED:
            return action.shipoutassigned;
        default:
            return state;
    }
}

export const setriderlist = (state = [], action) => {
    switch(action.type){
        case SET_RIDER_LIST:
            return action.riderlist;
        default:
            return state;
    }
}