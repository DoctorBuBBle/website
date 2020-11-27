import React, { useEffect, useRef } from "react";
import { Link } from "gatsby";
import { gsap } from "gsap";
import "./button.scss";
import { cloneDeep } from "lodash";

const Button = ({ className, href, onClick, children }) => {
  const buttonRef = useRef();
  const classes = className + " button";
  const animation = useRef();
  
  useEffect(() => {
    const width = buttonRef.current.offsetWidth;
    const backgroundOverlay = buttonRef.current.querySelector(
      ".button-background-overlay"
    );
    const color = window
      .getComputedStyle(buttonRef.current)
      .getPropertyValue("background-color");

    animation.current = gsap
      .timeline({
        paused: true,
        defaults: { ease: "none", duration: 0.25 },
      })
      .to(backgroundOverlay, {
        width: width + 40,
        x: 20,
      })
      .to(
        buttonRef.current,
        {
          borderColor: color,
          color: color,
        },
        0
      );
  }, [animation]);

  const onMouseEnter = () =>
    animation.current ? animation.current.play() : undefined;
  const onMouseLeave = () =>
    animation.current ? animation.current.reverse() : undefined;

  return (
    <button
      ref={buttonRef}
      className={classes}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
