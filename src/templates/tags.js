import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Footer from '../components/Footer'

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const postLinks = posts.map(post => (
      <div className="posts">
        <div className="hover-box">Read</div>
        <Link className="blog-link" to={post.node.fields.slug}>
          <article>
            <div className="post-data">
              <p className="post-meta">
                {post.node.frontmatter.title}
              </p>
              <p className="post-description">
                {post.node.frontmatter.description}
              </p>
              <p className="post-date">
                {post.node.frontmatter.date}
              </p>
            </div>
          </article>
        </Link>
      </div>
    ))

    const tag = this.props.pageContext.tag
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const tagHeader = `【 ${tag} 】タグ一覧（${totalCount}）`

    return (
      <Layout>
        <Header />
        <section id="tags">
          <Helmet title={`${tag} | ${title}`} />
          <h3 className="title is-size-4 is-bold-light">{tagHeader}</h3>
          <ul className="taglist">{postLinks}</ul>
          <p className="all-tags">
            <Link to="/tags/">タグ一覧表示</Link>
          </p>
        </section>
        <Footer />
      </Layout>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY/MM/DD")
            description
          }
        }
      }
    }
  }
`
