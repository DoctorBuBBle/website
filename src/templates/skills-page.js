import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content from '../components/Content'

export const SkillsPageTemplate = (data) => {
  return (
      <section className="section section--gradient">
          <div className="container">
            <div className="columns">
                <div className="column is-10 is-offset-1">
                    <div className="section">
                        <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                            {data.title}
                        </h2>
                        <Content className="content" content="Welcome to my skills page." />
                    </div>
                </div>
            </div>
        </div>
      </section>
  );
}

/*

SkillsPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

*/

const SkillsPage = ({ data }) => {
  return (
    <Layout>
      <SkillsPageTemplate {...data} />
    </Layout>
  )
}

SkillsPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default SkillsPage

export const skillsPageQuery = graphql`
  query SkillsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
