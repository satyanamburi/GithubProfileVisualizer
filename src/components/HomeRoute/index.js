import GithubContext from '../../GithubContext'
import Home from '../Home'

const HomeContainer = () => (
  <GithubContext.Consumer>
    {value => {
      const {username, profileDetails, addProfile} = value
      console.log(username)
      return (
        <Home
          username={username}
          profileDetails={profileDetails}
          addProfile={addProfile}
        />
      )
    }}
  </GithubContext.Consumer>
)
export default HomeContainer
