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
            <Link to="/tags/code/"><p className="sub">Diary</p></Link>
            <Link to="/tags/code/"><p className="sub">Technical articles</p></Link>
            <Link to="/tags/code/"><p className="sub">Hobby</p></Link>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
