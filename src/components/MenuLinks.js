import React from "react";
import github from "../img/github-icon.svg";
import linkedIn from "../img/linked-in-icon.svg";
import { List, Map } from "immutable";

const LINK_TYPES = {
  pageLink: "pageLink",
  externalLink: "externalLink",
};
const links = List.of(
  Map({ to: "/blog", label: "Blog", type: LINK_TYPES.pageLink }),
  Map({ to: "/#about", label: "About", type: LINK_TYPES.pageLink }),
  Map({ to: "/#career", label: "My Career", type: LINK_TYPES.pageLink }),
  Map({
    to: "/#skills",
    label: "My Technology Radar",
    type: LINK_TYPES.pageLink,
  }),
  Map({
    to: "/impressum",
    label: "Impressum - Legal Notice",
    type: LINK_TYPES.pageLink,
  }),
  Map({ to: "/contact", label: "Get in touch", type: LINK_TYPES.pageLink }),
  Map({
    isSocialLink: true,
    to: "https://github.com/DoctorNova",
    label: <img src={github} alt="Github" />,
    type: LINK_TYPES.externalLink,
  }),
  Map({
    isSocialLink: true,
    to: "https://www.linkedin.com/in/sebastian-paas-b50541205/",
    label: <img src={linkedIn} alt="LinkedIn" />,
    type: LINK_TYPES.externalLink
  })
);

export default links;

export const pageLinks = links.filter(
  (link) => link.get("type") === LINK_TYPES.pageLink
);

export const externalLinks = links.filter(
  (link) => link.get("type") === LINK_TYPES.externalLink
);
