import { combineReducers } from "redux";

import home from "./homeReducer";
import detailUser from './detailUserReducer';
import detailPost from './detailPostReducer';
import detailAlbum from './detailAlbumReducer';


export default combineReducers({ home, detailUser, detailPost, detailAlbum });
