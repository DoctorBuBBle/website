import React from 'react'
import PropTypes from 'prop-types'
import { StartPageTemplate } from '../../templates/index-page'

const IndexPagePreview = ({ entry, widgetFor }) => (
  <StartPageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
)

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default IndexPagePreview
