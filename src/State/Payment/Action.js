import { api } from '../../config/apiconfig';
import {
    CREATE_PAYMENT_FAILURE,
    CREATE_PAYMENT_REQUEST,
    UPDATE_PAYMENT_FAILURE,
    UPDATE_PAYMENT_REQUEST,
} from './ActionType';

export const createPayment = (lunchId) => async (dispatch) => {
    dispatch({ type: CREATE_PAYMENT_REQUEST });
    try {
        const { data } = await api.post(`/api/payments/${lunchId}`, {});

        if (data.payment_link_url) {
            window.location.href = data.payment_link_url;
        }
    } catch (error) {
        dispatch({ type: CREATE_PAYMENT_FAILURE, payload: error.message });
    }
};

export const updatePayment = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_PAYMENT_REQUEST });
    try {
        const { data } = await api.get(
            `/api/payments?payment_id=${reqData.paymentId}&lunch_id=${reqData.lunchId}`
        );
    } catch (error) {
        dispatch({ type: UPDATE_PAYMENT_FAILURE, payload: error.message });
    }
};
