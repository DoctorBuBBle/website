import React, { useRef } from "react";
import Layout from "../components/Layout";
import "./index-page.scss";
import LinuxTerminal from "../components/linux-terminal/LinuxTerminal";
import { gsap } from "gsap";
import { Link } from "gatsby";

export const IndexPageTemplate = ({ welcome, about, skills, career }) => {
  return (
    <div className="index-page default-background">
      <WelcomeSection
        h1="Hello I’m Sebastian Paas"
        h2="A full-stack web developer from Germany."
        content="I am passionate about building beautiful web interfaces. With or without animations. But I don’t just play with JavaScript and CSS in the Browser, find out what else I already know on my skills page. Everything else I can learn on the fly."
      />
      <AboutSection
        title="About Me"
        image="/img/Paas Sebastian_pp.png"
        text="I am a 23 Years old Software developer how lover learning and programming. Besides programming I like painting minis and carring for my Aquarium and If there isn’t a global Pandemic I travel as much as I can."
      />
    </div>
  );
};

IndexPageTemplate.propTypes = {};

const IndexPage = () => {
  return (
    <Layout>
      <IndexPageTemplate />
    </Layout>
  );
};

IndexPage.propTypes = {};

export default IndexPage;
/*
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
*/
const AboutSection = ({ title, image, text }) => {
  return (
    <section className="about-section">
      <div>
        <h1>{title}</h1>
        <div className="about-content">
          <img
            className="about-me-image"
            src={
              !!image.childImageSharp ? image.childImageSharp.fluid.src : image
            }
            alt="Me"
          />
          <p className="about-me-text">{text}</p>
        </div>
      </div>
    </section>
  );
};

const WelcomeSection = ({ h1, h2, content }) => {
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
            <h1>{h1}</h1>
            <h2>{h2}</h2>
            <p>{content}</p>
            <Link className="primary-button" to="/contact">
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
