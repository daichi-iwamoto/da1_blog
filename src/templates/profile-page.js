import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

// 関数コンポーネント（Skilの各名称）
function SkilName(props) {
  const skils = props.skil.map((name) =>
    <p>{name}</p>
  );

  return (
    <div className="skil-name">
      {skils}
    </div>
  )
}

// 関数コンポーネント（スキルの種類）
function Skils(props) {
  const components = props.skil.map((skil) =>
    <div className="skils">
      <p className="skil-type">{skil.type}</p>
      <SkilName skil={skil.skilname} />
    </div>
  );

  return components;
}

export const ProfilePageTemplate = ({ title, content, skil, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section id="profile" className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <PageContent className="content" content={content} />
            </div>
            <Skils skil={skil} />
          </div>
        </div>
      </div>
    </section>
  )
}

ProfilePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  skil: PropTypes.array,
}

const ProfilePage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ProfilePageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        skil={post.frontmatter.skil}
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
        skil {
          type
          skilname
        }
      }
    }
  }
`
