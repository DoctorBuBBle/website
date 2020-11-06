import React from 'react'
import PropTypes from 'prop-types'
import { SkillsPageTemplate } from '../../templates/skills-page'

const SkillsPagePreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <SkillsPageTemplate {...data}/>
    )
  } else {
    return <div>Loading...</div>
  }
}

SkillsPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default SkillsPagePreview
