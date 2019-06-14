import { GET_COMPANIES_2, LOADING_COMPANIES, FAIL_GET_COMPANIES } from '../utils/constant';


const initialState = {
  loading: false,
  list: []
};

const companies = (state=initialState, {type, payload}) => {
  switch(type) {

    case GET_COMPANIES_2: {
      return {
        ...state,
        loading: false,
        list: payload
      }
    }

    case LOADING_COMPANIES: {
      return {
        ...state,
        loading: true
      }
    }

    case FAIL_GET_COMPANIES: {
      return {
        ...state,
        loading: false
      }
    }

    default: {
      return state;
    }
  }
};

export default companies;
