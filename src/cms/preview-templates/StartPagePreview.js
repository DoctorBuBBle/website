import React from 'react'
import PropTypes from 'prop-types'
import { StartPageTemplate } from '../../templates/start-page'

const StartPagePreview = ({ entry, widgetFor }) => (
  <StartPageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
)

StartPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default StartPagePreview
