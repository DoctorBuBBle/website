import React from "react";
import PropTypes from "prop-types";
import { IndexPageTemplate } from "../../templates/index-page";

const IndexPagePreview = ({ entry, widgetsFor, widgetFor, getAsset }) => {
  const aboutSectionData = {
    title: entry.getIn(["data", "aboutSection", "title"]),
    image: getAsset(entry.getIn(["data", "aboutSection", "image"])),
    text: entry.getIn(["data","aboutSection","text"]),
  };

  const skillsSectionData = widgetsFor("skillsSection").map((skill) =>
    skill
      ? {
          name: skill.getIn(["data", "name"]),
          category: skill.getIn(["data", "category"]),
        }
      : undefined
  );

  const careerSectionData = widgetsFor("careerSection").map(careerStep => {
    if (!careerStep) {
      return undefined;
    }

    const thisCareerStep = careerStep.toJS();
    return thisCareerStep;
  });

  return (
    <IndexPageTemplate
      welcome={widgetFor("welcomeSection")}
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
