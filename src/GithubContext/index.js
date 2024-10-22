import React from 'react'

const GithubContext = React.createContext({
  username: '',
  activeRoute: 'Home',
  profileDetails: [],
  enterUsername: () => {},
  changeRoute: () => {},
  addProfile: () => {},
})

export default GithubContext
