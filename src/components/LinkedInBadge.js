import React from "react";
import "./linkedInBadge.scss";
import linkedInBadge from "../img/linked-in-banner.svg";

export default function LinkedInBadge({ image }) {
  const imageSrc = getImageSrc(image);

  return (
    <div className="LI-badge">
      <div className="LI-header">
        <div className="LI-header-background"></div>
        <img src={imageSrc} alt="Profilbild" />
      </div>
      <div className="LI-name">
        <a
          className="LI-simple-link"
          href="https://de.linkedin.com/in/sebastian-paas-b50541205?trk=profile-badge"
        >
          Sebastian Paas
        </a>
        <br/>
        <span>Softwaredeveloper</span>
      </div>
      <div className="LI-body">
        <a
          className="LI-button-link"
          href="https://de.linkedin.com/in/sebastian-paas-b50541205?trk=profile-badge"
        >
          Show profile
        </a>
      </div>
      <div className="LI-logo">
        <img src={linkedInBadge} alt="LinkedIn" />
      </div>
    </div>
  );
}

const getImageSrc = (image) =>
  !!image?.childImageSharp ? image.childImageSharp.fluid.src : image;
