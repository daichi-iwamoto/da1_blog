import React from 'react'
import PropTypes from 'prop-types'
import { BlogPostTemplate } from '../../templates/blog-post'

const BlogPostPreview = ({ entry, widgetFor, getAsset }) => (
  <BlogPostTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    mainv={getAsset(entry.getIn(['data', 'mainv']))}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
)

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
  widgetFor: PropTypes.func,
}

export default BlogPostPreview
