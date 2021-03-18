type LayoutProps = {
  children: React.ReactNode
}

const styles = {
  layout: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: '0 auto',
    maxWidth: '1280px',
    overflow: 'auto',
  },
}

/**
 * Wraps the children in a common layout.
 * @component
 * @example
 * <Layout>
 *   <div>
 *     <p>I've been looking forward to this.</p>
 *   </div>
 * </Layout>
 */
const Layout = ({ children }: LayoutProps): JSX.Element => (
  <div style={styles.layout}>{children}</div>
)

export default Layout
