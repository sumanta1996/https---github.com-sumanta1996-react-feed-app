import React from 'react';
import classes from './Toolbar.css';
import { useSelector } from 'react-redux';
import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';

const toolbar = props => {
    const isConnected = useSelector(state => state.images.isConnected);


    return <div className={classes.toolbar}>
        {isConnected === true? <WifiIcon />: <WifiOffIcon />}
        <span style={{marginLeft: '15px', marginTop: '1px'}}>You are {isConnected === true? 'online': 'offline'}</span>
    </div>
}

export default toolbar;