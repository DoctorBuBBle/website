import React from "react";
import PropTypes from "prop-types";
import { IndexPageTemplate } from "../../templates/index-page";

const IndexPagePreview = ({ entry, widgetsFor, widgetFor, getAsset }) => {
  const aboutSectionData = {
    title: entry.getIn(["data", "aboutSection", "title"]),
    image: getAsset(entry.getIn(["data", "aboutSection", "image"])),
    text: entry.getIn(["data", "aboutSection", "text"]),
  };

  const getSkills = (category) => {
    try {
      return entry.getIn(["data", "skillsSection", category]).toJS();
    } catch (e) {
      return [];
    }
  }

  const skillsSectionData = {
    title: entry.getIn(["data", "skillsSection", "title"]),
    toolsAndInfrastructure: getSkills("toolsAndInfrastructure"),
    languagesAndFrameworks: getSkills("languagesAndFrameworks"),
    databases: getSkills("databases"),
    others: getSkills("other")
  }

  const careerSectionData = widgetsFor("careerSection").map((careerStep) => {
    return {
      timespan: {
        from: careerStep.getIn(["data", "timespan", "from"]),
        to: careerStep.getIn(["data", "timespan", "to"]),
      },
      image: getAsset(careerStep.getIn(["data", "image"])),
      text: careerStep.getIn(["data", "text"]),
      /*
      attachment: {
        name: getAsset(careerStep.getIn(["data", "attachment", "name"])),
        file: getAsset(careerStep.getIn(["data", "attachment", "file"])),
      },
      */
    };
  });

  return (
    <IndexPageTemplate
      welcome={entry.getIn(["data", "welcomeSection"])}
      about={aboutSectionData}
      skills={skillsSectionData}
      career={careerSectionData}
    />
  );
};

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
  widgetsFor: PropTypes.func,
  getAsset: PropTypes.func,
};

export default IndexPagePreview;
