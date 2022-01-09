import { API } from '../../config';

// get detail user
export const GET_DETAIL_USER_PENDING = "GET_DETAIL_USER_PENDING";
export const GET_DETAIL_USER_SUCCESS = "GET_DETAIL_USER_SUCCESS";
export const GET_DETAIL_USER_ERROR = "GET_DETAIL_USER_ERROR";

// get user post
export const GET_USER_POST_PENDING = "GET_USER_POST_PENDING";
export const GET_USER_POST_SUCCESS = "GET_USER_POST_SUCCESS";
export const GET_USER_POST_ERROR = "GET_USER_POST_ERROR";

// get user album
export const GET_USER_ALBUM_PENDING = "GET_USER_ALBUM_PENDING";
export const GET_USER_ALBUM_SUCCESS = "GET_USER_ALBUM_SUCCESS";
export const GET_USER_ALBUM_ERROR = "GET_USER_ALBUM_ERROR";

export const getDetailUser = (id) => async (dispatch) => {
 try {
    dispatch({ type: GET_DETAIL_USER_PENDING });
    const res = await API.getDetailUser(id);
    dispatch({
        type: GET_DETAIL_USER_SUCCESS,
        payload: { data: res.data }
      });
    }
 catch {
    dispatch({ type: GET_DETAIL_USER_ERROR });
 }
}

export const getPostUser = (id) => async (dispatch) => {
    try {
       dispatch({ type: GET_USER_POST_PENDING });
       const res = await API.getPostUser(id);
       dispatch({
           type: GET_USER_POST_SUCCESS,
           payload: { data: res.data }
         });
       }
    catch {
       dispatch({ type: GET_USER_POST_ERROR });
    }
}

export const getAlbumUser = (id) => async (dispatch) => {
    try {
       dispatch({ type: GET_USER_ALBUM_PENDING });
       const res = await API.getAlbumUser(id);
       dispatch({
           type: GET_USER_ALBUM_SUCCESS,
           payload: { data: res.data }
         });
       }
    catch {
       dispatch({ type: GET_USER_ALBUM_ERROR });
    }
}