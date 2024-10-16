import {Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {useState} from 'react'
import GithubContext from '../GithubContext'
import './index.css'

const Header = () => {
  const [show, setFun] = useState(false)

  const showmenu = () => {
    setFun(prevState => !prevState)
  }

  return (
    <GithubContext.Consumer>
      {value => {
        const {activeRoute, changeRoute} = value

        const changeroute = r => {
          changeRoute(r)
        }

        return (
          <nav>
            <ul className="group7490">
              <Link
                className="gitlink"
                onClick={() => changeroute('Home')}
                to="/"
              >
                <h1 className="github">GitHub Profile Visualizer</h1>
              </Link>
              <Link
                onClick={() => changeroute('Home')}
                className={`home ${activeRoute === 'Home' ? 'blue' : ''}`}
                to="/"
              >
                <li>Home</li>
              </Link>
              <Link
                onClick={() => changeroute('Repositories')}
                className={`repositories ${
                  activeRoute === 'Repositories' ? 'blue' : ''
                }`}
                to="/repositories"
              >
                <li>Repositories</li>
              </Link>
              <Link
                onClick={() => changeroute('Analysis')}
                className={`repositories ${
                  activeRoute === 'Analysis' ? 'blue' : ''
                }`}
                to="/analysis"
              >
                <li>Analysis</li>
              </Link>
            </ul>
            <div className="nav-bar">
              <Link
                className="gitlink"
                onClick={() => changeroute('Home')}
                to="/"
              >
                <h1 className="github">GitHub Profile Visualizer</h1>
              </Link>
              <GiHamburgerMenu color="#ffffff" size={24} onClick={showmenu} />
            </div>
            <div className="nav-items">
              {show && (
                <div>
                  <Link
                    onClick={() => changeroute('Home')}
                    className={`home ${activeRoute === 'Home' ? 'blue' : ''}`}
                    to="/"
                  >
                    <p>Home</p>
                  </Link>
                  <Link
                    onClick={() => changeroute('Repositories')}
                    className={`repositories ${
                      activeRoute === 'Repositories' ? 'blue' : ''
                    }`}
                    to="/repositories"
                  >
                    <p>Repositories</p>
                  </Link>
                  <Link
                    onClick={() => changeroute('Analysis')}
                    className={`repositories ${
                      activeRoute === 'Analysis' ? 'blue' : ''
                    }`}
                    to="/analysis"
                  >
                    <p>Analysis</p>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )
      }}
    </GithubContext.Consumer>
  )
}

export default Header
