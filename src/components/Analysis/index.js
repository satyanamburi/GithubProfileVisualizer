import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Header from '../Header'
import PieChart from '../PieChart'
import LinearChart from '../LinearChart'
import './index.css'

const apistatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  nodata: 'NODATA',
}
class Analysis extends Component {
  state = {analysis: [], apistatus: apistatusConstants.initial}

  componentDidMount() {
    const {username} = this.props
    if (username === '') {
      this.setState({
        apistatus: apistatusConstants.nodata,
      })
    } else {
      this.getAnalysisDetails()
    }
  }

  getAnalysisDetails = async () => {
    const {username} = this.props
    this.setState({apistatus: apistatusConstants.loading})
    const url = `https://apis2.ccbp.in/gpv/profile-summary/${username}?api_key=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`
    const option = {
      method: 'GET',
    }
    const response = await fetch(url, option)
    if (response.ok) {
      const data = await response.json()

      this.setState({analysis: data, apistatus: apistatusConstants.success})
    } else {
      this.setState({apistatus: apistatusConstants.failure})
    }
  }

  renderSuccess = () => {
    const {analysis} = this.state
    const {
      langCommitCount,
      langRepoCount,
      quarterCommitCount,
      repoCommitCount,
    } = analysis
    const commitKeys = Object.keys(langCommitCount)
    const langCommitsCount = commitKeys.map(i => ({
      name: i,
      value: langCommitCount[i],
    }))
    const repoKeys = Object.keys(langRepoCount)
    const langReposCount = repoKeys.map(i => ({
      name: i,
      value: langRepoCount[i],
    }))
    const quarterKeys = Object.keys(quarterCommitCount)
    const quarterCommitsCount = quarterKeys.map(i => ({
      name: i,
      commits: quarterCommitCount[i],
    }))
    const k = Object.keys(repoCommitCount)
    const repoCommitsCount = k.map(i => ({name: i, value: repoCommitCount[i]}))
    return (
      <div>
        {analysis.length === 0 ? (
          <div>
            <img
              src="https://res.cloudinary.com/dzyzdtel2/image/upload/v1728393728/noRepositoryfound_vjyxu2.png"
              className="norepositry"
              alt="no analysis"
            />
            <h1 className="notfound">No Data Found</h1>
          </div>
        ) : (
          <div>
            <LinearChart
              className="linearchart"
              quarterCommitsCount={quarterCommitsCount}
            />
            <div className="pieChartContainer">
              <div className="piechart">
                <h1 className="pieCharthead">Language Per Repos</h1>
                <PieChart
                  className="commitsCount"
                  languages={langCommitsCount}
                />
              </div>
              <div className="piechart">
                <h1 className="pieCharthead">Language Per Commits</h1>
                <PieChart languages={langReposCount} />
              </div>
            </div>
            <h1 className="pieCharthead">Commits Per Repo (Top 10)</h1>
            <PieChart languages={repoCommitsCount} />
          </div>
        )}
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

  renderNoData = () => (
    <div>
      <div className="frame8830">
        <img
          src="https://res.cloudinary.com/dzyzdtel2/image/upload/v1728456629/Empty_Box_Illustration_1_quiubk.png"
          alt="empty analysis"
          className="group2img"
        />
        <p className="textGithub">No Data Found</p>
        <p className="emptyusername">
          GitHub Username is empty, please provide a valid username for Analysis
        </p>
        <Link to="/" className="homeroute">
          <button type="button" className="tryagain">
            Go To Home
          </button>
        </Link>
      </div>
    </div>
  )

  renderdetails = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case apistatusConstants.success:
        return this.renderSuccess()
      case apistatusConstants.failure:
        return this.renderFailure()
      case apistatusConstants.loading:
        return this.renderLoading()
      case apistatusConstants.nodata:
        return this.renderNoData()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="repositoryContainer">
        <Header />
        <h1 className="repositories-head">Analysis</h1>
        {this.renderdetails()}
      </div>
    )
  }
}

export default Analysis
