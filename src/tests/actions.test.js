import fetchCoinData from "../actions/fetchCoinData";
import fetchCoinNews from "../actions/fetchCoinNews";
import { FETCHING_COIN_DATA_SUCCESS, FETCHING_COIN_DATA, FETCHING_COIN_NEWS, FETCHING_COIN_NEWS_FAIL, FETCHING_COIN_NEWS_SUCCESS } from "../Utils/ActionTypes";

describe('fetchCoinData returns data', () => {

  it('dispatches FETCH_COIN_DATA', async () => {
    const mockDispatch = jest.fn()
    await fetchCoinData()(mockDispatch)
    // mockDispatch.mock.calls is all the args that the mock function was invoked on
    expect(mockDispatch.mock.calls[0][0].type).toBe(FETCHING_COIN_DATA)
    expect(mockDispatch.mock.calls[1][0].type).toBe(FETCHING_COIN_DATA_SUCCESS)
  })
})

describe('fetchCoinNews returns news', () => {

  it('dispatches FETCH_COIN_NEWS and succeeds', async () => {
    const mockDispatch = jest.fn()
    await fetchCoinNews('BTC')(mockDispatch)
    // mockDispatch.mock.calls is all the args that the mock function was invoked on
    expect(mockDispatch.mock.calls[0][0].type).toBe(FETCHING_COIN_NEWS)
    expect(mockDispatch.mock.calls[1][0].type).toBe(FETCHING_COIN_NEWS_SUCCESS)
    expect(mockDispatch.mock.calls[1][0].payload.length).toBeGreaterThan(0)
  });



})