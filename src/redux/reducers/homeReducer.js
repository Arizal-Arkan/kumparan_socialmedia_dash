import {
    GET_USERS_ERROR,
    GET_USERS_PENDING,
    GET_USERS_SUCCESS
  } from "../actions";
  
  const initialState = {
    dataUsers: [],
    isLoading: false
  };
  
  export default function reducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_USERS_PENDING:
        return {
          ...state,
          isLoading: true,
        };
      case GET_USERS_SUCCESS:
        return {
          ...state,
          dataUsers: payload.data,
          isLoading: false
        };
      case GET_USERS_ERROR:
            return {
              ...state,
              isLoading: false,
            };
      default:
        return state;
    }
  }