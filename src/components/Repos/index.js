import {Link} from 'react-router-dom'

import './index.css'

const Repos = props => {
  const {repodetails} = props
  const updatedRepoItems = repo => ({
    name: repo.name,
    owner: repo.owner,
    description: repo.description,
    stargazersCount: repo.stargazers_count,
    forksCount: repo.forks_count,
    languages: repo.languages,
  })
  const repoItems = updatedRepoItems(repodetails)
  const {
    name,
    owner,
    description,
    stargazersCount,
    forksCount,
    languages,
  } = repoItems
  const updatedOwner = o => ({
    avatarUrl: o.avatar_url,
    login: o.login,
  })
  const {avatarUrl, login} = updatedOwner(owner)

  const languagesList = ['color1', 'color2', 'color3', 'color4', 'color5']
  return (
    <Link to={`/repositories/${name}`} className="repo-link">
      <div data-testid="repoItem" className="repo-container">
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
              <p>{l.name}</p>
            </div>
          ))}
        </div>
        <div className="repo-counts">
          <div className="star-container">
            <img
              src="https://res.cloudinary.com/dzyzdtel2/image/upload/v1729001650/Star_-_16px.1_pkcugk.png"
              alt="star"
              className="star-image"
            />
            <p className="repo-starCount">{stargazersCount}</p>
          </div>
          <div className="star-container">
            <img
              src="https://res.cloudinary.com/dzyzdtel2/image/upload/v1729001743/Git_3_gdi0sx.png"
              alt="fork"
              className="star-image"
            />
            <p className="repo-starCount">{forksCount} </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Repos
