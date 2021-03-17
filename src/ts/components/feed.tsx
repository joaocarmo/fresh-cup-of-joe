import Tweet from './tweet'
import type { TweetProp } from './tweet'

type FeedProps = {
  data: TweetProp[]
}

const style = {
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: '0.4em 0.8em',
  width: '100%',
}

const Feed = ({ data }: FeedProps): JSX.Element => (
  <section style={style}>
    {data.map((tweet) => (
      <Tweet key={tweet.id} tweet={tweet} />
    ))}
  </section>
)

export default Feed
