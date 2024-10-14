import React from 'react'

const GithubContext = React.createContext({
  username: '',
  activeRoute: 'Home',
  enterUsername: () => {},
  changeRoute: () => {},
})

export default GithubContext
