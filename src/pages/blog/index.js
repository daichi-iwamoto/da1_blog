import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BlogRoll from '../../components/BlogRoll'
import Mainv from '../../components/Mainv'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <Helmet title={`Blog`} />
        <Header />
        <section id="blog">
          <Mainv />
          <h1>
            Posts
          </h1>
          <section>
            <BlogRoll />
          </section>
        </section>
        <Footer />
      </Layout>
    )
  }
}
