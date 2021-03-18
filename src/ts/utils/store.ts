import type { TweetProp } from '../components/tweet'
import { addNewTweets } from './functions'
import { ACTION_ADD_TWEETS, ACTION_SET_IS_LOADING } from './constants'

type Action = {
  type: string
  payload: unknown
}

type State = {
  tweets: TweetProp[]
  isLoading: boolean
}

export const initialState = {
  tweets: [],
  isLoading: true,
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION_ADD_TWEETS:
      return { ...state, tweets: addNewTweets(state.tweets, action.payload) }
    case ACTION_SET_IS_LOADING:
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}