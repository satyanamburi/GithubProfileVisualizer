import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import GithubContext from './components/GithubContext'
import HomeProps from './components/HomeProps'
import Repositry from './components/Repositry'
import Analysis from './components/Analysis'
import RepositoryItemDetails from './components/RepositoryItemDetails'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  state = {username: '', activeRoute: 'Home'}

  enterUsername = event => {
    this.setState({username: event.target.value})
  }

  changeRoute = r => {
    this.setState({activeRoute: r})
  }

  render() {
    const {username, activeRoute} = this.state
    return (
      <GithubContext.Provider
        value={{
          username,
          activeRoute,
          enterUsername: this.enterUsername,
          changeRoute: this.changeRoute,
        }}
      >
        <Switch>
          <Route exact path="/" component={HomeProps} />
          <Route exact path="/repositories" component={Repositry} />
          <Route
            exact
            path="/repositories/:repoName"
            component={RepositoryItemDetails}
          />
          <Route exact path="/analysis" component={Analysis} />
          <Route component={NotFound} />
        </Switch>
      </GithubContext.Provider>
    )
  }
}

export default App
