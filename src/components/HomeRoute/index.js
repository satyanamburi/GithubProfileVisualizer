import GithubContext from '../GithubContext'
import Home from '../Home'

const HomeContainer = () => (
  <GithubContext.Consumer>
    {value => {
      const {username} = value
      return <Home username={username} />
    }}
  </GithubContext.Consumer>
)
export default HomeContainer
