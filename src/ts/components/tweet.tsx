import Avatar from './avatar'
import { sanitizeText } from '../utils/functions'

export type TweetProp = {
  image: string
  id: number
  text: string
  username: string
  timeStamp: number
}

type TweetProps = {
  tweet: TweetProp
}

const styles = {
  tweetContainer: {
    alignItems: 'flex-start',
    borderColor: '#e6e6e6',
    borderRadius: '0.4em',
    borderStyle: 'solid',
    borderWidth: '1px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: '0.4em',
    marginTop: '0.4em',
    width: '100%',
  },
  tweetAvatar: {},
  tweetContent: {
    flex: 1,
    margin: '0.5em',
  },
  tweetTitle: {
    margin: '0.4em 0',
  },
  tweetText: {
    borderRadius: '0.4em',
    padding: '1em',
    backgroundColor: '#efefef',
  },
  tweetTimeStamp: {
    color: '#909090',
    fontSize: '0.8em',
  },
}

const Tweet = ({
  tweet: { image, text, username, timeStamp },
}: TweetProps): JSX.Element => (
  <div style={styles.tweetContainer}>
    <aside style={styles.tweetAvatar}>
      <Avatar src={image} />
    </aside>
    <article style={styles.tweetContent}>
      <h4 style={styles.tweetTitle}>{username}</h4>
      <p style={styles.tweetText}>{sanitizeText(text)}</p>
      <time style={styles.tweetTimeStamp}>
        {new Date(timeStamp).toLocaleString()}
      </time>
    </article>
  </div>
)

export default Tweet
