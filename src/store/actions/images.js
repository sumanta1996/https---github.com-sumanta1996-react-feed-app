import { posts, pageSize, Views, Likes, Share, Dates } from '../../components/Constants/data';
import imageToBase64 from 'image-to-base64/browser';

export const FETCH_FEED_DATA = 'FETCH_FEED_DATA';
export const LIKED_HANDLER = 'LIKED_HANDLER';
export const CHANGE_FILTER = 'CHANGE_FILTER';
export const SET_POSTS = 'SET_POSTS';
export const CHECK_INTRNT_CONN = 'CHECK_INTRNT_CONN';

export const setPosts = (allPosts) => {
    return async dispatch => {
        const updatedData = await appendBase64Data(allPosts);
        //Not able to save all the base64 converted data to localstorage as localstorage is getting full.
        saveToStorage(allPosts);
        dispatch({
        type: SET_POSTS,
        posts: updatedData
        })
    }
}

const appendBase64Data = async allPosts => {
    const updatedData = [];
    for(var i=0;i<allPosts.length;i++) {
        const data = await getImageBase64(allPosts[i].thumbnail_image);
        let updatedPost = {...allPosts[i], offlineData: data};
        updatedData.push(updatedPost);
    }
    
    return updatedData;
}


const getImageBase64 = async uri => {

    return imageToBase64(uri).then(
    (response) => {
        return response;
    }).catch((error) => {console.log(error);})
}


export const fetchFeedData = (pageNum) => {
    return async (dispatch, getState) => {
        var start = pageSize*pageNum;
        var end = start+pageSize-1;
        let updatedData;
        if(getState().images.isChanged === true) {
            updatedData = await sortBasedOnFilter(getState().images.activeFilter);
            dispatch(setPosts(updatedData));
        }else {
            updatedData = getState().images.posts;
        }
        if(start<=updatedData.length) {
            const data = updatedData.filter((image, index) => {
                return index>=start && index<=end
                }
            );
            dispatch({
                type: FETCH_FEED_DATA,
                posts: data
            })
        }
    }
}

const sortBasedOnFilter = async (filterName) => {
    const updatedData = [...posts];
    switch(filterName) {
        case Likes: updatedData.sort((a,b) => (a.likes > b.likes) ? 1 : ((b.likes > a.likes) ? -1 : 0)); break;
        case Views: updatedData.sort((a,b) => (a.views > b.views) ? 1 : ((b.views > a.views) ? -1 : 0)); break;
        case Share: updatedData.sort((a,b) => (a.shares > b.shares) ? 1 : ((b.shares > a.shares) ? -1 : 0)); break;
        case Dates: updatedData.sort((a,b) => (a.event_date > b.event_date) ? 1 : ((b.event_date > a.event_date) ? -1 : 0)); break;
        default:
    }
    return updatedData;
}

export const changeFilter = filter => {
    return async dispatch => {
        dispatch({
            type: CHANGE_FILTER,
            filter: filter
        })
    }
}

export const checkInternetConnection = (type, isFirst) => {
    return async (dispatch, getState) => {
        let isConnected;
        if(isFirst === true && type === 'online') {
            try {
                await fetch('//google.com', {
                    mode: 'no-cors'
                });
                isConnected = true;
            }catch(err) {
                isConnected = false;
            }
        }else {
            isConnected = type === 'online'? true: false;
        }
        if(isConnected === false) {
            const posts = JSON.parse(localStorage.getItem('postsData'));
            //If data is there in local storage and posts size is 0 then only save
            if(posts && getState().images.posts.length === 0) {
                dispatch(setPosts(posts.posts));
            }
        } 
        dispatch({
            type: CHECK_INTRNT_CONN,
            isConnected: isConnected
        })

    }
}

const saveToStorage = postData => {
    localStorage.setItem('postsData', JSON.stringify({
        posts: postData
    }))
}