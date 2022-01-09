import {
    GET_DETAIL_ALBUM_ERROR,
    GET_DETAIL_ALBUM_PENDING,
    GET_DETAIL_ALBUM_SUCCESS,
    GET_USER_PHOTO_ERROR,
    GET_USER_PHOTO_PENDING,
    GET_USER_PHOTO_SUCCESS
} from "../actions";

const initialState = {
    detailAlbum: {},
    dataPhoto: [],
    isLoading: false
};

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_DETAIL_ALBUM_PENDING:
            return {
                ...state,
                isLoading: true,
            };
        case GET_DETAIL_ALBUM_SUCCESS:
            console.log(payload);
            return {
                ...state,
                detailAlbum: payload.data,
                isLoading: false
            };
        case GET_DETAIL_ALBUM_ERROR:
            return {
                ...state,
                isLoading: false,
            };
        case GET_USER_PHOTO_PENDING:
            return {
                ...state,
                isLoading: true,
            };
        case GET_USER_PHOTO_SUCCESS:
            console.log(payload);
            return {
                ...state,
                dataPhoto: payload.data,
                isLoading: false
            };
        case GET_USER_PHOTO_ERROR:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}