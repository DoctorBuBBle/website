import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import "./start-page.scss";

export const StartPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <section>
      <div className="linux linux-background">
        <div className="linux-terminal">
          <h1>I dont't just build console tools!</h1>
          <h1>I create amazing user experiences and much more</h1>
        </div>
      </div>
      <div className="welcome-message">
        <PageContent content={content} />
      </div>
    </section>
  );
};

StartPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const StartPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <StartPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  );
};

StartPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default StartPage;

export const startPageQuery = graphql`
  query StartPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
