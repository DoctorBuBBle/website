import React, { useEffect, useRef, useState } from "react";
import { Link } from "gatsby";
import github from "../img/github-icon.svg";
import { gsap } from "gsap";
import "./navigation.scss";
import { GetInTouchButton } from "./Button";

const Navbar = () => {
  const navRef = useRef();
  const menuTimeline = useRef();
  const menuBurgerTimeline = useRef();
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    const navbarMenu = navRef.current.querySelector(".navbar-menu");

    navbarMenu.style.height = "auto";
    const originalHeight = navbarMenu.offsetHeight;
    navbarMenu.style.height = 0;

    const navbarItems = navbarMenu.querySelectorAll(
      ".navbar-item:not(.primary-button):not(.github-link)"
    );
    const buttons = navbarMenu.querySelectorAll(
      ".primary-button, .github-link"
    );

    menuTimeline.current = gsap
      .timeline({
        paused: true,
        defaults: { duration: 0.6, stagger: 0.2, ease: "back" },
      })
      .to(navbarMenu, {
        id: "navbarHeight",
        height: originalHeight,
      })
      .to(navbarItems, { opacity: 1, xPercent: 15 }, "-=0.3")
      .to(buttons, { opacity: 1, yPercent: 15 }, "-=0.25");

  }, [menuTimeline, menuBurgerTimeline]);

  const toggleHamburger = () => {
    if (menuTimeline.current) {
      if (menuTimeline.current.paused()) {
        menuTimeline.current.resume();
      } else if (menuTimeline.current.reversed()) {
        const navbarHeightTween = menuTimeline.current.getById("navbarHeight");
        navbarHeightTween.duration(navbarHeightTween.vars.duration);
        menuTimeline.current.timeScale(1).play();
      } else {
        // timeline.current.getById("navbarHeight").duration(0.3);
        menuTimeline.current.timeScale(3).reverse();
      }
    }

    setActive(!isActive);
  };

  return (
    <nav
      ref={navRef}
      className={`default-background navbar ${isActive ? 'is-active' : ''}`}
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
          <GetInTouchButton />
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
