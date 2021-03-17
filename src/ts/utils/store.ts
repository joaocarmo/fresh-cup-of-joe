import type { TweetProp } from '../components/tweet'
import { addNewTweets } from './functions'
import { ACTION_ADD_TWEETS } from './constants'

type Action = {
  type: string
}

type State = {
  tweets: TweetProp[]
}

export const initialState = {
  tweets: [],
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION_ADD_TWEETS:
      return { ...state, tweets: addNewTweets(state.tweets, action.payload) }
    default:
      return state
  }
}
