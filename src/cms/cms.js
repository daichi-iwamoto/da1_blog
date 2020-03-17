import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import ProfilePostPreview from './preview-templates/ProfilePagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('profile', ProfilePostPreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
