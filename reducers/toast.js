import { SHOW_TOAST, HIDE_TOAST } from '../utils/constant';

const initialState = {
  visible: false,
  position: -160,
  message: 'You are currently offline, But you can keep working..',
  duration: 7000,
  type: 'WARN'
}

const toastReducer = (state=initialState, { type, payload }) => {
  switch (type) {

    case SHOW_TOAST: {
      return {
        ...state,
        ...payload,
        visible: true
      }
    }
    
    case HIDE_TOAST: {
      return {
        ...initialState,
        visible: false
      }
    }

    default: {
      return state;
    }
  }
}

export default toastReducer;
