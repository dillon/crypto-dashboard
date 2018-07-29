import {
    FETCHING_COIN_NEWS,
    FETCHING_COIN_NEWS_SUCCESS,
    FETCHING_COIN_NEWS_FAIL,

} from "../Utils/ActionTypes";

const initialState = {
    isFetching: null,
    data: [],
    hasError: false,
    errorMesage: null,
};



export default function (state = initialState, action) {

    switch (action.type) {

        // Fetching Coin Data
        case FETCHING_COIN_NEWS:
            return Object.assign({}, state, {
                isFetching: true,
                data: null,
                hasError: false,
                errorMessage: null
            });

        case FETCHING_COIN_NEWS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.payload,
                hasError: false,
                errorMessage: null
            });

        case FETCHING_COIN_NEWS_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.payload,
                hasError: true,
                errorMessage: action.err
            });

        default:
            return state;
    }
}