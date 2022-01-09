import { API } from '../../config';

// get detail post
export const GET_DETAIL_POST_PENDING = "GET_DETAIL_POST_PENDING";
export const GET_DETAIL_POST_SUCCESS = "GET_DETAIL_POST_SUCCESS";
export const GET_DETAIL_POST_ERROR = "GET_DETAIL_POST_ERROR";

// get comment
export const GET_USER_COMMENT_PENDING = "GET_USER_COMMENT_PENDING";
export const GET_USER_COMMENT_SUCCESS = "GET_USER_COMMENT_SUCCESS";
export const GET_USER_COMMENT_ERROR = "GET_USER_COMMENT_ERROR";

export const getPostDetail = (id) => async (dispatch) => {
 try {
    dispatch({ type: GET_DETAIL_POST_PENDING });
    const res = await API.getPostDetail(id);
    dispatch({
        type: GET_DETAIL_POST_SUCCESS,
        payload: { data: res.data }
      });
    }
 catch {
    dispatch({ type: GET_DETAIL_POST_ERROR });
 }
}

export const getComment = (id) => async (dispatch) => {
    try {
       dispatch({ type: GET_USER_COMMENT_PENDING });
       const res = await API.getComment(id);
       dispatch({
           type: GET_USER_COMMENT_SUCCESS,
           payload: { data: res.data }
         });
       }
    catch {
       dispatch({ type: GET_USER_COMMENT_ERROR });
    }
}