import React, { useEffect, useState } from 'react';
import classes from './ImageTile.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LaunchIcon from '@material-ui/icons/Launch';
import { useSelector } from 'react-redux';
import imageToBase64 from 'image-to-base64/browser';

const ImageTile = props => {
    const isConnected = useSelector(state => state.images.isConnected);
    const [formattedDate, setFormattedDate] = useState();
    const [base64, setBase64] = useState();

    const getImageBase64 = async uri => {

        return imageToBase64(uri).then(
        (response) => {
            return response;
        }).catch((error) => {console.log(error);})
    }

    useEffect(() => {
        var date = new Date(props.image.event_date * 1000);
        const dateUpdated = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear();
        setFormattedDate(dateUpdated);
        if(isConnected === false) {
            (async () => {
                if(props.image.offlineData) {
                    setBase64(props.image.offlineData)
                }else {
                    const data = await getImageBase64(props.image.thumbnail_image);
                    setBase64(data);
                }
            })();
        }
    }, [isConnected]);

    return <div className={classes.imageTile}>
        <div style={{
            width: '1000px', height: '400px', maxWidth: '400px',
            maxHeight: '800px', position: 'relative'
        }}>
            <img src={isConnected === true? props.image.thumbnail_image: base64? "data:image/png;base64,"+base64: props.image.thumbnail_image} 
            style={{ width: '100%', height: '100%' }} alt="You are offline so some images may not be visible" />
        </div>
        <p style={{ marginLeft: '9%', wordWrap: 'break-word' }}>{props.image.event_name}</p>
        <div className={classes.icons}>
            <div className={classes.likeComment}>
                {props.image.likes && props.image.likes > 0 ? <FavoriteIcon className={classes.cursor} style={{ color: 'red' }} /> :
                    <FavoriteBorderIcon className={classes.cursor} />}
                <VisibilityIcon className={classes.cursor} />
                <LaunchIcon className={classes.cursor} />
            </div>
        </div>
        <div className={classes.bottomBar}>
            <div className={classes.likeComment}>
                <h6 className={classes.cursor} onClick={() => { }}>{props.image.likes ? props.image.likes + ' likes' : 0 + 'likes'}</h6>
                <h6 className={classes.cursor} onClick={() => { }}>{props.image.views ? props.image.views + ' views' : 0 + 'views'}</h6>
                <h6 className={classes.cursor} onClick={() => { }}>{props.image.shares ? props.image.shares + ' shares' : 0 + 'shares'}</h6>
            </div>
        </div>
        <span className={classes.dateContainer}>Posted on {formattedDate}</span>
    </div>
}

export default ImageTile;