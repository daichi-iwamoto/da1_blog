import React from 'react'
import { Link } from 'gatsby'

const Header = class extends React.Component {
  render() {
    return (
        <header id="header">
            <div className="header-box">
                <div className="logo">
                    <p>test</p>
                </div>
                <div className="links">
                    <Link to="/blog/"><p><span className="head-text">D</span>eveloper mode <span role="img" aria-label="devs">&#x1f60e;</span></p></Link>
                    <Link to="/blog/"><p><span className="head-text">U</span>sed skills <span role="img" aria-label="glasses">&#x1f9d0;</span></p></Link>
                    <Link to="/page-2/"><p><span className="head-text">P</span>rofile <span role="img" aria-label="pc">&#x1f4bb;</span></p></Link>
                    <Link to="/blog/"><p><span className="head-text">B</span>log <span role="img" aria-label="book">&#x1f4d6;</span></p></Link>
                    <Link to="/blog/"><p><span className="head-text">Q</span>iita </p></Link>
                    <a href="#footer">footer</a>
                </div>
            </div>
        </header>
    )
  }
}

export default Header
