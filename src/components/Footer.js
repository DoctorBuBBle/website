import React from "react";
import { pageLinks, externalLinks } from "./MenuLinks";
import "./footer.scss";
import { PrimaryButton } from "./Button";
import { gsap } from "gsap";

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer-back-top">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 400 400"
          >
            <polygon points="0 400 400 400 200 0" fill="#333333" />
          </svg>
          <PrimaryButton
            onClick={() => {
              gsap.to(document.documentElement, {
                scrollTop: 0,
                duration: 1,
                ease: "power1.out",
              });
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.9 21.7">
              <path
                key={0}
                fill="#fff"
                d="M.343 10.243l9.9-9.9 1.414 1.414-9.9 9.9z"
              />
              <path
                key={1}
                fill="#fff"
                d="M10.757.343l9.9 9.9-1.414 1.414-9.9-9.9z"
              />
              <path
                key={2}
                fill="#fff"
                d="M.343 20.243l9.9-9.9 1.414 1.414-9.9 9.9z"
              />
              <path
                key={3}
                fill="#fff"
                d="M10.757 10.343l9.9 9.9-1.414 1.414-9.9-9.9z"
              />
            </svg>
          </PrimaryButton>
        </div>
        <div className="footer-content-wrapper">
          <div className="footer-content">
            <div className="footer-navigation">
              {pageLinks.map((link) => (
                <PrimaryButton key={link.get("label")} href={link.get("to")}>
                  {link.get("label")}
                </PrimaryButton>
              ))}
            </div>
            <div className="footer-social">
              {externalLinks.map((link) => (
                <a key={link.get("to")} href={link.get("to")} className="icon">
                  {link.get("label")}
                </a>
              ))}
            </div>
            <div className="footer-copyright">© 2020 Sebastian Paas</div>
          </div>
        </div>
      </footer>
    );
  }
};

export default Footer;
