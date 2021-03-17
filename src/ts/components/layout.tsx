type LayoutProps = {
  children: React.ReactNode
}

const style = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  margin: '0 auto',
  maxWidth: '1280px',
  overflow: 'auto',
}

const Layout = ({ children }: LayoutProps): JSX.Element => (
  <div style={style}>{children}</div>
)

export default Layout
