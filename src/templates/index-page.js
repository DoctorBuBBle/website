import React, { useRef } from "react";
import PropTypes from "prop-types";
import Layout from "../components/Layout";
import "./index-page.scss";
import LinuxTerminal from "../components/linux-terminal/LinuxTerminal";
import { gsap } from "gsap";
import { graphql } from "gatsby";
import moment from "moment";
import { MarkdownAsHTML } from "../components/Content";
import Button, { GetInTouchButton, PrimaryButton } from "../components/Button";
import Timeline from "../components/Timeline";
import { isEmpty } from "lodash";

export const IndexPageTemplate = ({ welcome, about, skills, career }) => {
  return (
    <div className="index-page default-background">
      <WelcomeSection content={welcome} />
      <AboutSection {...about} />
      <TechnologyRadarSection />
      <CareerSection careerSteps={career}></CareerSection>
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

IndexPage.propTypes = {
  data: PropTypes.shape({
    welcome: PropTypes.string,
    about: PropTypes.object,
    skills: PropTypes.array,
    career: PropTypes.array,
  }),
};

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

const TechnologyRadarSection = () => {
  return (
    <section className="technology-radar-section">
      <PrimaryButton className="marg10">
        <span>Hello World</span>
      </PrimaryButton>
      <GetInTouchButton className="marg10" />
      <Button className="marg10">Hello World</Button>
    </section>
  );
};

const formatCareerStepTimestamp = (timestamp) =>
  moment(timestamp).format("DD.MM.YYYY");

const CareerSection = ({ careerSteps }) => {
  const getText = (careerStep) => {
    let attachment;

    if (!isEmpty(careerStep.attachment)) {
      attachment = (
        <PrimaryButton newTab={true} href={careerStep.attachment.file.publicURL}>
          {careerStep.attachment.name}
        </PrimaryButton>
      );
    }

    return (
      <>
        <MarkdownAsHTML className="career-step-text" markdown={careerStep.text} />
        {attachment}
      </>
    );
  };

  const getTimespan = (careerStep) => {
    return (
      formatCareerStepTimestamp(careerStep.timespan.from) +
      ` - ` +
      formatCareerStepTimestamp(careerStep.timespan.to)
    );
  };

  const getImage = (careerStep) => getImageSrc(careerStep.image);

  return (
    <section className="career-section">
      <Timeline
        data={careerSteps}
        getText={getText}
        getTimestamp={getTimespan}
        getImageSrc={getImage}
      />
    </section>
  );
};

CareerSection.propTypes = {
  careerSteps: PropTypes.arrayOf(
    PropTypes.shape({
      timespan: PropTypes.shape({
        from: PropTypes.string,
        to: PropTypes.string,
      }),
      image: PropTypes.any,
      text: PropTypes.string,
      attachment: PropTypes.shape({
        name: PropTypes.string,
        file: PropTypes.object,
      }),
    })
  ),
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
          <img className="about-me-image" src={getImageSrc(image)} alt="Me" />
          <p className="about-me-text">{text.replace("[age]", getAge())}</p>
        </div>
      </div>
    </section>
  );
};

AboutSection.propTypes = {
  title: PropTypes.string,
  image: PropTypes.any,
  text: PropTypes.string,
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
          <img
            className="welcome-border"
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 351 804' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cstyle%3E .cls-1 %7B fill: %23fff; %7D %3C/style%3E%3C/defs%3E%3Cpolygon class='cls-1' points='351 804 0 804 330 0 351 0'/%3E%3C/svg%3E"
            alt=""
          />
          <div className="welcome-content">
            <MarkdownAsHTML markdown={content} />
            <GetInTouchButton />
          </div>
        </div>
      </div>
    </section>
  );
};

WelcomeSection.propTypes = {
  content: PropTypes.string.isRequired,
};

const getImageSrc = (image) =>
  !!image?.childImageSharp ? image.childImageSharp.fluid.src : image;
