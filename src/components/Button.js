import React, { useEffect, useRef } from "react";
import { Link } from "gatsby";
import { gsap } from "gsap";
import "./button.scss";
import { cloneDeep } from "lodash";

const Button = ({ className, href, onClick, children }) => {
  const classes = className + " button";

  return (
    <button
      className={classes}
      onClick={onClick}
    >
      <div className="button-background-overlay"></div>
      <div className="button-content">
        {href ? <Link to={href}>{children}</Link> : children}
      </div>
    </button>
  );
};

export default Button;

export const PrimaryButton = (props) => {
  const buttonProps = cloneDeep(props);
  buttonProps.className += " primary-button";

  return <Button {...buttonProps} />;
};

export const GetInTouchButton = ({ className }) => {
  return (
    <PrimaryButton className={className} href="/contact">
      Get in touch
    </PrimaryButton>
  );
};
