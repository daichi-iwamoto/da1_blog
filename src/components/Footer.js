import React from 'react'
import { Link } from 'gatsby'

const Footer = class extends React.Component {
  render() {
    return (
      <footer id="footer">
        <div className="footer-box">
          <div className="links">
            <Link to="/blog/"><p>Developer mode</p></Link>
            <Link to="/blog/"><p>Used skills</p></Link>
            <Link to="/page-2/"><p>Profile</p></Link>
            <Link to="/blog/"><p>Qiita</p></Link>
          </div>
          <div className="links">
            <Link to="/blog/"><p>Blog</p></Link>
            <Link to="/blog/"><p>Diary</p></Link>
            <Link to="/blog/"><p>Technical articles</p></Link>
            <Link to="/blog/"><p>hobby</p></Link>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
