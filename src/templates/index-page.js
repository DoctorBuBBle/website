import React, { useRef } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import "./index-page.scss";
import LinuxTerminal from "../components/linux-terminal/LinuxTerminal";
import { gsap } from "gsap";

export const StartPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;
  const welcomeMsgRef = useRef();
  const moveInWelcomeMsg = () => {
    if (welcomeMsgRef.current) {
      const helloMsg = welcomeMsgRef.current.querySelector(".welcome-wrapper");
      const terminal = welcomeMsgRef.current.querySelector(".linux");
      
      gsap
        .timeline({ defaults: { duration: 1, ease: "power1.out" } })
        .to(terminal, {width: "50%" }, 0)
        .to(
          helloMsg,
          { x: (helloMsg.offsetWidth + 100) * -1 },
          0
        );
        
    }
  };

  return (
    <section ref={welcomeMsgRef} className="welcome-section">
      <LinuxTerminal onComplete={moveInWelcomeMsg} />
      <div className="welcome-wrapper">
        <div className="welcome-message white-block">
          <PageContent className="welcome-content" content={content} />
        </div>
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
