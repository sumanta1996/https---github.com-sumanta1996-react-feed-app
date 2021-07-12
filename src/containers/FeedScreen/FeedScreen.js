import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filters } from '../../components/Constants/data';
import ImageTile from '../../components/ImageTile/ImageTile';
import Loader from '../../components/Loader/Loader';
import { fetchFeedData, changeFilter } from '../../store/actions/images';
import classes from './FeedScreen.css';

const FeedScreen = props => {
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState(0);
    const feedData = useSelector(state => state.images.feedData);
    const activeFilter = useSelector(state => state.images.activeFilter);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchData();
    }, [pagination]);

    const fetchData = async () => {
        setLoading(true);
        dispatch(fetchFeedData(pagination));
        setLoading(false);
    }

    const switchFilter = async event => {
        await dispatch(changeFilter(event.target.value));
        if (pagination === 0) {
            fetchData();
        }
        setPagination(0);
    }

    const handleScroll = () => {
        if (document.documentElement.offsetHeight - (window.innerHeight + document.documentElement.scrollTop) > 10) return;
        setPagination(prevValue => prevValue + 1);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    if (loading) {
        return <Loader />;
    }

    if(feedData.length === 0) {
        return <div className={classes.emptyContainer}>No posts available!!!</div>
    }

    return <div className={classes.content}>
        <div className={classes.sortBy}>
            <span style={{marginRight: '15px'}}>Sort by</span>
            <select onChange={switchFilter} value={activeFilter}>
                {filters.map(eachFilter => <option key={eachFilter} value={eachFilter}>{eachFilter}</option>)}
            </select>
        </div>
        {feedData.map(image => <ImageTile key={image.id} image={image} />)}
    </div>
}

export default FeedScreen;