import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div id="blog">
          <h1>
            記事一覧
          </h1>
          <section>
            <BlogRoll />
          </section>
        </div>
      </Layout>
    )
  }
}
