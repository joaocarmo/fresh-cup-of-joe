import type { TweetProp } from '../components/tweet'
import { API_HOST, FETCH_MAX_RETRIES } from './constants'

export const debugLog = (...args: unknown): void => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(...args)
  }
}

export const sanitizeText = (text: string): string => {
  return text
}

export const fetchTweets = async ({
  afterId,
  count,
  retry = 0,
}: {
  afterId: number
  count: number
  retry: number
}): Promise<TweetProp[]> => {
  if (retry >= FETCH_MAX_RETRIES) {
    return []
  }

  const apiTweets = new URL(`${API_HOST}/api`)

  if (afterId) {
    apiTweets.searchParams.append('afterId', afterId)
  }

  if (count) {
    apiTweets.searchParams.append('count', count)
  }

  try {
    const response = await fetch(apiTweets)

    if (response.ok) {
      const data = await response.json()

      return data
    }
  } catch (err) {
    debugLog(err)
  }

  // If no data has been returned, the request failed and we should retry
  return fetchTweets({ afterId, count, retry: retry + 1 })
}

export const getLastTweetId = (tweets: TweetProp[]): number => {
  // The tweets are ordered from most to least recent
  if (tweets.length > 0) {
    const [lastTweet] = tweets
    return lastTweet?.id
  }

  return 0
}

export const addNewTweets = (
  currentTweets: TweetProp[],
  newTweets: TweetProp[],
): TweetProp[] => {
  const allTweets = [...newTweets, ...currentTweets]

  // Use a Map to filter out duplicate IDs and respect the order
  const uniqueTweets = [
    ...new Map(allTweets.map((tweet) => [tweet.id, tweet])).values(),
  ]

  return uniqueTweets
}
