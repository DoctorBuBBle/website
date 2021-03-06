import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./navigation.scss";
import { Link } from "gatsby";
import menuLinks from "./MenuLinks";
import { GetInTouchButton } from "./Button";

const Navbar = () => {
  const navigationItems = menuLinks.reduce(
    (links, link) => {
      if (link.get("to") === "/contact") {
        links[0].push(<GetInTouchButton key={link.get("to")} />);
      }
      else if (link.get("isSocialLink") === true) {
        links[1].push(
          <a
            key={link.get("to")}
            href={link.get("to")}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.get("label")}
          </a>
        );
      } else {
        links[0].push(
          <Link key={link.get("to")} className="navbar-item" to={link.get("to")}>
            {link.get("label")}
          </Link>
        );
      }

      return links;
    },
    [[], []]
  ).map((links, index) => {
    if (index) {
      return <span className="navbar-item social-links">{links}</span>;
    } else {
      return links.flat();
    }
  });

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
      ".navbar-item:not(.primary-button):not(.social-links)"
    );
    const buttons = navbarMenu.querySelectorAll(
      ".primary-button, .social-links"
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
      className={`default-background navbar ${isActive ? "is-active" : ""}`}
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="navbar-control">
        <div className="navbar-brand">
          <h1>
            <Link to="/">Paas</Link>
          </h1>
          <div className="sub-title">
            <h2>Far better than a platform as a service</h2>
          </div>
          <div className="navbar-blog-link">
            <Link to="/blog">Blog</Link>
          </div>
        </div>
        {/* Hamburger menu */}
        <button
          className="navbar-burger"
          data-target="navMenu"
          onClick={toggleHamburger}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className="navbar-menu white-block">
        <div
          className="content"
          role="button"
          tabIndex="0"
          onClick={toggleHamburger}
          onKeyDown={toggleHamburger}
        >
          {navigationItems}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
