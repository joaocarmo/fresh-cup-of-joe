import Feed from './feed'
import Layout from './layout'
import '../styles/global.css'
import data from './data.json'

const App = (): JSX.Element => (
  <Layout>
    <Feed data={data} />
  </Layout>
)

export default App
