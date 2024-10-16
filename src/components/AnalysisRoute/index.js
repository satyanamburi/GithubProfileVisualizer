import GithubContext from '../GithubContext'
import Analysis from '../Analysis'

const AnalysisRoute = () => (
  <GithubContext.Consumer>
    {value => {
      const {username} = value
      return <Analysis username={username} />
    }}
  </GithubContext.Consumer>
)
export default AnalysisRoute
