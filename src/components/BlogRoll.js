import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

// 指定のタグの記事のみ呼び出す
function Tags(props) {
  // 記事情報HTML格納変数
  let posts = []

  // 該当記事取得
  props.data.map(( post ) => (
    (post.node.frontmatter.tags.includes(props.tag)) ?
      posts.push(
        <Link className="blog-link" to={post.node.fields.slug}>
          <article>
            <div className="post-data">
              <div className="post-head">
                <img src={post.node.frontmatter.mainv.childImageSharp.fluid.src} alt="post-img" className="post-img" />
                <p className="post-meta">
                    {post.node.frontmatter.title}
                </p>
                <p className="post-date">
                  {post.node.frontmatter.date}
                </p>
              </div>
              <p className="post-description">
                  {post.node.frontmatter.description}
              </p>
            </div>
          </article>
        </Link>
      )
      :
      ""
  ))

  // 返り値
  return (
    <section>
      <h3>{props.tag}</h3>
      <div className="posts">
        {posts}
      </div>
    </section>
  ) 
}

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="blog-box">
        <section>
          <h3>New</h3>
          <div className="posts">
          {posts &&
            posts.map(({ node: post }) => (
                <Link className="blog-link" to={post.fields.slug}>
                  <article>
                    <div className="post-data">
                      <div className="post-head">
                        <img src={post.frontmatter.mainv.childImageSharp.fluid.src} alt="post-img" className="post-img" />
                        <p className="post-meta">
                            {post.frontmatter.title}
                        </p>
                        <p className="post-date">
                          {post.frontmatter.date}
                        </p>
                      </div>
                      <div className="post-description">
                          <p>{post.frontmatter.description}</p>
                      </div>
                    </div>
                  </article>
                </Link>
            ))
          }
          </div>
        </section>
        {/* tagごとに取得 */}
        {/* <Tags data={posts} tag={"test"} />
        <Tags data={posts} tag={"code"} /> */}
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
                mainv {
                  childImageSharp {
                    fluid {
                      src
                    }
                  }
                }
                tags
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
