import React from "react";
import PropTypes from "prop-types";
import "./timeline.scss";

const Timeline = ({ data, getImageSrc, getText, getTimestamp }) => {
  const list = data.map((entry) => {
    const key = getTimestamp(entry);

    return (
      <>
        <li class="timeline-step" key={key}>
          <div className="timeline-part">
              <div className="timeline-part-point"></div>
              <div className="timeline-part-line"></div>
          </div>
          <div className="timeline-step">
            <div className="timeline-step-image">
              <div className="timeline-step-timestamp">{key}</div>
              <img src={getImageSrc(entry)} alt="Career step" />
            </div>
            <div className="timeline-step-text white-block">
              {getText(entry)}
            </div>
          </div>
        </li>
      </>
    );
  });

  return <ul className="timeline">{list}</ul>;
};

Timeline.propTypes = {
  data: PropTypes.array.isRequired,
  getImageSrc: PropTypes.func.isRequired,
  getText: PropTypes.func.isRequired,
  getTimestamp: PropTypes.func.isRequired,
};

export default Timeline;
