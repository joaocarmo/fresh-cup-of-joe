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
 * @param {{afterId: number, beforeId: number, count: number, retry: number}} options
 * @returns {Array<Tweet>}
 */
export const fetchTweets = async ({
  afterId = 100,
  beforeId,
  count,
  retry = 0,
}: {
  afterId?: number
  beforeId?: number
  count: number
  retry?: number
}): Promise<TweetProp[]> => {
  if (retry >= FETCH_MAX_RETRIES) {
    return []
  }

  const apiTweets = new URL(`${API_HOST}/tweets`)

  if (afterId) {
    apiTweets.searchParams.append('$skip', `${afterId}`)
  } else if (beforeId) {
    const skip = beforeId - count

    if (skip > 0) {
      apiTweets.searchParams.append('$skip', `${skip}`)
    }
  }

  if (count) {
    apiTweets.searchParams.append('$limit', `${count}`)
  }

  try {
    const response = await fetch(apiTweets.href)

    if (response.ok) {
      const { data } = (await response.json()) as TweetProp[]

      return data as TweetProp[]
    }
  } catch (err) {
    debugLog(err)
  }

  // If no data has been returned, the request failed and we should retry
  return fetchTweets({ afterId, beforeId, count, retry: retry + 1 })
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

/**
 * Merges the tweets currently in the app's memory with the past tweets returned
 * from the backend. Uses a Map object to filter out duplicate IDs and respect
 * the initial order.
 * @param {Array<Tweet>} currentTweets
 * @param {Array<Tweet>} newTweets
 * @returns {Array<Tweet>}
 */
export const addPastTweets = (
  currentTweets: TweetProp[],
  pastTweets: TweetProp[],
): TweetProp[] => {
  const allTweets = [...currentTweets, ...pastTweets]

  const tweetMap: Map<number, TweetProp> = new Map(
    allTweets.map((tweet) => [tweet.id, tweet]),
  )

  return Array.from(tweetMap.values())
}
