import React from 'react'
import PropTypes from 'prop-types'
import { IndexPageTemplate } from '../../templates/index-page'

const IndexPagePreview = ({ entry, widgetFor, getAsset }) => {
  let data = entry.getIn(['data']).toJS()
  data.skill.map((val) =>
    val.skillname.map((skills) => 
      skills.img.childImageSharp.fluid.src = getAsset(skills.img)
    )
  )

  return (
    <IndexPageTemplate
      title={data.title}
      content={widgetFor('body')}
      skill={data.skill}
    />
  )
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
  widgetFor: PropTypes.func,
}

export default IndexPagePreview
