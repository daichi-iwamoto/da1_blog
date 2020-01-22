import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  mainv,
  tags,
  title,
  helmet,
  date,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section id="posts">
      {helmet || ''}
      <div className="title-box">
        <img src={mainv.childImageSharp.fluid.src} alt="mainv" className="mainv" />
        <div className="post-title">
          <h1>
            {title}
          </h1>
          <p>投稿日：{date}</p>
        </div>
      </div>
      {tags && tags.length ? (
      <div className="tag-box">
        <ul className="taglist">
          {tags.map(tag => (
            <Link to={`/tags/${kebabCase(tag)}/`}>
              <li className="tag-link" key={tag + `tag`}>
                <p className="tagname">{tag}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      ) : null}
      <PostContent className="post-body" content={content} />
    </section>
  )
}

BlogPostTemplate.propTypes = {
  mainv: PropTypes.object,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  helmet: PropTypes.object,
  date: PropTypes.string,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        date={post.frontmatter.date}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        mainv={post.frontmatter.mainv}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "YYYY/MM/DD")
        mainv {
          childImageSharp {
            fluid {
              src
            }
          }
        }
        title
        description
        tags
      }
    }
  }
`
