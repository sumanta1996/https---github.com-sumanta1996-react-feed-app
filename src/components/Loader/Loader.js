import React from 'react';
import classes from './Loader.css';

const Loader = props => {
    return <div className={classes.loader} style={props.style}></div>
}

export default Loader;