import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {Component} from 'react'
import Header from '../Header'
import Repos from '../Repos'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  nodata: 'NODATA',
}
class Repositry extends Component {
  state = {
    repos: [],
    apistatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    const {username} = this.props
    if (username === '') {
      this.setState({
        apistatus: apiStatusConstants.nodata,
      })
    } else {
      this.getRepositryDetails()
    }
  }

  getRepositryDetails = async () => {
    const {username} = this.props
    this.setState({apistatus: apiStatusConstants.loading})
    const url = `https://apis2.ccbp.in/gpv/repos/${username}?api_key=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`
    const option = {
      method: 'GET',
    }
    const response = await fetch(url, option)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      this.setState({
        repos: data,
        apistatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apistatus: apiStatusConstants.failure})
    }
  }

  renderSuccess = () => {
    const {repos} = this.state
    return (
      <div>
        {repos.length === 0 ? (
          <div>
            <img
              src="https://res.cloudinary.com/dzyzdtel2/image/upload/v1728393728/noRepositoryfound_vjyxu2.png"
              className="norepositry"
              alt="no repositories"
            />
            <h1 className="notfound">No Repositories Found!</h1>
          </div>
        ) : (
          repos.map(r => <Repos key={r.id} repodetails={r} />)
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
          alt="empty repositories"
          className="group2img"
        />
        <p className="textGithub">No Data Found!</p>
        <p className="emptyusername">
          GitHub Username is empty, please provide a valid username for
          Repositories
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
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.loading:
        return this.renderLoading()
      case apiStatusConstants.nodata:
        return this.renderNoData()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="repositoryContainer">
        <Header />
        <h1 className="repositories-head">Repositories</h1>
        {this.renderdetails()}
      </div>
    )
  }
}

export default Repositry
