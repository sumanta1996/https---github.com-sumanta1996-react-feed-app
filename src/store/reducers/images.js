import { Likes } from "../../components/Constants/data";
import { CHANGE_FILTER, CHECK_INTRNT_CONN, FETCH_FEED_DATA, SET_POSTS } from "../actions/images";

const initialState = {
    posts: [],
    feedData: [],
    activeFilter: Likes,
    isChanged: true,
    isConnected: true
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.posts,
                isChanged: false
            }
        case FETCH_FEED_DATA: 
            const updatedFeedData = [...state.feedData, ...action.posts];
            return {
                ...state,
                feedData: updatedFeedData
            };
        case CHANGE_FILTER:
            return {
                ...state,
                feedData: [],
                activeFilter: action.filter,
                isChanged: true
            }
        case CHECK_INTRNT_CONN:
            return {
                ...state,
                isConnected: action.isConnected
            }
        default: return state;
    }
}