import { LOADING_MESSAGE } from '../utils/constants'

const styles = {
  loader: {
    backgroundColor: '#dee',
    borderRadius: '8px',
    fontSize: '0.8em',
    margin: '0 auto',
    opacity: 0.7,
    padding: '1em',
    position: 'absolute' as const,
    top: '2em',
  },
}

/**
 * Displays a loading indicator.
 * @component
 * @example
 * <Loader />
 */
const Loader = (): JSX.Element => (
  <div style={styles.loader}>{LOADING_MESSAGE}</div>
)

export default Loader
