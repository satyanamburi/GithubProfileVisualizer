import './index.css'

const Contributors = props => {
  const {contributors} = props
  const getContributors = () => {
    const contributorsList = []
    for (let i = 0; i < contributors.length; i += 1) {
      const contributor = contributors[i]
      const {avatarUrl, id} = contributor({
        avatarUrl: contributor.avatar_url,
        id: contributor.id,
      })
      contributorsList.push(
        <img
          key={id}
          src={avatarUrl}
          alt="contributor profile"
          className="contributorImg"
        />,
      )
    }
    const listLength = contributors.length
    contributorsList.splice(4)
    if (listLength > 4) {
      contributorsList.push(<p className="moreContributors">+{listLength}</p>)
    }

    return contributorsList
  }
  return (
    <div>
      <p className="members">{contributors.length} Members</p>

      {getContributors()}
    </div>
  )
}

export default Contributors
