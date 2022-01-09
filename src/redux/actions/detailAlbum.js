import { API } from '../../config';

// get detail post
export const GET_DETAIL_ALBUM_PENDING = "GET_DETAIL_ALBUM_PENDING";
export const GET_DETAIL_ALBUM_SUCCESS = "GET_DETAIL_ALBUM_SUCCESS";
export const GET_DETAIL_ALBUM_ERROR = "GET_DETAIL_ALBUM_ERROR";

// get comment
export const GET_USER_PHOTO_PENDING = "GET_USER_PHOTO_PENDING";
export const GET_USER_PHOTO_SUCCESS = "GET_USER_PHOTO_SUCCESS";
export const GET_USER_PHOTO_ERROR = "GET_USER_PHOTO_ERROR";

export const getAlbumDetail = (id) => async (dispatch) => {
 try {
    dispatch({ type: GET_DETAIL_ALBUM_PENDING });
    const res = await API.getDetailAlbum(id);
    dispatch({
        type: GET_DETAIL_ALBUM_SUCCESS,
        payload: { data: res.data }
      });
    }
 catch {
    dispatch({ type: GET_DETAIL_ALBUM_ERROR });
 }
}

export const getPhoto = (id) => async (dispatch) => {
    try {
       dispatch({ type: GET_USER_PHOTO_PENDING });
       const res = await API.getPhoto(id);
       dispatch({
           type: GET_USER_PHOTO_SUCCESS,
           payload: { data: res.data }
         });
       }
    catch {
       dispatch({ type: GET_USER_PHOTO_ERROR });
    }
}