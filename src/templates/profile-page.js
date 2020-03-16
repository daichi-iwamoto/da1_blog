import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

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
      <div>
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

// 関数コンポーネント（skillの各名称）
function SkillDatas(props) {
  const skills = props.skilldata.map((val) =>
    <div className="skill-name">
      <div className="name">
        <p>{val.name}</p>
      </div>
      <div className="graph-box">
        <div className={"graph l-" + val.level}></div>
      </div>
      <SkillDetail detail={val.detail} />
    </div>
  );

  return (
    <div>
      {skills}
    </div>
  )
}

// クラスコンポーネント（スキルの種類）
class Skills extends React.Component {
  render() {
    const components = this.props.skill.map((skills) =>
      <div className="skills">
        <p className="skill-type">{skills.type}</p>
        <SkillDatas skilldata={skills.skilldata} />
      </div>
    )
    return components
  }
}

export const ProfilePageTemplate = ({ content, skill, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section id="profile">
      <div className="contents">
        <div className="intro">
          <div className="da1-img">
            <div></div>
          </div>
          <PageContent className="comment" content={content} />
        </div>
        <div className="skill-box">
          <Skills skill={skill} />
        </div>
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
      <ProfilePageTemplate
        contentComponent={HTMLContent}
        content={post.html}
        skill={post.frontmatter.skill}
      />
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
