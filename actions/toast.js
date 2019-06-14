import { SHOW_TOAST, HIDE_TOAST } from '../utils/constant';
export const showToast = (message) => {
  return {
    type: SHOW_TOAST,
    payload: {
      message
    }
  }
};

export const hideToast = () => {
  console.log('hit hie toast');
  return {
    type: HIDE_TOAST
  }
};
