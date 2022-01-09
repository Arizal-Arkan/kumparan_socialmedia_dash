import {
    GET_DETAIL_USER_ERROR,
    GET_DETAIL_USER_PENDING,
    GET_DETAIL_USER_SUCCESS,
    GET_USER_ALBUM_ERROR,
    GET_USER_ALBUM_PENDING,
    GET_USER_ALBUM_SUCCESS,
    GET_USER_POST_ERROR,
    GET_USER_POST_PENDING,
    GET_USER_POST_SUCCESS
} from "../actions";

const initialState = {
    detailUser: {},
    dataPost: [],
    dataAlbum: [],
    isLoading: false
};

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_DETAIL_USER_PENDING:
            return {
                ...state,
                isLoading: true,
            };
        case GET_DETAIL_USER_SUCCESS:
            console.log(payload);
            return {
                ...state,
                detailUser: payload.data,
                isLoading: false
            };
        case GET_DETAIL_USER_ERROR:
            return {
                ...state,
                isLoading: false,
            };
        case GET_USER_POST_PENDING:
            return {
                ...state,
                isLoading: true,
            };
        case GET_USER_POST_SUCCESS:
            console.log(payload);
            return {
                ...state,
                dataPost: payload.data,
                isLoading: false
            };
        case GET_USER_POST_ERROR:
            return {
                ...state,
                isLoading: false,
            };
        case GET_USER_ALBUM_PENDING:
            return {
                ...state,
                isLoading: true,
            };
        case GET_USER_ALBUM_SUCCESS:
            return {
                ...state,
                dataAlbum: payload.data,
                isLoading: false
            };
        case GET_USER_ALBUM_ERROR:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}