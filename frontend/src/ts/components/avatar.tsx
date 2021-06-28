import { AVATAR_SIZE } from '../utils/constants'

type AvatarProps = {
  src: string
}

const styles = {
  avatar: {
    backgroundColor: '#aaa',
    borderColor: '#aaa',
    borderRadius: AVATAR_SIZE,
    borderStyle: 'solid',
    borderWidth: '1px',
    height: AVATAR_SIZE,
    margin: '1em 0.5em 0em 0.5em',
    width: AVATAR_SIZE,
  },
}

/**
 * Renders a user's avatar.
 * @component
 * @example
 * <Avatar src="./my-image.jpg" />
 */
const Avatar = ({ src }: AvatarProps): JSX.Element => (
  <img src={src} alt="" style={styles.avatar} />
)

export default Avatar
