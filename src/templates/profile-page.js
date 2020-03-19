import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Content, { HTMLContent } from '../components/Content'
import { Link } from 'gatsby'

// クラスコンポーネント（技術詳細部分）
class SkillDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  showToggle = () => {
    this.setState({
      show: (this.state.show) ? false : true
    })
  }

  render() {
    return (
      <div className="detail-block">
        <div className="question-box">
          <p onClick={this.showToggle}>
            ?
          </p>
        </div>
        <div
          className={this.state.show ? 'detail-box active' : 'detail-box'}
        >
          <div 
            className="detail-contents-bg"
            onClick={this.showToggle}
          />
          <div className="detail-contents">
            <p>{this.props.detail}</p>
            <div
              className="detail-contents-close"
              onClick={this.showToggle}
            >
              ×
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// クラスコンポーネント（skillの各名称）
class SkillDatas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  showToggle = () => {
    this.setState({
      show: (this.state.show) ? false : true
    })
  }

  render() {
    const skills = this.props.skilldata.map((val) =>
      <div className="skill-name">
        <SkillDetail detail={val.detail} />
        <div className="graph-box">
          <div className={"graph l-" + val.level}></div>
        </div>
        <div className="name">
          <p>{val.name}</p>
        </div>
      </div>
    );
  
    return (
      <div className="skills">
        <div className="skill-type" onClick={this.showToggle}>{this.props.skilltype}</div>
        <div className={this.state.show ? 'skills-box active' : 'skills-box'}>
          {skills}
        </div>
      </div>
    )
  }
}

// クラスコンポーネント（スキルの種類）
class Skills extends React.Component {
  render() {
    const components = this.props.skill.map((skills) =>
        <SkillDatas skilltype={skills.type} skilldata={skills.skilldata} />
    )
    return components
  }
}

export const ProfilePageTemplate = ({ content, skill, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section id="profile">
      <div className="contents">
        <h1>Profile</h1>
        <div className="intro">
          <div className="da1-img">
            <div></div>
          </div>
          <PageContent className="comment" content={content} />
        </div>
        <section className="skill-box">
          <h2>Skill</h2>
          <Skills skill={skill} />
        </section>
      </div>
    </section>
  )
}

ProfilePageTemplate.propTypes = {
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  skill: PropTypes.array
}

const ProfilePage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <Header />
      <ProfilePageTemplate
        contentComponent={HTMLContent}
        content={post.html}
        skill={post.frontmatter.skill}
      />
      <Footer />
    </Layout>
  )
}

// propTypes 型チェック
ProfilePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ProfilePage

export const ProfilePageQuery = graphql`
  query ProfilePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        skill {
          type
          skilldata {
            name
            detail
            level
          }
        }
      }
    }
  }
`
