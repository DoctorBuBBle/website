import React from 'react'
import PropTypes from 'prop-types'
import remark from "remark";
import remarkHtml from "remark-html";

const toHTML = markdown => remark().use(remarkHtml).processSync(markdown).toString();

export const MarkdownAsHTML = ({ markdown }) => (
  <div dangerouslySetInnerHTML={{ __html: toHTML(markdown) }} />
)

export const HTMLContent = ({ content, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
)

const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
)

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
}

HTMLContent.propTypes = Content.propTypes

export default Content
