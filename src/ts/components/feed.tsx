import Tweet from './tweet'
import type { TweetProp } from './tweet'

type FeedProps = {
  data: TweetProp[]
}

const styles = {
  feed: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'flex-start',
    padding: '0.4em 0.8em',
    width: '100%',
  },
}

/**
 *
 * @component
 * @example
 * <Feed
 *   tweets={[
 *     {
 *       image: 'https://i.pravatar.cc/300?u=100',
 *       id: 100,
 *       text: 'Hello there !',
 *       username: 'Kenobi',
 *       timeStamp: 1616014391585,
 *     },
 *   ]}
 * />
 */
const Feed = ({ data }: FeedProps): JSX.Element => (
  <section style={styles.feed}>
    {data.map((tweet) => (
      <Tweet key={tweet.id} tweet={tweet} />
    ))}
  </section>
)

export default Feed
