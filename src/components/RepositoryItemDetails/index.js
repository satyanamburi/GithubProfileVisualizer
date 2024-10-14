import {Component} from 'react'
import Loader from 'react-loader-spinner'
import GithubContext from '../GithubContext'
import Header from '../Header'
import Contributors from '../Contributors'
import PieChart from '../PieChart'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  inProgress: 'IN_PROGRESS',
}
class RepositoryItemDetails extends Component {
  state = {
    repositoryItemDetailsList: '',
    apiStatus: apiStatusConstants.initial,
    flag: '',
  }

  onUsername = u => {
    const {flag} = this.state
    if (flag === '') {
      this.getRepositoryItemDetails(u)
      this.setState({flag: 'stoprender'})
    }
  }

  getRepositoryItemDetails = async username => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {repoName} = params

    const url = `https://apis2.ccbp.in/gpv/specific-repo/${username}/${repoName}?api_key=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`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      this.setState({
        repositoryItemDetailsList: data,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccess = () => {
    const {repositoryItemDetailsList} = this.state
    const updateRepository = {
      name: repositoryItemDetailsList.name,
      owner: repositoryItemDetailsList.owner,
      description: repositoryItemDetailsList.description,
      stargazersCount: repositoryItemDetailsList.stargazers_count,
      forksCount: repositoryItemDetailsList.forks_count,
      languages: repositoryItemDetailsList.lanuages,
      issuesCount: repositoryItemDetailsList.open_issues_count,
      contributors: repositoryItemDetailsList.contributors,
      watchersCount: repositoryItemDetailsList.watchers_count,
    }
    const {
      name,
      owner,
      description,
      stargazersCount,
      forksCount,
      languages,
      issuesCount,
      contributors,
      watchersCount,
    } = updateRepository
    const ownerAvatar = {avatarUrl: owner.avatar_url, login: owner.login}

    const {avatarUrl, login} = ownerAvatar
    const languagesList = ['color1', 'color2', 'color3', 'color4', 'color5']
    return (
      <div data-testid="repoItem" className="repo-container repo-item">
        <h1 className="repositories-head">Repositories</h1>
        <div className="repo-header">
          <h1 className="repo-name">{name}</h1>
          <img src={avatarUrl} alt={login} className="repo-avatar" />
        </div>
        <p className="repo-desc">{description}</p>
        <div className="languagesContainer">
          {languages.map(l => (
            <div
              key={l.value}
              className={`language ${
                languagesList[Math.floor(Math.random() * 5)]
              }`}
            >
              <h1>{l.name}</h1>
            </div>
          ))}
        </div>
        <div className="repo-counts">
          <div className="star-container">
            <img
              src="https://res.cloudinary.com/ddsn9feta/image/upload/v1719294440/Star_-_16px.1_cpjsj4.png"
              alt="star"
              className="star-image"
            />
            <p className="repo-starCount">{stargazersCount}</p>
          </div>
          <div className="star-container">
            <img
              src="https://res.cloudinary.com/ddsn9feta/image/upload/v1719294440/Git_3_w5zp4b.png"
              alt="git"
              className="star-image"
            />
            <p className="repo-starCount">{forksCount} </p>
          </div>
        </div>
        <div className="issueContainer">
          <p className="issues">Issues Counts</p>
          <p className="issues">{issuesCount}</p>
        </div>
        <div className="issueContainer">
          <p className="issues">Watchers Counts</p>
          <p className="issues">{watchersCount}</p>
        </div>
        <h1 className="contributors">Contributors:</h1>
        <Contributors contributors={contributors} />
        <h1 className="contributors">Languages:</h1>
        <div className="pieChartContainer">
          <PieChart languages={languages} />
        </div>
      </div>
    )
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderFailure = () => (
    <div>
      <div className="frame8830">
        <p className="textGithub">Github Profile Visualizer</p>
        <img
          src="https://res.cloudinary.com/dzyzdtel2/image/upload/v1728056080/Group_7522_f6wxgu.png"
          alt="failure view"
          className="group2img"
        />
        <p className="wrong">Something went wrong. Please try again</p>
        <button
          type="button"
          className="tryagain"
          onClick={this.getRepositryDetails}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderdetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <GithubContext.Consumer>
        {value => {
          const {username} = value
          this.onUsername(username)
          return (
            <div className="repositoryContainer">
              <Header />
              <h1 className="repositories-head">Repositories</h1>
              {this.renderdetails()}
            </div>
          )
        }}
      </GithubContext.Consumer>
    )
  }
}

export default RepositoryItemDetails
