type AvatarProps = {
  src: string
}

const style = {
  borderColor: '#aaa',
  borderRadius: '50px',
  borderStyle: 'solid',
  borderWidth: '1px',
  height: 'auto',
  margin: '1em 0.5em 0em 0.5em',
  maxWidth: '50px',
  width: '100%',
}

const Avatar = ({ src }: AvatarProps): JSX.Element => (
  <img src={src} alt="User avatar" style={style} />
)

export default Avatar
