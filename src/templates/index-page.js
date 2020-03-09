import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

// 関数コンポーネント（skillの各名称）
function SkillDatas(props) {
  const skills = props.names.map((val) =>
    <div className="skill-name">
      <div className="name">
        <img src={val.icon.childImageSharp.fluid.src} alt={val.name} />
        <p>{val.name}</p>
      </div>
      <div className="graph-box">
        <div className="graph"></div>
      </div>
      <div
        className="question-box"
      >
        <p>
          ?
        </p>
      </div>
      <div
        className="detail-box"
      >
        <p>{val.detail}</p>
      </div>
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
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      show: []
    }
  }

  componentDidMount = () => {
    this.props.skill.map((val) =>
      alert("hey")
      // this.setState({
      //   show: this.state.show.concat([{ [val.skillData.name]: {flag: true} }])
      // })
    )
  }

  hoverOn = () => {
    this.setState({ hover: true });
  }

  hoverOff = () => {
    this.setState({ hover: false });
  }

  render() {
    const components = this.props.skill.map((skills) =>
      <div className="skills">
        <p className="skill-type">{skills.type}</p>
        <SkillDatas names={skills.skilldata} />
      </div>
    )

    return components
  }

}

export const IndexPageTemplate = ({ content, skill, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section id="index">
      <div className="mainv"></div>
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

IndexPageTemplate.propTypes = {
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  skill: PropTypes.array,
}

const IndexPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <IndexPageTemplate
        contentComponent={HTMLContent}
        content={post.html}
        skill={post.frontmatter.skill}
      />
    </Layout>
  )
}

// propTypes 型チェック
IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default IndexPage

export const IndexPageQuery = graphql`
  query IndexPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        skill {
          type
          skilldata {
            name
            icon {
              childImageSharp {
                fluid {
                  src
                }
              }
            }
            detail
          }
        }
      }
    }
  }
`
