import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import GithubContext from './components/GithubContext'
import HomeRoute from './components/HomeRoute'
import RepositoryRoute from './components/RepositoryRoute'
import AnalysisRoute from './components/AnalysisRoute'
import RepositoryItemDetailsRoute from './components/RepositoryItemDetailsRoute'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  state = {username: '', activeRoute: 'Home', profileDetails: []}

  enterUsername = event => {
    this.setState({username: event.target.value})
  }

  changeRoute = r => {
    this.setState({activeRoute: r})
  }

  addProfile = p => {
    console.log(p)
    this.setState({profileDetails: [p]})
  }

  render() {
    const {username, activeRoute, profileDetails} = this.state
    return (
      <GithubContext.Provider
        value={{
          username,
          activeRoute,
          profileDetails,
          enterUsername: this.enterUsername,
          changeRoute: this.changeRoute,
          addProfile: this.addProfile,
        }}
      >
        <Switch>
          <Route exact path="/" component={HomeRoute} />
          <Route exact path="/repositories" component={RepositoryRoute} />
          <Route
            exact
            path="/repositories/:repoName"
            component={RepositoryItemDetailsRoute}
          />
          <Route exact path="/analysis" component={AnalysisRoute} />
          <Route component={NotFound} />
        </Switch>
      </GithubContext.Provider>
    )
  }
}

export default App
