import GithubContext from '../GithubContext'
import Repository from '../Repository'

const RepositoryRoute = () => (
  <GithubContext.Consumer>
    {value => {
      const {username} = value
      return <Repository username={username} />
    }}
  </GithubContext.Consumer>
)
export default RepositoryRoute
