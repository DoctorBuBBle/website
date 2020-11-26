import React, { useRef } from "react";
import Layout from "../components/Layout";
import "./index-page.scss";
import LinuxTerminal from "../components/linux-terminal/LinuxTerminal";
import { gsap } from "gsap";
import { graphql, Link } from "gatsby";
import moment from "moment";
import { MarkdownAsHTML } from "../components/Content";

export const IndexPageTemplate = ({ welcome, about, skills, career }) => {
  debugger
  return (
    <div className="index-page default-background">
      <WelcomeSection content={welcome} />
      <AboutSection {...about} />
      <CareerSection {...career}></CareerSection>
    </div>
  );
};

IndexPageTemplate.propTypes = {};

const IndexPage = (data) => {
  const pageData = data?.data?.markdownRemark?.frontmatter;

  return (
    <Layout>
      <IndexPageTemplate
        welcome={pageData?.welcomeSection}
        about={pageData?.aboutSection}
        skills={pageData?.skills}
        career={pageData?.careerSection}
      />
    </Layout>
  );
};

IndexPage.propTypes = {};

export default IndexPage;

export const indexPageQuery = graphql`
  query IndexPageQuery {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        welcomeSection
        careerSection {
          attachment {
            name
            file {
              publicURL
            }
          }
          image {
            childImageSharp {
              fluid {
                src
              }
            }
          }
          text
          timespan {
            from
            to
          }
        }
        aboutSection {
          image {
            childImageSharp {
              fluid(quality: 100) {
                src
              }
            }
          }
          text
          title
        }
      }
    }
  }
`;

const CareerSection = ({ timestamp, image, text, attachment }) => {
  return <section className="career-section"></section>;
};

const getAge = () => {
  const now = moment();
  const birthday = moment("1997-04-17").startOf("day");
  const duration = moment.duration(now.diff(birthday));
  return Math.floor(duration.asYears());
};

const AboutSection = ({ title, image, text = "" }) => {
  return (
    <section className="about-section">
      <div>
        <h1>{title}</h1>
        <div className="about-content">
          <img
            className="about-me-image"
            src={
              !!image?.childImageSharp ? image.childImageSharp.fluid.src : image
            }
            alt="Me"
          />
          <p className="about-me-text">{text.replace("[age]", getAge())}</p>
        </div>
      </div>
    </section>
  );
};

const WelcomeSection = ({ content }) => {
  const welcomeMsgRef = useRef();
  const moveInWelcomeMsg = () => {
    if (welcomeMsgRef.current) {
      const helloMsg = welcomeMsgRef.current.querySelector(".welcome-wrapper");
      const terminal = welcomeMsgRef.current.querySelector(".linux");

      gsap
        .timeline({ defaults: { duration: 1, ease: "power1.out" } })
        .to(terminal, { width: "50%" }, 0)
        .to(helloMsg, { x: (helloMsg.offsetWidth + 100) * -1 }, 0);
    }
  };

  return (
    <section ref={welcomeMsgRef} className="welcome-section">
      <LinuxTerminal onComplete={moveInWelcomeMsg} />
      <div className="welcome-wrapper">
        <div className="welcome-message white-block">
          <div className="welcome-content">
            <MarkdownAsHTML markdown={content} />
            <Link className="primary-button" to="/contact">
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
