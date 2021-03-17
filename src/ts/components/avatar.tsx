import { AVATAR_SIZE } from '../utils/constants'

type AvatarProps = {
  src: string
}

const style = {
  backgroundColor: '#aaa',
  borderColor: '#aaa',
  borderRadius: AVATAR_SIZE,
  borderStyle: 'solid',
  borderWidth: '1px',
  height: AVATAR_SIZE,
  margin: '1em 0.5em 0em 0.5em',
  width: AVATAR_SIZE,
}

const Avatar = ({ src }: AvatarProps): JSX.Element => (
  <img src={src} alt="" style={style} />
)

export default Avatar
