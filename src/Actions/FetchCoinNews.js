import axios from 'axios';
import {
    FETCHING_COIN_NEWS,
    FETCHING_COIN_NEWS_SUCCESS,
    FETCHING_COIN_NEWS_FAIL
} from './../Utils/ActionTypes';

export default function FetchCoinNews(searchTerm) {
    return dispatch => {

        dispatch({ type: FETCHING_COIN_NEWS })


        return axios.get("https://cryptopanic.com/api/posts/?auth_token=1b860abccb1aa0c0fd03ed6e6047735f5d46ddbf&currencies=" + searchTerm + "&filter=hot&regions=en&public=true")
            .then(res => {
                    dispatch({ type: FETCHING_COIN_NEWS_SUCCESS, payload: res.data.results })
            })
            .catch(err => {
                dispatch({ type: FETCHING_COIN_NEWS_FAIL, payload: err.data })
            });
    }
}

