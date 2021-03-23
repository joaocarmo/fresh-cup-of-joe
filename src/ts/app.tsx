import { useCallback, useEffect, useReducer, useRef } from 'react'
import Feed from './components/feed'
import Layout from './components/layout'
import Loader from './components/loader'
import Toggle from './components/toggle'
import { initialState, reducer } from './utils/store'
import { debugLog, fetchTweets, getLastTweetId } from './utils/functions'
import {
  ACTION_ADD_TWEETS,
  ACTION_SET_AUTO_REFRESH,
  ACTION_SET_IS_LOADING,
  AUTO_REFRESH_ENABLED,
  INITIAL_BATCH_COUNT,
  REFRESH_BATCH_COUNT,
  REFRESH_RATE,
} from './utils/constants'
import '../styles/global.css'

const App = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const lastTweetId = useRef(0)
  const lastRequestCompleted = useRef(true)
  const intervalId = useRef(null)

  debugLog('loading', state.isLoading)

  const fetchAndUpdateTweets = useCallback(
    async (count: number = REFRESH_BATCH_COUNT) => {
      debugLog('lastRequestCompleted', lastRequestCompleted.current)

      if (lastRequestCompleted.current) {
        // This should avoid concurrent requests, especially on slow connections
        lastRequestCompleted.current = false

        const tweets = await fetchTweets({
          afterId: lastTweetId.current,
          count,
        })

        // Save the ID of the most recent tweet to use on the next request
        lastTweetId.current = getLastTweetId(tweets) || lastTweetId.current

        debugLog(lastTweetId?.current)

        dispatch({ type: ACTION_ADD_TWEETS, payload: tweets })

        dispatch({ type: ACTION_SET_IS_LOADING, payload: false })

        lastRequestCompleted.current = true
      }
    },
    [],
  )

  const setupTimer = useCallback(() => {
    // The setInterval argument needs a constant ref
    const tick = () => {
      dispatch({ type: ACTION_SET_IS_LOADING, payload: true })

      void fetchAndUpdateTweets()
    }

    // Setup an interval to fetch new tweets
    intervalId.current = setInterval(tick, REFRESH_RATE)
  }, [fetchAndUpdateTweets])

  const clearTimer = useCallback(() => {
    if (intervalId?.current) {
      clearInterval(intervalId.current)
      intervalId.current = null
    }
  }, [])

  const handleAutoRefreshToggle = useCallback(() => {
    dispatch({
      type: ACTION_SET_AUTO_REFRESH,
      payload: !state.autoRefreshEnabled,
    })

    if (state.autoRefreshEnabled) {
      clearTimer()
    } else {
      setupTimer()
    }
  }, [clearTimer, setupTimer, state.autoRefreshEnabled])

  useEffect(() => {
    // Get the initial batch of tweets
    void fetchAndUpdateTweets(INITIAL_BATCH_COUNT)

    setupTimer()

    return () => {
      // Cleanup the interval on unmount
      clearTimer()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      {state.isLoading && <Loader />}
      <Toggle
        checked={state.autoRefreshEnabled}
        onChange={handleAutoRefreshToggle}>
        {AUTO_REFRESH_ENABLED}
      </Toggle>
      <Feed data={state.tweets} />
    </Layout>
  )
}

export default App
