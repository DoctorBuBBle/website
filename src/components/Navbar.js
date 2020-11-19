import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import github from "../img/github-icon.svg";
import { gsap } from "gsap";
import "./navigation.scss";

const Navbar = () => {
  const navRef = React.createRef();
  const [isActive, setActive] = useState(false);
  const navBarActiveClass = isActive ? "is-active" : "";

  const toggleHamburger = () => {
    // toggle the active boolean in the state
    setActive(!isActive);
  };

  useEffect(() => {
    const navbarItems = navRef.current.querySelectorAll(
      ".navbar-item:not(.primary-button):not(.github-link)"
    );
    const buttons = navRef.current.querySelectorAll(
      ".primary-button, .github-link"
    );
    const animationProps = {
      opacity: 1,
      stagger: 0.25,
      ease: "back",
      duration: 0.8,
    };

    if (isActive) {
      gsap
        .timeline()
        .set(navbarItems, { xPercent: -15, opacity: 0 })
        .set(buttons, { yPercent: 15, opacity: 0 })
        .to(navbarItems, {
          xPercent: 0,
          delay: 0.1,
          ...animationProps,
        })
        .to(buttons, { 
            yPercent: 0, 
            ...animationProps 
        });
    }

  }, [navRef, isActive]);

  return (
    <nav
      ref={navRef}
      className={`default-background navbar ${navBarActiveClass}`}
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="navbar-control">
        <div className="navbar-brand">
          <h1>Paas</h1>
          <h2>Way better than a platform as a service</h2>
        </div>
        {/* Hamburger menu */}
        <button
          className="navbar-burger"
          data-target="navMenu"
          onClick={toggleHamburger}
          onKeyDown={toggleHamburger}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className="navbar-menu white-block">
        <div className="content">
          <Link className="navbar-item" to="/blog">
            Blog
          </Link>
          <Link className="navbar-item" to="/#about">
            About
          </Link>
          <Link className="navbar-item" to="/#career">
            My Career
          </Link>
          <Link className="navbar-item" to="/#skills">
            My Technology Radar
          </Link>
          <Link className="navbar-item" to="/impressum">
            Impressum – Legal Notice
          </Link>
          <Link className="navbar-item primary-button" to="/contact">
            Get in touch
          </Link>
          <a
            className="navbar-item github-link"
            href="https://github.com/DoctorBuBBle"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="icon">
              <img src={github} alt="Github" />
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
