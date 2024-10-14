import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="container">
    <img
      src="https://res.cloudinary.com/dzyzdtel2/image/upload/v1728458024/Group_7519_hrkqmn.png"
      alt="page not found"
      className="notfound"
    />
    <h1 className="notfoundtext">PAGE NOT FOUND</h1>
    <p className="suggestion">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/" className="homeroute">
      <button type="button" className="gotohome">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
