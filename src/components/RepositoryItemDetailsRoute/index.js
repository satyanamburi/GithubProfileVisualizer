import GithubContext from '../GithubContext'
import RepositoryItemDetails from '../RepositoryItemDetails'

const RepositoryItemDetailsRoute = props => {
  const {match} = props
  const {params} = match
  const {repoName} = params
  return (
    <GithubContext.Consumer>
      {value => {
        const {username} = value
        return <RepositoryItemDetails username={username} repoName={repoName} />
      }}
    </GithubContext.Consumer>
  )
}
export default RepositoryItemDetailsRoute
