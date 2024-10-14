import {Link} from 'react-router-dom'

import './index.css'

const Repos = props => {
  const {repodetails} = props
  const repoItems = repodetails({
    name: repodetails.name,
    owner: repodetails.owner,
    description: repodetails.description,
    stargazersCount: repodetails.stargazers_count,
    forksCount: repodetails.forks_count,
    languages: repodetails.languages,
  })
  const {
    name,
    owner,
    description,
    stargazersCount,
    forksCount,
    languages,
  } = repoItems
  const {avatarUrl, login} = owner({
    avatarUrl: owner.avatar_url,
    login: owner.login,
  })

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
      </div>
    </Link>
  )
}

export default Repos
