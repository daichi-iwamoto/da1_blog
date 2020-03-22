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
      <Link className="blog-link" to={post.node.fields.slug}>
        <article>
          <div className="post-data">
            <div className="post-head">
              <img src={post.node.frontmatter.mainv.childImageSharp.fluid.src} alt="post-img" className="post-img" />
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
          </div>
        </article>
      </Link>
    ))

    const tag = this.props.pageContext.tag
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const tagHeader = `【 ${tag} 】${totalCount} posts`

    return (
      <Layout>
        <Header />
        <section id="tags">
          <Helmet title={`${tag} | ${title}`} />
          <h3 className="title is-size-4 is-bold-light">{tagHeader}</h3>
          <ul className="taglist">{postLinks}</ul>
          <p className="all-tags">
            <div className="posts">
              <Link to="/tags/">All Tag</Link>
            </div>
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
            mainv {
              childImageSharp {
                fluid {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`
