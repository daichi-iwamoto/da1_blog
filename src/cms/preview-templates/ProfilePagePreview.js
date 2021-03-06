import React from 'react'
import PropTypes from 'prop-types'
import { ProfilePageTemplate } from '../../templates/profile-page'

const ProfilePagePreview = ({ entry, widgetFor }) => {
  let data = entry.getIn(['data']).toJS()

  return (
    <ProfilePageTemplate
      title={data.title}
      content={widgetFor('body')}
      skill={data.skill}
    />
  )
}

ProfilePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default ProfilePagePreview
