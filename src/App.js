import React, { useEffect } from 'react';
import './App.css';
import FeedScreen from './containers/FeedScreen/FeedScreen';
import { useDispatch } from 'react-redux';
import { checkInternetConnection, setPosts } from './store/actions/images';
import { posts } from './components/Constants/data';
import Toolbar from './components/Toolbar/Toolbar';

const app = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPosts(posts));
    dispatch(checkInternetConnection('online', true));
    window.addEventListener("online", eventTriggered);
    window.addEventListener("offline", eventTriggered);

    return () => {
      window.removeEventListener("online");
      window.removeEventListener("offline");
    }
  }, []);

  const eventTriggered = event => {
    dispatch(checkInternetConnection(event.type, false));
  }

  return <React.Fragment>
    <Toolbar />
    <FeedScreen />
  </React.Fragment>
}

export default app;
