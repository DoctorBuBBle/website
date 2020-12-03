import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const ImpressumPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;
  return (
    <section className="white-block">
      <article>
        <h1 className="section-title">{title}</h1>
        <PageContent content={content} />
      </article>
    </section>
  );
};

ImpressumPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const ImpressumPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ImpressumPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  );
};

ImpressumPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ImpressumPage;

export const impressumPageQuery = graphql`
  query ImpressumPageQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
