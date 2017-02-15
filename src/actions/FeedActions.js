import axios from 'axios';
import { LOAD_FEED, ADD_FEED_ITEM } from './types';

export const getFeed = () => dispatch =>
  axios.get('/videos/feed')
    .then(feed => dispatch(loadFeed(feed.data.feed)))

export const loadFeed = feed => ({
  type: LOAD_FEED,
  payload: feed,
});

export const addFeedItem = video => ({
  type: ADD_FEED_ITEM,
  payload: video,
});

