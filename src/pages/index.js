import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'gatsby'

const TestPage = () => (
  <Layout>
    <section id="index">
      <div className="page2">
        <Link to="/profile/" className="hover">
          <div className="text">P</div>
        </Link>
      </div>
      <div className="page3">
        <Link to="/contact/" className="hover">
          <div className="text">C</div>
        </Link>
      </div>
      <Link to="/blog/" className="page1">
        <div className="text">B</div>
      </Link>
    </section>
  </Layout>
)

export default TestPage