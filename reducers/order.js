import moment from 'moment';
import { GET_ORDERS, LOADING_ORDERS, LOADING_ORDER_DETAILS, GET_ORDER_DETAILS, FAIL_GET_ORDERS, FAIL_GET_ORDER_DETAILS, UPDATE_ORDER_STATUS } from '../utils/constant';

const initialState = {
  loading: false,
  list: [],
  details: [],
  loadingDetails: false
};

const orders = (state=initialState, {type, payload}) => {
  switch(type) {

    case GET_ORDERS: {
      return {
        ...state,
        loading: false,
        list: payload
      }
    }

    case LOADING_ORDERS: {
      return {
        ...state,
        loading: true
      }
    }

    case LOADING_ORDER_DETAILS: {
      return {
        ...state,
        loadingDetails: true
      }
    }

    case GET_ORDER_DETAILS: {
      return {
        ...state,
        loadingDetails: false,
        details: [...state.details, payload]
      }
    }

    case FAIL_GET_ORDERS: {
      return {
        ...state,
        loading: false
      }
    }

    case FAIL_GET_ORDER_DETAILS: {
      return {
        ...state,
        loadingDetails: false
      }
    }

    case UPDATE_ORDER_STATUS: {
      return {
        ...state,
        list: state.list.map( order => {
          if(order.OrderNumber === payload.orderNumber && order.Date === payload.currentDate) {
            if(!order.OrderStatus.toUpperCase().includes("REV")){
              order.OrderStatus+= "-reviewed"
            }
          }
          return order;
        })
      }
    }


    default: {
      return state;
    }
  }
};

export default orders;
