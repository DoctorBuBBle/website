import React from "react";
import { Link } from "gatsby";
import "./button.scss";
import { cloneDeep } from "lodash";

const Button = ({ className, href, onClick, children, newTab }) => {
  const classes = className + " button";

  return (
    <button className={classes} onClick={href ? undefined : onClick}>
      <div className="button-background-overlay"></div>
      <div className="button-content">
        {href ? (
          <Link className="button-label" to={href} target={newTab ? "_blank" : "_self"}>
            {children}
          </Link>
        ) : (
          <div className="button-label">{children}</div>
        )}
      </div>
    </button>
  );
};

Button.defaultProps = {
  className: "",
};

export default Button;

export const PrimaryButton = (props) => {
  const buttonProps = cloneDeep(props);
  buttonProps.className += " primary-button";

  return <Button {...buttonProps} />;
};
PrimaryButton.defaultProps = {
  className: "",
};

export const GetInTouchButton = ({ className }) => {
  return (
    <PrimaryButton className={className} href="/contact">
      Get in touch
    </PrimaryButton>
  );
};
