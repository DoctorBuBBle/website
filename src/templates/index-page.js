import React, { useRef, useState } from "react";
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
import TechnologyRadar from "../components/Technology";
import { OrderedMap } from "immutable";

export const IndexPageTemplate = ({ welcome, about, skills, career }) => {
  return (
    <div className="index-page default-background">
      <WelcomeSection content={welcome} />
      <AboutSection {...about} />
      <TechnologyRadarSection {...skills} />
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
        skills={pageData?.skillsSection}
        career={pageData?.careerSection}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.object
};

export default IndexPage;

export const indexPageQuery = graphql`
query IndexPageQuery {
  markdownRemark(frontmatter: {templateKey: {eq: "index-page"}}) {
    frontmatter {
      welcomeSection
      careerSection {
        attachment {
          name
          file {
            base
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
      skillsSection {
        databases {
          level
          name
        }
        languagesAndFrameworks {
          level
          name
        }
        title
        toolsAndInfrastructure {
          level
          name
        }
      }
    }
  }
}
`;

const TechnologyRadarWaves = [
  "I know all the ins and outs",
  "I am confident",
  "I am on my way to beeing confident",
  "I know the fundametals",
  "I want to learn",
]

const TechnologyRadarSection = ({
  toolsAndInfrastructure = [],
  languagesAndFrameworks = [],
  databases = [],
  title = "My Technology Radar",
}) => {
  const sectionRef = useRef();
  const techIndexNameMapping = [];
  const onSignalClick = () => alert("You clicked on a signal");
  const onSignalMouseEnter = (event) => {
    const techNumber = event.currentTarget.getAttribute("data-label");
    sectionRef.current
      .querySelector(`g[data-label="${techNumber}"]`)
      .classList.add("focus");
    sectionRef.current
      .querySelector(`li button[data-label="${techNumber}"]`)
      .classList.add("focus");
  };
  const onSignalMouseLeave = (event) => {
    const techNumber = event.currentTarget.getAttribute("data-label");
    sectionRef.current
      .querySelector(`g[data-label="${techNumber}"]`)
      .classList.remove("focus");
    sectionRef.current
      .querySelector(`li button[data-label="${techNumber}"]`)
      .classList.remove("focus");
  };
  const [selected, setSelected] = useState({
    nc: "LF",
    data: languagesAndFrameworks,
  });
  const selectLF = () => setSelected({ nc: "LF", data: languagesAndFrameworks });
  const selectDB = () => setSelected({ nc: "DB", data: databases });
  const selectTI = () => setSelected({ nc: "TI", data: toolsAndInfrastructure });
  const getSelectedClass = (nc) =>
    selected.nc === nc ? "selected" : undefined;
  const techsByLevel = selected.data
    // Sort by level
    .sort((a, b) => {
      const indexOfA = TechnologyRadarWaves.indexOf(a.level);
      const indexOfB = TechnologyRadarWaves.indexOf(b.level);
      const result = indexOfA - indexOfB;

      if (result === 0) {
        return a.name.localeCompare(b.name);
      } else {
        return result;
      }
    })
    // Replace the technology name with the index
    .map((tech, index) => {
      techIndexNameMapping[index] = tech.name;
      return { label: index + 1, wave: tech.level, title: tech.name };
    });

  const techTable = techsByLevel
    .reduce((radarWaves, tech) => {
      const techs = radarWaves.get(tech.wave) || [];
      return radarWaves.set(tech.wave, techs.concat(tech));
    }, OrderedMap())
    .reduce((list, techs, radarWaveName) => {
      return list.concat([
        <div key={radarWaveName} className="technology-radar-level">
          <h2>{radarWaveName}</h2>
          <ul className="technologies-level">
            {techs.map((tech) => (
              <li>
                <button
                  data-label={tech.label}
                  key={tech.label}
                  onMouseEnter={onSignalMouseEnter}
                  onMouseLeave={onSignalMouseLeave}
                >
                  <span className="technology-index">{tech.label}. </span>
                  {tech.title}
                </button>
              </li>
            ))}
          </ul>
        </div>,
      ]);
    }, []);

  return (
    <section ref={sectionRef} className="white-block" id="skills">
      <article className="technology-radar-section">
        <h1 className="section-title">{title}</h1>
        <div className="technology-radar-control">
          <Button className={getSelectedClass("TI")} onClick={selectTI}>
            Tools &amp; Infrastructure
          </Button>
          <Button className={getSelectedClass("LF")} onClick={selectLF}>
            Languages &amp; Frameworks
          </Button>
          <Button className={getSelectedClass("DB")} onClick={selectDB}>
            Databases
          </Button>
        </div>
        <div className="technology-radar-content">
          <div className="technology-radar-list">{techTable}</div>
          <TechnologyRadar
            waves={TechnologyRadarWaves}
            technologies={techsByLevel}
            onSignalMouseEnter={onSignalMouseEnter}
            onSignalMouseLeave={onSignalMouseLeave}
          />
        </div>
      </article>
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
        <PrimaryButton
          newTab={true}
          href={"/img/" + careerStep.attachment.file.base}
        >
          {careerStep.attachment.name}
        </PrimaryButton>
      );
    }

    return (
      <>
        <MarkdownAsHTML
          className="career-step-text"
          markdown={careerStep.text}
        />
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
    <section className="career-section" id="career">
      <article>
        <h1 className="section-title">{"My Career"}</h1>
        <Timeline
          data={careerSteps}
          getText={getText}
          getTimestamp={getTimespan}
          getImageSrc={getImage}
        />
      </article>
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
    <section className="about-section" id="about">
      <div>
        <h1>{title}</h1>
        <div className="about-content">
          <img className="about-me-image" src={getImageSrc(image)} alt="Me" />
          <MarkdownAsHTML
            className="about-me-text"
            markdown={text.replaceAll("[age]", getAge())}
          ></MarkdownAsHTML>
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
    <section className="welcome-section" ref={welcomeMsgRef}>
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
