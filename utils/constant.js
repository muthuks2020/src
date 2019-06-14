//export const API_URI = "http://18.191.102.15/api"
export const API_URI = "https://oktadevtest.gpa.driscolls.com/api"
//export const API_URI = "http://54.183.177.182/api"
//export const FORECAST_URI = 'https://tst-api.usw.driscolls.com/growermob/api/v1';
export const FORECAST_URI = 'https://dev-api.usw.driscolls.com/growermob/api/v1';
export const USERNAME = '0oa9pae0fyHxMGeQd356';
export const PW = 'lJ8Yhv9bTRxSc56U4zPISIJsM-ksttNFpZ5_Sifr';
export const AUTH_CONFIG = {
  username: USERNAME,
  password: PW
};
//Auth config
//https://dev-262954.oktapreview.com/oauth2/default	

//export const  ISSUER = 'https://dev-262954.oktapreview.com/oauth2/default'
export const  ISSUER = 'https://devtstdriscolls.oktapreview.com/oauth2/default'
export const  CLIENT_ID = '0oako75353Oh3nyQz0h7'
//export const  CLIENT_ID = '0oaj8idxriyDvGD5e0h7'

//export const  REDIRECT_URL = 'com.oktapreview.dev-262954:/callback'
//export const  REDIRECT_URL = 'dev.gpa.driscolls.com:/callback'
export const  REDIRECT_URL = 'test.gpa.driscolls.com:/callback'
export const  SCOPES = ['openid', 'profile', 'email', 'offline_access']

export const LOGGED_IN = "LOGGED_IN"
export const GET_USER = "GET_USER"
export const UPDATE_USER = "UPDATE_USER"
export const GET_COMPANIES = "GET_COMPANIES"
export const GET_BERRIES = "GET_BERRIES"
export const ADD_BERRY = "ADD_BERRY"
export const ADD_BERRY_RED = "ADD_BERRY_RED"
export const UPDATE_BERRY = "UPDATE_BERRY"
export const DELETE_BERRY = "DELETE_BERRY"
export const USER_LOGOUT = "USER_LOGOUT"
// forcasts
export const NEXT = 'NEXT';
export const BACK = 'BACK';
export const EDIT_FORCAST = 'EDIT_FORCAST';
export const EDIT_FORCAST2 = 'EDIT_FORCAST2';
export const EDIT_FORCAST3 = 'EDIT_FORCAST3';
export const REFRESH_FORECAST = 'REFRESH_FORECAST';
export const ADD_FORCAST = 'ADD_FORCAST';
export const SET_DEFAULT_VALUES = 'SET_DEFAULT_VALUES';
export const SUBMIT_FORCASTS = 'SUBMIT_FORCASTS';
export const FETCH_USER = 'FETCH_USER';
export const GET_RANCHES = 'GET_RANCHES';
export const LOADING_RANCHES = 'LOADING_RANCHES';
export const LOADING_FORECASTS = 'LOADING_FORECASTS';
export const GET_FORECASTS = 'GET_FORECASTS';
export const REFRESH_FORM = 'REFRESH_FORM';
// harverst orders
export const GET_ORDERS = 'GET_ORDERS';
export const LOADING_ORDERS = 'LOADING_ORDERS';
export const GET_ORDER_DETAILS = 'GET_ORDER_DETAILS';
export const LOADING_ORDER_DETAILS = 'LOADING_ORDER_DETAILS';

// ranch constants
export const GET_COMPANIES_2 = 'GET_COMPANIES_2';
export const LOADING_COMPANIES = 'LOADING_COMPANIES'; 

// toast constants 
export const SHOW_TOAST = 'SHOW_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';

//
export const PRIMARY = 'PRIMARY';
export const SUCCESS = 'SUCCESS';
export const WARN = 'WARN';
export const DANGER = 'DANGER';
export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS';
export const FAIL_GET_ORDERS = 'FAIL_GET_ORDERS';
export const FAIL_GET_COMPANIES = 'FAIL_GET_COMPANIES';
export const FAIL_GET_RANCHES = 'FAIL_GET_RANCHES';
export const FAIL_GET_FORECAST = 'FAIL_GET_FORECAST';
export const FAIL_GET_ORDER_DETAILS = 'FAIL_GET_ORDER_DETAILS';
