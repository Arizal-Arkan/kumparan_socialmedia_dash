import {
    GET_DETAIL_POST_ERROR,
    GET_DETAIL_POST_PENDING,
    GET_DETAIL_POST_SUCCESS,
    GET_USER_COMMENT_ERROR,
    GET_USER_COMMENT_PENDING,
    GET_USER_COMMENT_SUCCESS
} from "../actions";

const initialState = {
    detailPost: {},
    dataComment: [],
    isLoading: false
};

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_DETAIL_POST_PENDING:
            return {
                ...state,
                isLoading: true,
            };
        case GET_DETAIL_POST_SUCCESS:
            console.log(payload);
            return {
                ...state,
                detailPost: payload.data,
                isLoading: false
            };
        case GET_DETAIL_POST_ERROR:
            return {
                ...state,
                isLoading: false,
            };
        case GET_USER_COMMENT_PENDING:
            return {
                ...state,
                isLoading: true,
            };
        case GET_USER_COMMENT_SUCCESS:
            console.log(payload);
            return {
                ...state,
                dataComment: payload.data,
                isLoading: false
            };
        case GET_USER_COMMENT_ERROR:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}