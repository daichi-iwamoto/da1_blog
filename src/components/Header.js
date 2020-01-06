import React from 'react'
import { Link } from 'gatsby'

const Header = class extends React.Component {
  render() {
    return (
        <header className="header">
            <div className="logo">
                <p>test</p>
            </div>
            <div className="links">
                <Link to="/page-2/"><p>Profile</p></Link>
                <Link to="/blog/"><p>Blog</p></Link>
            </div>
        </header>
    )
  }
}

export default Header
