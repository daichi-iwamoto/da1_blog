import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

// 関数コンポーネント（skillの各名称）
function SkillName(props) {
  const skills = props.skill.map((name) =>
    <p>{name}</p>
  );

  return (
    <div className="skill-name">
      {skills}
    </div>
  )
}

// 関数コンポーネント（スキルの種類）
function Skills(props) {
  const components = props.skill.map((skills) =>
    <div className="skills">
      <p className="skill-type">{skills.type}</p>
      <SkillName skill={skills.skillname} />
    </div>
  );

  return components;
}

export const ProfilePageTemplate = ({ title, content, skill, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section id="profile">
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

ProfilePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  skill: PropTypes.array,
}

const ProfilePage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ProfilePageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
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
        title
        skill {
          type
          skillname
        }
      }
    }
  }
`
