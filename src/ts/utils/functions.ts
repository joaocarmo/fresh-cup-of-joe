import type { TweetProp } from '../components/tweet'
import { API_HOST, FETCH_MAX_RETRIES } from './constants'

/**
 * @typedef Tweet
 * @type {object}
 * @property {number} id - The tweet's ID
 * @property {number} timestamp - The tweet's timestamp
 * @property {string} image - The user's avatar URL
 * @property {string} text - The tweet's text content
 * @property {string} username - The user's username
 */

/**
 * Logs information only in a development environment.
 * @param args {*} Same arguments as console.log
 * @returns {void}
 */
export const debugLog = (...args: unknown[]): void => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(...args)
  }
}

/**
 * Retrieves the tweets from the backend endpoint. Retries if unsuccessful to a
 * predefined number of times.
 * @async
 * @param {{afterId: number, count: number, retry: number}} options
 * @returns {Array<Tweet>}
 */
export const fetchTweets = async ({
  afterId,
  count,
  retry = 0,
}: {
  afterId: number
  count: number
  retry?: number
}): Promise<TweetProp[]> => {
  if (retry >= FETCH_MAX_RETRIES) {
    return []
  }

  const apiTweets = new URL(`${API_HOST}/api`)

  if (afterId) {
    apiTweets.searchParams.append('afterId', `${afterId}`)
  }

  if (count) {
    apiTweets.searchParams.append('count', `${count}`)
  }

  try {
    const response = await fetch(apiTweets.href)

    if (response.ok) {
      const data = (await response.json()) as TweetProp[]

      return data
    }
  } catch (err) {
    debugLog(err)
  }

  // If no data has been returned, the request failed and we should retry
  return fetchTweets({ afterId, count, retry: retry + 1 })
}

/**
 * Returns the ID of a list's topmost tweet.
 * @param {Array<Tweet>} tweets
 * @returns {number}
 */
export const getLastTweetId = (tweets: TweetProp[]): number => {
  if (tweets.length > 0) {
    const [lastTweet] = tweets
    return lastTweet?.id
  }

  return 0
}

/**
 * Merges the tweets currently in the app's memory with the new tweets returned
 * from the backend. Uses a Map object to filter out duplicate IDs and respect
 * the initial order.
 * @param {Array<Tweet>} currentTweets
 * @param {Array<Tweet>} newTweets
 * @returns {Array<Tweet>}
 */
export const addNewTweets = (
  currentTweets: TweetProp[],
  newTweets: TweetProp[],
): TweetProp[] => {
  const allTweets = [...newTweets, ...currentTweets]

  const tweetMap: Map<number, TweetProp> = new Map(
    allTweets.map((tweet) => [tweet.id, tweet]),
  )

  return Array.from(tweetMap.values())
}
