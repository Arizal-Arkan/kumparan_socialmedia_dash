import { API } from '../../config';

// get users
export const GET_USERS_PENDING = "GET_USERS_PENDING";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_ERROR = "GET_USERS_ERROR";

export const getUsers = () => async (dispatch) => {
 try {
    dispatch({ type: GET_USERS_PENDING });
    const res = await API.getListUser();
    dispatch({
        type: GET_USERS_SUCCESS,
        payload: { data: res.data }
      });
    }
 catch {
    dispatch({ type: GET_USERS_ERROR });
 }
}