import React from 'react'
import { Link } from 'gatsby'

const Header = class extends React.Component {
  render() {
    return (
        <header id="header">
            <div className="header-box">
                <div className="logo"></div>
                <div className="links">
                    <Link to="/"><p><span className="head-text">B</span>log</p></Link>
                    <Link to="/profile/"><p><span className="head-text">P</span>rofile</p></Link>
                    <Link to="/contact/"><p><span className="head-text">C</span>ontact</p></Link>
                </div>
            </div>
        </header>
    )
  }
}

export default Header
