import React from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <Header />
    <section id="tags">
      <Helmet title={`Blog Page`} />
      <div className="tag-box">
        <h1>Tags</h1>
        <ul className="taglist">
          {group.map(tag => (
            <li className="tag-link" key={tag.fieldValue}>
              <div className="hover-link">
                <p>Go!</p>
              </div>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                <p className="tagname">
                  {tag.fieldValue} <span>{tag.totalCount}</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
    <Footer />
  </Layout>
)

export default TagsPage

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
