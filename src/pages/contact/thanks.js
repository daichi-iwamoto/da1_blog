import React from 'react'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      file(relativePath: { eq: "thank-you.png" }) {
        childImageSharp {
          fluid {
            src
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Header />
      <section id="thanks">
        <div className="contents">
          <img src={data.file.childImageSharp.fluid.src} alt="thanks" />
          <div className="bubble">
            <h1>Thank you for Submit !</h1>
          </div>
        </div>
      </section>
      <Footer />
    </Layout>
  )
}
