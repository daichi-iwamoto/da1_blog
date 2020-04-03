import React from 'react'
import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const data = useStaticQuery(graphql`
    query DaichiQuery {
      file(relativePath: { eq: "daichi.png" }) {
        childImageSharp {
          fluid {
            src
          }
        }
      }
    }
  `)

  return (
    <div className="da1-img">
      <img src={data.file.childImageSharp.fluid.src} alt="daichi" />
    </div>
  )
}
