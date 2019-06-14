import { FORECAST_URI, USERNAME, PW, GET_ORDERS, LOADING_ORDERS, LOADING_ORDER_DETAILS, GET_ORDER_DETAILS, FAIL_GET_ORDER_DETAILS, FAIL_GET_ORDERS, UPDATE_ORDER_STATUS } from "../utils/constant";
import axios from 'axios';

export function getOrders(userId,date) {
  return async function(dispatch) {
    try {
      dispatch({
        type:LOADING_ORDERS
      });
      const response = await axios.get(`${FORECAST_URI}/harvestorder/user/${userId}?orderdate=${date}`, { auth: {
        username: USERNAME,
        password: PW
      }});
      console.log('order response', response.data);
      dispatch({
        type: GET_ORDERS,
        payload: response.data.OrderDetailsResponse
      })
    } catch(e) {
      console.log('orders failed')
      dispatch({
        type: FAIL_GET_ORDERS
      })
    }
  }
}

export function getOrderDetails(orderNumber, companyCode) {
  return async function(dispatch) {
    try {
      dispatch({
        type: LOADING_ORDER_DETAILS
      })
      const response = await axios.get(`${FORECAST_URI}/harvestorder/${orderNumber}?companycode=${companyCode}` , {
        auth: {
          username: USERNAME,
          password: PW
        }
      });
      
      console.log('order details response', response.data);
      dispatch({
        type: GET_ORDER_DETAILS,
        payload: response.data.OrderDetailsResponse
      })
    }catch(e) {
      console.log('order details failed', e);
      dispatch({
        type: FAIL_GET_ORDER_DETAILS
      })
    }
  }
}

export function submitReviewStatus(reviewStatus, currentDate, orderNumber) {
  return async function(dispatch) {
    try {
      const response = await axios.put(`${FORECAST_URI}/harvestorder/review`, reviewStatus, {
        auth: {
          username: USERNAME,
          password: PW
        }
      }).then(response => {
        console.log("Review status response ### " + response)
      });

      dispatch({
        type: UPDATE_ORDER_STATUS,
        payload: {
          currentDate,
          orderNumber
        }
      })
      
    } catch(e) {
      console.log('submit review failed', e);
    }
  }
}
