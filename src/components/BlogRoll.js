import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="blog-box">
        <h3>最新記事</h3>
        {posts &&
          posts.map(({ node: post }) => (
            <div className="posts">
              <div className="hover-box">Read</div>
              <Link className="blog-link" to={post.fields.slug}>
                <article>
                  <div className="post-data">
                    <p className="post-meta">
                        {post.frontmatter.title}
                    </p>
                    <p className="post-description">
                        {post.frontmatter.description}
                    </p>
                    <p className="post-date">
                      {post.frontmatter.date}
                    </p>
                  </div>
                </article>
              </Link>
            </div>
          ))
        }
      </div>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                description
                date(formatString: "YYYY/MM/DD")
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
