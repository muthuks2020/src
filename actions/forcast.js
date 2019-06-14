import { ADD_FORCAST, EDIT_FORCAST, SET_DEFAULT_VALUES, FORECAST_URI, USERNAME, PW, GET_RANCHES, LOADING_RANCHES, API_URI, LOADING_FORECASTS, GET_FORECASTS, LOADING_COMPANIES, GET_COMPANIES_2, FAIL_GET_RANCHES, FAIL_GET_COMPANIES, FAIL_GET_FORECAST, EDIT_FORCAST2, EDIT_FORCAST3 } from '../utils/constant';

import { AsyncStorage } from 'react-native';
import axios from 'axios';

export function addForecast(date, values) {
  return {
    type: ADD_FORCAST,
    payload: {
      date,
      values
    }
  }
};

export function updateForecast(typeValue, editData) {
  async function thunk(dispatch) {
    dispatch({
      type: typeValue,
      payload: editData
    })
  }

  thunk.interceptInOffline = true;

  thunk.meta = {
    retry: true
  }

  return thunk;
};

export function editForecast(data, userId, editData) {
  async function thunk(dispatch) {
    try {
      const response = await axios.post(`${FORECAST_URI}/forecast/${userId}`, data, {
        auth: {
          username: USERNAME,
          password: PW
        }
      });

      dispatch({
        type: EDIT_FORCAST,
        payload: editData
      })
    } catch (e) {
      console.error("Forecast 1", e);
    }
  }

  thunk.interceptInOffline = true;

  thunk.meta = {
    retry: true
  }

  return thunk;
};

export function editForecast2(data, userId, editData) {
  async function thunk(dispatch) {
    try {
      const response = await axios.post(`${FORECAST_URI}/forecast/${userId}`, data, {
        auth: {
          username: USERNAME,
          password: PW
        }
      });

      dispatch({
        type: EDIT_FORCAST2,
        payload: editData
      })
    } catch (e) {
      console.error("Forecast 2", e);
    }
  }

  thunk.interceptInOffline = true;

  thunk.meta = {
    retry: true
  }

  return thunk;
};

export function editForecast3(data, userId, editData) {
  async function thunk(dispatch) {
    try {
      const response = await axios.post(`${FORECAST_URI}/forecast/${userId}`, data, {
        auth: {
          username: USERNAME,
          password: PW
        }
      });
      //ranches
      await AsyncStorage.getItem("forecastResponseArr", (err, result) => {
        fsArr=[]
        if(result){
          fsArr=JSON.parse(result);
          for(i=0;i<fsArr.length;i++){
            if(fsArr[i].ranch==editData[0].RanchNumber){
              fsArr[i].status=(response.status==200||response.status==201)?
              2
              :response.status==202?
                1
                :0
              break;
            }
             
            if(i==fsArr.length-1){
              for(i=0;i<editData.length;i++){
                obj={}
                obj["ranch"]=editData[0].RanchNumber;
                obj["status"]=
                  (response.status==200||response.status==201)?
                    2
                    :response.status==202?
                      1
                      : 0
                fsArr.push(obj);
              }
            }
          }
        }
        else{
          for(i=0;i<editData.length;i++){
            obj={}
            obj["ranch"]=editData[i].RanchNumber;
            obj["status"]=
              (response.status==200||response.status==201)?
                2
                :response.status==202?
                  1
                  : 0
            fsArr.push(obj);
          }
        }
        AsyncStorage.setItem("forecastResponseArr", JSON.stringify(fsArr))
      });

      dispatch({
        type: EDIT_FORCAST3,
        payload: editData
      })
    } catch (e) {
      console.error("Forecast 3", e);
    }
  }

  thunk.interceptInOffline = true;

  thunk.meta = {
    retry: true
  }

  return thunk;
};

export function setDefaultValues(ranchId, date) {
  return {
    type: SET_DEFAULT_VALUES,
    payload: {
      ranchId,
      date
    }
  }
};

export function getRanches(userId, personaId = 5) {
  return async function (dispatch) {
    try {

      dispatch({
        type: LOADING_RANCHES
      })

      dispatch({
        type: LOADING_COMPANIES
      })

      const response = await axios.get(`${FORECAST_URI}/users/ranches?personaid=${personaId}&useroktaid=${userId}`, {
        auth: {
          username: USERNAME,
          password: PW
        }
      });

      const data = response.data.RanchPlannerAssignment;

      dispatch({
        type: GET_COMPANIES_2,
        payload: data
      })

      const ranches = [];

      data.forEach(company => {
        company.Ranches.forEach(ranch => {
          ranches.push(ranch);
        });
      });

      dispatch({
        type: GET_RANCHES,
        payload: ranches
      });

    } catch (e) {
      dispatch({
        type: FAIL_GET_COMPANIES
      })
      dispatch({
        type: FAIL_GET_RANCHES
      })
    }
  }
}

export function getForecasts(userId, ranchNumber, forecastDate) {
  return async function (dispatch) {
    try {

      dispatch({
        type: LOADING_FORECASTS
      })

      const response = await axios.get(`${FORECAST_URI}/forecast/${userId}?ranchnumber=${ranchNumber}&forecastdate=${forecastDate}`, {
        auth: {
          username: USERNAME,
          password: PW
        }
      });

      dispatch({
        type: GET_FORECASTS,
        payload: response.data['Forecast Response']
      })

    } catch (e) {

      dispatch({
        type: FAIL_GET_FORECAST
      })
    }
  }
}

export function submitForecast(userId, forecast, editData) {
  return async function (dispatch) {
    try {
      axios.post(`${FORECAST_URI}/forecast/${userId}`);
    } catch (e) {
      // console.error(e);
    }
  }
}
