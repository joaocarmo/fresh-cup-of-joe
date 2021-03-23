import type { TweetProp } from '../components/tweet'
import { addNewTweets } from './functions'
import {
  ACTION_ADD_TWEETS,
  ACTION_SET_AUTO_REFRESH,
  ACTION_SET_IS_LOADING,
} from './constants'

type Action = {
  type: string
  payload: unknown
}

type State = {
  autoRefreshEnabled: boolean
  isLoading: boolean
  tweets: TweetProp[]
}

export const initialState = {
  autoRefreshEnabled: true,
  isLoading: true,
  tweets: [],
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION_ADD_TWEETS:
      return {
        ...state,
        tweets: addNewTweets(state.tweets, action.payload as TweetProp[]),
      }
    case ACTION_SET_AUTO_REFRESH:
      return { ...state, autoRefreshEnabled: action.payload as boolean }
    case ACTION_SET_IS_LOADING:
      return { ...state, isLoading: action.payload as boolean }
    default:
      return state
  }
}
