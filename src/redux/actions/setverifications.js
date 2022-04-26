import { SET_SELLER_LIST } from "../types/types";

export const setsellerlist = (state = [], action) => {
    switch(action.type){
        case SET_SELLER_LIST:
            return action.sellerlist;
        default:
            return state;
    }
}