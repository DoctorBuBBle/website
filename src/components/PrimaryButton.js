import React, { useEffect, useRef } from "react";
import { Link } from "gatsby";
import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";

gsap.registerPlugin(CSSRulePlugin);

const PrimaryButton = ({ className, href, onClick, children }) => {
  const buttonRef = useRef();
  const classes = className + " primary-button";
  const animation = useRef();

  useEffect(() => {
    const width = buttonRef.current.offsetWidth;
    const duration = 0.8;
    const halfDur = duration / 2;

    animation.current = gsap
      .timeline({ paused: true, defaults: {ease: "none", duration: duration} })
      .to(buttonRef.current, {
        "--beforeWidth": width + "px",
        "--beforePosition": width + 40 + "px",
        backgroundColor: "#122A3B",
        duration: halfDur
      })
  }, [animation]);

  const onMouseEnter = () =>
    animation.current ? animation.current.play() : undefined;
  const onMouseLeave = () =>
    animation.current ? animation.current.reverse() : undefined;

  if (href) {
    return (
      <Link
        ref={buttonRef}
        className={classes}
        to={href}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        ref={buttonRef}
        className={classes}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </button>
    );
  }
};

export default PrimaryButton;

export const GetInTouchButton = ({ className }) => {
  return (
    <PrimaryButton className={className} href="/contact">
      Get in touch
    </PrimaryButton>
  );
};
