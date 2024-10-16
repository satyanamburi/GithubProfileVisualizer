import './index.css'

const Contributors = props => {
  const {contributors} = props
  const updatedContributors = contributors.map(c => ({
    avatarUrl: c.avatar_url,
    id: c.id,
  }))
  const getContributors = () => {
    const contributorsList = []
    for (let i = 0; i < updatedContributors.length; i += 1) {
      const contributor = updatedContributors[i]
      const {avatarUrl, id} = contributor
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
