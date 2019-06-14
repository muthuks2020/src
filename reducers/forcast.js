import moment from 'moment';
import { ADD_FORCAST, EDIT_FORCAST, SET_DEFAULT_VALUES } from '../utils/constant';
import { offlineActionTypes } from 'react-native-offline';

const dummyReport1 = {
  ranchId: '08995',
  date: moment().add(1, 'days').format("DD MMMM, YYYY"),
  groups: [
    { id: 1, name: "GR1", quantity: "100", selected: 2 },
    { id: 2, name: "GR2", quantity: "200", selected: 1 },
    { id: 3, name: "GR3", quantity: "50", selected: 3 }
  ]
};

const dummyReport2 = {
  ranchId: '07666',
  date: moment().format("DD MMMM, YYYY"),
  groups: [
    { id: 1, name: "GR4", quantity: "25", selected: 3 },
    { id: 2, name: "GR2", quantity: "200", selected: 1 },
    { id: 3, name: "GR3", quantity: "100", selected: 2 }
  ]
};

const initialState = [ dummyReport1, dummyReport2 ];

const forcasts = (state=initialState, action) => {
  switch(action.type) {

    case SET_DEFAULT_VALUES: {
      const newState = state.map((forcast) => {
        if(forcast.date === action.payload.date && forcast.ranchId == action.payload.ranchId) {
          forcast.groups = forcast.groups.map( group => {
            group.quantity = "0";
            group.selected = 0;
            return group;
          })
        }
        return forcast;
      })
      return [...newState];
    }

    case offlineActionTypes.FETCH_OFFLINE_MODE: {
      console.log('forcast reducer offline action', action.payload)
      return state;
    }

    default:
      return state;
  }
};

export default forcasts;
