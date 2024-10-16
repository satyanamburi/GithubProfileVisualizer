import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {HiOutlineSearch} from 'react-icons/hi'
import {RiBuildingLine} from 'react-icons/ri'
import {IoLink, IoLocationSharp} from 'react-icons/io5'
import Header from '../Header'
import GithubContext from '../GithubContext'
import './index.css'

const apistatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}
class Counter extends Component {
  state = {
    apistatus: 'INITIAL',
    profile: [],
    errorMsg: '',
  }

  componentDidMount() {
    this.getGithubProfile()
  }

  getGithubProfile = async () => {
    const {username} = this.props
    this.setState({apistatus: 'LOADING'})
    const url = `https://api.github.com/users/${username}?api_key=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`
    const option = {method: 'GET'}
    const response = await fetch(url, option)
    if (response.ok) {
      const data = await response.json(response)
      const updatedProfile = {
        avatarUrl: data.avatar_url,
        name: data.name,
        bio: data.bio,
        followers: data.followers,
        followersUrl: data.followers_url,
        following: data.following,
        followingUrl: data.following_url,
        publicRepos: data.public_repos,
        location: data.location,
        blog: data.blog,
      }
      console.log(data)
      this.setState({
        profile: updatedProfile,
        apistatus: 'SUCCESS',
      })
    } else {
      this.setState({apistatus: 'FAILURE'})
    }
  }

  onUsername = () => {
    const {username} = this.props
    if (username === '') {
      this.setState({
        errorMsg: 'Enter the valid github username',
        apistatus: apistatusConstants.failure,
      })
    } else {
      this.getGithubProfile()
      this.setState({errorMsg: ''})
    }
  }

  rendersuccess = () => {
    const {profile} = this.state
    const {
      avatarUrl,
      name,
      bio,
      followers,
      following,
      publicRepos,
      location,
      blog,
    } = profile
    return (
      <div className="profile">
        <img src={avatarUrl} className="avatar" alt={name} />
        <p className="name">{name}</p>
        <p className="follow-head">BIO</p>
        <p className="bio">{bio}</p>
        <p className="follow-head">BLOG</p>
        <p className="bio">{blog}</p>
        <div className="follow-container">
          <div>
            <p className="follow-head">{followers}</p>
            <p className="follow-count">FOLLOWERS</p>
          </div>
          <div>
            <p className="follow-head">{following}</p>
            <p className="follow-count">FOLLOWING</p>
          </div>
          <div>
            <p className="follow-head">{publicRepos}</p>
            <p className="follow-count">PUBLIC REPOS</p>
          </div>
        </div>
        <div className="about-company">
          <div>
            <p className="company-head">Company</p>
            <p className="company-details">
              <RiBuildingLine size={24} />
              Github
            </p>
          </div>
          <div>
            <p className="company-head">Location</p>
            <p className="company-details">
              <IoLocationSharp size={24} />
              {location}
            </p>
          </div>
          <div>
            <p className="company-head">Company Url</p>
            <p className="company-details">
              <IoLink size={24} />
              https://githubsourcework.xyz
            </p>
          </div>
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
        <button type="button" className="tryagain" onClick={this.onUsername}>
          Try Again
        </button>
      </div>
    </div>
  )

  renderdetails = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case apistatusConstants.success:
        return this.rendersuccess()
      case apistatusConstants.failure:
        return this.renderFailure()
      case apistatusConstants.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    const {errorMsg, profile} = this.state
    return (
      <GithubContext.Consumer>
        {value => {
          const {username, enterUsername} = value
          const onSearch = event => {
            enterUsername(event)
          }
          return (
            <div className="homeContainer">
              <Header />
              <div className="searchContainer">
                <input
                  type="search"
                  className="input"
                  placeholder="Enter github username"
                  value={username}
                  onChange={onSearch}
                />
                <button
                  label="input"
                  type="button"
                  data-testid="searchButton"
                  onClick={this.onUsername}
                  className="outlinesearch"
                >
                  <HiOutlineSearch size={24} color="#ffffff" />
                </button>
              </div>
              {errorMsg && <p className="error">{errorMsg}</p>}
              {profile.length === 0 ? (
                <div className="frame8830">
                  <p className="textGithub">Github Profile Visualizer</p>
                  <img
                    src="https://res.cloudinary.com/dzyzdtel2/image/upload/v1728054782/akv0fe40pljpgyg8dbjp.png"
                    alt="gitHub profile visualizer home page"
                    className="group2img"
                  />
                </div>
              ) : (
                this.renderdetails()
              )}
            </div>
          )
        }}
      </GithubContext.Consumer>
    )
  }
}

export default Counter
