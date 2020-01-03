import React from 'react'
import PropTypes from 'prop-types'
import { ProfilePageTemplate } from '../../templates/profile-page'

const ProfilePagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(['data']).toJS()

  return (
    <ProfilePageTemplate
      title={data.title}
      content={widgetFor('body')}
      skil={data.skil}
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
