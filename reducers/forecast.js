import moment from 'moment';
import { ADD_FORCAST, EDIT_FORCAST, SET_DEFAULT_VALUES, GET_RANCHES, LOADING_RANCHES, LOADING_FORECASTS, GET_FORECASTS, REFRESH_FORM, FAIL_GET_RANCHES, FAIL_GET_FORECAST, EDIT_FORCAST3, EDIT_FORCAST2, REFRESH_FORECAST } from '../utils/constant';
import { offlineActionTypes } from 'react-native-offline';

const initialState = {
  loading: false,
  list: [],
  ranch: {
    loading: false,
    list: []
  },
  reasons: [
    { id: 0, value: "" },
    { id: 1, value: "Weather" },
    { id: 2, value: "Quality Related Issues" },
    { id: 3, value: "Labor" },
    { id: 4, value: "Food Safety Hold" },
    { id: 5, value: "Fruit Size" },
    { id: 6, value: "Data Entry Error" },
    { id: 7, value: "Increase in Supply" }
  ]
};

const forecast = (state=initialState, action) => {
  // console.log("Action ", action)
  // console.log("Action payload ", action.payload)
  const { type, payload } = action;

  switch(action.type) {
    
    case GET_RANCHES: {
      return {
        ...state,
        ranch: {
          loading: false,
          list: payload
        }
      }
    }

    case LOADING_RANCHES: {
      return {
        ...state,
        ranch: {
          loading: true,
          list: state.ranch.list
        }
      }
    }

    case LOADING_FORECASTS: {
      return {
        ...state,
        loading: true
      }
    }

    case GET_FORECASTS: {
      return {
        ...state,
        loading: false,
        list: payload
      }
    }
    case REFRESH_FORECAST: {
      return {
        ...state,
        list: state.list.map( forecast => {
          const match =  payload.find( eForecast => forecast.ForecastDate === eForecast.ForecastDate && forecast.RanchNumber === eForecast.RanchNumber && forecast.PlanningGroupNumber === eForecast.PlanningGroupNumber);
          console.log("Forecase ", forecast)
          console.log("Match ", match)
          console.log("Payload ", payload)
          if(match) {
            forecast.Quantity = match.Quantity;
            forecast.ReasonCodeName = match.ReasonCodeName;
            return forecast;
          }
          return forecast;
        })
      }
    }

    case EDIT_FORCAST: {
      
      return {
        ...state,
        list: state.list.map( forecast => {
          const match =  payload.find( eForecast => forecast.ForecastDate === eForecast.ForecastDate && forecast.RanchNumber === eForecast.RanchNumber && forecast.PlanningGroupNumber === eForecast.PlanningGroupNumber);

          if(match) {
            forecast.Quantity = match.Quantity;
            forecast.ReasonCodeName = match.ReasonCodeName;
          }
          
          return forecast;
        })
      }
    }

    case EDIT_FORCAST2: {
      
      return {
        ...state,
        list: state.list.map( forecast => {
          const match =  payload.find( eForecast => forecast.ForecastDate === eForecast.ForecastDate && forecast.RanchNumber === eForecast.RanchNumber && forecast.PlanningGroupNumber === eForecast.PlanningGroupNumber);

          if(match) {
            forecast.Quantity = match.Quantity;
            forecast.ReasonCodeName = match.ReasonCodeName;
          }
          
          return forecast;
        })
      }
    }

    case EDIT_FORCAST3: {
      
      return {
        ...state,
        list: state.list.map( forecast => {
          const match =  payload.find( eForecast => forecast.ForecastDate === eForecast.ForecastDate && forecast.RanchNumber === eForecast.RanchNumber && forecast.PlanningGroupNumber === eForecast.PlanningGroupNumber);

          if(match) {
            forecast.Quantity = match.Quantity;
            forecast.ReasonCodeName = match.ReasonCodeName;
          }
          
          return forecast;
        })
      }
    }

    case REFRESH_FORM: {
      return {
        ...state
      }
    }

    case FAIL_GET_RANCHES: {
      return {
        ...state,
        ranch: {
          loading: false,
          list: state.ranch.list
        }
      }
    }

    case FAIL_GET_FORECAST: {
      return {
        ...state,
        loading: false
      }
    }

    default:
      return state;
  }
};

export default forecast;
