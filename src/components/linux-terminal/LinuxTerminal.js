import React, { useEffect, useRef, useState } from "react";
import "./LinuxTerminal.scss";
import PropTypes from "prop-types";
import { gsap } from "gsap";

const linuxTerminalRows = ["./start-website.sh", " "].map((command) =>
  command.split("")
);

const LinuxTerminal = ({ onComplete }) => {
  const terminalRef = useRef();
  const [animate, setAnimate] = useState(false);
  const [typingProgress, setTypingProgress] = useState({
    index: 0,
    text: [],
  });

  useEffect(() => {
    if (animate && terminalRef.current) {
      const rectangles = terminalRef.current.querySelectorAll(
        ".LinuxTerminalSVG-white-rect rect"
      );

      gsap
        .timeline({ defaults: { duration: 0.3, ease: "none" } })
        .to(rectangles[3], { attr: { height: 248.35 }, delay: 0.25 })
        .to(rectangles[2], { attr: { width: 246.34 } })
        .to(rectangles[1], { attr: { height: 260.67 } })
        .to(rectangles[0], { attr: { width: 270.88 } })
        .to(rectangles[4], {
          attr: { height: 275.41 },
          onComplete: onComplete,
        });
    }
  });

  useEffect(() => {
    if (typingProgress.index >= linuxTerminalRows.length) {
      return;
    }

    const intervalId = setInterval(() => {
      if (typingProgress.index >= linuxTerminalRows.length) {
        return;
      }

      setTypingProgress((progress) => {
        const letter = (linuxTerminalRows[progress.index] || []).shift();
        let updatedText = [...progress.text];
        let updatedIndex = progress.index;

        if (letter) {
          updatedText[progress.index] =
            (updatedText[progress.index] || "") + letter;
        } else {
          updatedIndex++;
          if (updatedIndex === linuxTerminalRows.length) {
            clearInterval(intervalId);
            setAnimate(true);
          }
        }

        return {
          index: updatedIndex,
          text: updatedText,
        };
      });
    }, 70);

    return () => clearInterval(intervalId);
  }, [typingProgress, animate]);

  return (
    <div className="linux">
      <div ref={terminalRef} className="linux-terminal">
        <LinuxTerminalSVG rows={typingProgress.text} />
      </div>
    </div>
  );
};

export default LinuxTerminal;

LinuxTerminal.propTypes = {
  rows: PropTypes.array.isRequired,
};

LinuxTerminal.defaultProps = {
  rows: [],
};

function LinuxTerminalSVG({ rows }) {
  const [host, setHost] = useState('localhost');
  const user = `guest@${host}`;

  /*
  useEffect(() => {
    setHost(window.location.hostname);
  }, [host]);
  */

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 295.11">
      <defs>
        <style>
          {`.LinuxTerminalSVG__cls-1{fill:#300a24}.LinuxTerminalSVG__cls-3,.LinuxTerminalSVG__cls-7{fill:#fff}.LinuxTerminalSVG__cls-5{fill:none}.LinuxTerminalSVG__cls-5,.LinuxTerminalSVG__cls-7{stroke:#fff;stroke-miterlimit:10;stroke-width:1px}.LinuxTerminalSVG__cls-6{fill:#484848}
            .LinuxTerminalSVG__title{font: .45rem Monospace; fill: white}.LinuxTerminalSVG__host{font: .45rem Monospace; fill: #4E9608;}.LinuxTerminalSVG__command{font: .45rem Monospace; fill: white;}
            .LinuxTerminalSVG__cursor{
                font: bolder .45rem Monospace; 
                fill: white;
            }
            `}
        </style>
      </defs>
      <title>{"Linux Terminal"}</title>
      <g>
        <g>
          <path
            className="LinuxTerminalSVG__cls-1"
            d="M0 14h380v264.61a16.5 16.5 0 01-16.5 16.5h-347A16.5 16.5 0 010 278.61V14z"
          />
          <text x="3" y="30">
            {rows.map((row, index) => (
              <tspan key={index}>
                <tspan
                  x="3"
                  y={index * 10 + 30}
                  className="LinuxTerminalSVG__host"
                >
                  {user}
                </tspan>
                <tspan
                  y={index * 10 + 30}
                  className="LinuxTerminalSVG__command"
                >
                  :~$ {row}
                </tspan>
                {index === rows.length - 1 ? (
                  <tspan dy="-1" className="LinuxTerminalSVG__cursor">
                    |
                    <animate
                      attributeName="fill-opacity"
                      values="0;1;0"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </tspan>
                ) : undefined}
              </tspan>
            ))}
          </text>
          <path
            d="M9.57 0h360.86A9.57 9.57 0 01380 9.57V19H0V9.57A9.57 9.57 0 019.57 0z"
            fill="#2c2c2c"
          />
          <text
            className="LinuxTerminalSVG__title"
            x="50%"
            y="10"
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {user}
          </text>
          <rect
            className="LinuxTerminalSVG__cls-3"
            x={341.26}
            y={9.06}
            width={6.41}
            height={0.84}
            rx={0.42}
            ry={0.42}
          />
          <ellipse cx={369.94} cy={9.48} rx={5.49} ry={5.54} fill="#cc5e2e" />
          <path
            className="LinuxTerminalSVG__cls-3"
            d="M372.85 7.09l-5.28 5.32a.38.38 0 01-.54 0 .38.38 0 010-.54l5.28-5.33a.38.38 0 01.54 0 .39.39 0 010 .55z"
          />
          <path
            className="LinuxTerminalSVG__cls-3"
            d="M367.57 6.54l5.28 5.33a.38.38 0 010 .54.38.38 0 01-.54 0L367 7.09a.39.39 0 010-.55.38.38 0 01.57 0z"
          />
          <path
            className="LinuxTerminalSVG__cls-5"
            d="M352.7 7.14h4.63v4.67h-4.63z"
          />
          <rect
            className="LinuxTerminalSVG__cls-6"
            x={324.4}
            y={2.96}
            width={12.18}
            height={13.04}
            rx={3}
            ry={3}
          />
          <path
            className="LinuxTerminalSVG__cls-7"
            d="M328.43 7.5h4.35M328.43 9.5h4.35M328.43 11.5h4.35"
          />
          <g>
            <rect
              className="LinuxTerminalSVG__cls-6"
              x={311.22}
              y={2.9}
              width={12.29}
              height={13.15}
              rx={3}
              ry={3}
            />
            <circle
              className="LinuxTerminalSVG__cls-5"
              cx={316.93}
              cy={8.93}
              r={2.74}
            />
            <path
              className="LinuxTerminalSVG__cls-5"
              d="M318.76 11.12l1.46 1.46"
            />
          </g>
          <g className="LinuxTerminalSVG-white-rect">
            <rect
              className="LinuxTerminalSVG__cls-3"
              x="48.16"
              y="174.37"
              width="0"
              height="47.3"
              transform="rotate(173.71 183.3 198)"
            />
            <rect
              className="LinuxTerminalSVG__cls-3"
              x="170.05"
              y="40.68"
              width="47.3"
              height="0"
              transform="translate(5.32 347.97) rotate(-84.65)"
            />
            <rect
              className="LinuxTerminalSVG__cls-3"
              x="57.5"
              y="119.5"
              width="0"
              height="47.3"
              transform="rotate(172.82 180.5 143.4)"
            />
            <rect
              className="LinuxTerminalSVG__cls-3"
              x="160.93"
              y="-7.82"
              width="47.3"
              height="0"
              transform="translate(51.52 289.28) rotate(-84.65)"
            />
            <rect
              className="LinuxTerminalSVG__cls-3"
              x="167.35"
              y="87.83"
              width="47.3"
              height="0"
              transform="translate(-51.36 394.68) rotate(-84.65)"
            />
          </g>
          <g>
            <path
              className="LinuxTerminalSVG__cls-1"
              d="M117.8 112.6h2.74v15.77h-2.74zM126.41 122.37c0-3.93 1.88-6.3 3.82-6.3a2.75 2.75 0 012.26 1.25l-.1-1.82v-4.09h2.73v17h-2.22l-.2-1.19h-.07a3.36 3.36 0 01-2.45 1.48c-2.29-.04-3.77-2.41-3.77-6.33zm6 2.3v-4.93a2 2 0 00-1.52-.76c-.89 0-1.66 1.07-1.66 3.35s.62 3.42 1.68 3.42c.56 0 1.03-.29 1.48-1.08zM137 122.37c0-4 2.16-6.3 4.49-6.3s4.49 2.31 4.49 6.3-2.16 6.29-4.49 6.29-4.49-2.31-4.49-6.29zm6.18 0c0-2.08-.56-3.43-1.69-3.43s-1.69 1.35-1.69 3.43.56 3.42 1.69 3.42 1.68-1.34 1.68-3.42zM147.83 116.36h2.23l.2 1.52h.07a3.91 3.91 0 013-1.81c2 0 2.85 1.84 2.85 4.84v7.46h-2.72v-7c0-1.73-.36-2.27-1.15-2.27s-1.1.42-1.71 1.17v8.1h-2.73zM158.2 118.29a3.34 3.34 0 001.68-3.08l-.07-2.09.9 1.62a1.47 1.47 0 01-1 .52c-.78 0-1.42-.68-1.42-1.77s.59-2 1.42-2c1.14 0 1.75 1.16 1.75 3.16a5.75 5.75 0 01-2.64 5.17zM164 124v-4.85h-1.26v-2.65l1.41-.14.32-3.19h2.26v3.19H169v2.79h-2.2V124c0 1.36.47 1.91 1.19 1.91a2.24 2.24 0 00.87-.23l.43 2.58a5.12 5.12 0 01-2 .44c-2.35-.04-3.29-1.92-3.29-4.7zM172.33 132.78l.49-2.62a1.87 1.87 0 00.72.16c.73 0 1-.59 1-1.93v-12h2.73v11.92c0 2.63-.78 4.83-3.29 4.83a3.46 3.46 0 01-1.65-.36zm2-20a1.6 1.6 0 113.16 0 1.6 1.6 0 11-3.16 0zM179.56 123.82v-7.46h2.73v7c0 1.73.36 2.27 1.15 2.27s1.1-.38 1.64-1.32v-8h2.73v12h-2.23l-.2-1.67h-.07a3.43 3.43 0 01-2.89 2c-2 .02-2.86-1.82-2.86-4.82zM189.4 127l1.22-2.21A3.57 3.57 0 00193 126c.81 0 1.16-.41 1.16-1 0-.79-.91-1.15-1.86-1.63a3.84 3.84 0 01-2.43-3.53 3.44 3.44 0 013.51-3.76 4.56 4.56 0 013.25 1.52l-1.22 2.14a3.06 3.06 0 00-1.94-1c-.71 0-1.05.36-1.05 1 0 .77.86 1.06 1.82 1.51a3.73 3.73 0 012.48 3.62 3.59 3.59 0 01-3.79 3.87 5.21 5.21 0 01-3.53-1.74zM198.43 124v-4.85h-1.26v-2.65l1.41-.14.32-3.19h2.26v3.19h2.21v2.79h-2.21V124c0 1.36.48 1.91 1.19 1.91a2.24 2.24 0 00.88-.23l.43 2.58a5.17 5.17 0 01-2 .44c-2.32-.04-3.23-1.92-3.23-4.7zM211.32 127.09h-.07l-.23 1.28h-2.13v-17h2.73v4.15l-.07 1.84a3.35 3.35 0 012.44-1.33c2.23 0 3.61 2.4 3.61 6.08 0 4.15-1.88 6.51-3.88 6.51a3.14 3.14 0 01-2.4-1.53zm3.48-4.87c0-2.16-.51-3.24-1.6-3.24-.56 0-1 .33-1.58 1.08V125a1.92 1.92 0 001.46.76c.92-.01 1.72-1.06 1.72-3.54zM219.43 123.82v-7.46h2.73v7c0 1.73.36 2.27 1.15 2.27s1.1-.38 1.63-1.32v-8h2.73v12h-2.22l-.2-1.67h-.07a3.43 3.43 0 01-2.89 2c-2 .02-2.86-1.82-2.86-4.82zM229.87 112.75a1.6 1.6 0 113.16 0 1.6 1.6 0 11-3.16 0zm.21 3.61h2.73v12h-2.73zM235.21 124.64v-13.23h2.73v13.37c0 .77.27 1 .49 1a.93.93 0 00.34-.05l.32 2.62a2.78 2.78 0 01-1.37.3c-1.87.01-2.51-1.58-2.51-4.01zM240.05 122.37c0-3.93 1.88-6.3 3.82-6.3a2.75 2.75 0 012.26 1.25l-.1-1.82v-4.09h2.73v17h-2.23l-.19-1.19h-.07a3.36 3.36 0 01-2.45 1.48c-2.29-.04-3.77-2.41-3.77-6.33zm6 2.3v-4.93a2 2 0 00-1.52-.76c-.89 0-1.66 1.07-1.66 3.35s.62 3.42 1.68 3.42c.56 0 1.03-.29 1.45-1.08zM129.08 151.4c0-4 2.26-6.29 4.8-6.29a3.52 3.52 0 012.7 1.29l-1.29 2.29A1.67 1.67 0 00134 148c-1.32 0-2.16 1.34-2.16 3.42s.88 3.42 2.07 3.42a2.49 2.49 0 001.66-.88l1.07 2.32a4 4 0 01-3 1.43c-2.57-.02-4.56-2.32-4.56-6.31zM137.25 151.4c0-4 2.15-6.29 4.48-6.29s4.49 2.3 4.49 6.29-2.16 6.29-4.49 6.29-4.48-2.3-4.48-6.29zm6.17 0c0-2.08-.56-3.42-1.69-3.42s-1.73 1.34-1.73 3.42.56 3.42 1.69 3.42 1.73-1.34 1.73-3.42zM148.09 145.4h2.23l.19 1.52h.07a3.92 3.92 0 013-1.81c2 0 2.86 1.84 2.86 4.84v7.45h-2.73v-7c0-1.72-.36-2.26-1.15-2.26s-1.1.41-1.7 1.16v8.1h-2.73zM157.9 156l1.23-2.22a3.53 3.53 0 002.37 1.26c.82 0 1.17-.4 1.17-1 0-.79-.92-1.15-1.86-1.64a3.83 3.83 0 01-2.44-3.53 3.44 3.44 0 013.52-3.75 4.6 4.6 0 013.25 1.52l-1.23 2.13a3 3 0 00-1.94-1c-.7 0-1.05.36-1.05 1 0 .76.86 1.05 1.82 1.51a3.69 3.69 0 012.48 3.61 3.59 3.59 0 01-3.78 3.87 5.2 5.2 0 01-3.54-1.76zM166.4 151.4c0-4 2.16-6.29 4.49-6.29s4.49 2.3 4.49 6.29-2.16 6.29-4.49 6.29-4.49-2.3-4.49-6.29zm6.18 0c0-2.08-.56-3.42-1.69-3.42s-1.69 1.34-1.69 3.42.56 3.42 1.69 3.42 1.69-1.34 1.69-3.42zM177.1 153.67v-13.22h2.73v13.37c0 .76.27 1 .49 1a.93.93 0 00.34 0l.32 2.63a2.91 2.91 0 01-1.37.29c-1.87-.05-2.51-1.64-2.51-4.07zM181.88 151.4c0-3.89 2.13-6.29 4.34-6.29 2.63 0 3.93 2.48 3.93 5.76a10.52 10.52 0 01-.12 1.57h-5.51c.25 1.74 1.16 2.54 2.39 2.54a3.28 3.28 0 002-.78l.9 2.14a5.08 5.08 0 01-3.26 1.35c-2.64 0-4.67-2.31-4.67-6.29zm5.93-1.31c0-1.32-.44-2.27-1.53-2.27-.86 0-1.6.75-1.79 2.27zM196.11 153v-4.85h-1.26v-2.66l1.41-.13.32-3.19h2.26v3.19H201v2.79h-2.2V153c0 1.37.47 1.91 1.19 1.91a2.17 2.17 0 00.88-.23l.43 2.59a5.23 5.23 0 01-2.05.43c-2.25-.01-3.14-1.88-3.14-4.7zM202 151.4c0-4 2.15-6.29 4.48-6.29s4.49 2.3 4.49 6.29-2.15 6.29-4.49 6.29-4.48-2.3-4.48-6.29zm6.17 0c0-2.08-.56-3.42-1.69-3.42s-1.69 1.34-1.69 3.42.56 3.42 1.69 3.42 1.67-1.34 1.67-3.42zM212.29 151.4c0-4 2.15-6.29 4.48-6.29s4.49 2.3 4.49 6.29-2.16 6.29-4.49 6.29-4.48-2.3-4.48-6.29zm6.17 0c0-2.08-.56-3.42-1.69-3.42s-1.69 1.34-1.69 3.42.56 3.42 1.69 3.42 1.69-1.34 1.69-3.42zM223 153.67v-13.22h2.73v13.37c0 .76.27 1 .49 1a.93.93 0 00.34 0l.32 2.63a2.91 2.91 0 01-1.37.29c-1.89-.05-2.51-1.64-2.51-4.07zM227.48 156l1.23-2.22a3.53 3.53 0 002.37 1.26c.81 0 1.17-.4 1.17-1 0-.79-.92-1.15-1.87-1.64a3.84 3.84 0 01-2.43-3.53 3.44 3.44 0 013.52-3.75 4.56 4.56 0 013.24 1.52l-1.22 2.13a3 3 0 00-1.94-1c-.7 0-1.05.36-1.05 1 0 .76.86 1.05 1.82 1.51a3.71 3.71 0 012.48 3.61 3.59 3.59 0 01-3.79 3.87 5.2 5.2 0 01-3.53-1.76zM236.83 155.46c0-1.27.7-2.25 1.64-2.25s1.65 1 1.65 2.25-.7 2.23-1.65 2.23-1.64-.97-1.64-2.23zm.37-11.06l-.09-3.21h2.73l-.09 3.21-.38 7.4h-1.79z"
            />
          </g>
          <g>
            <path
              className="LinuxTerminalSVG__cls-1"
              d="M101.16 182h2.74v15.77h-2.74zM109.71 191.78c0-4 2.25-6.3 4.8-6.3a3.55 3.55 0 012.69 1.29l-1.29 2.29a1.67 1.67 0 00-1.25-.71c-1.31 0-2.15 1.35-2.15 3.43s.87 3.42 2.06 3.42a2.44 2.44 0 001.66-.89l1.07 2.33a4 4 0 01-3 1.43c-2.61 0-4.59-2.31-4.59-6.29zM118.92 185.77h2.23l.2 2.1h.07c.67-1.6 1.67-2.39 2.61-2.39a2.06 2.06 0 011.1.24l-.45 3.07a3.12 3.12 0 00-1-.19c-.69 0-1.53.58-2 2.22v7h-2.73zM125.6 191.78c0-3.9 2.13-6.3 4.35-6.3 2.62 0 3.92 2.49 3.92 5.76a11 11 0 01-.11 1.58h-5.51c.24 1.74 1.16 2.54 2.38 2.54a3.26 3.26 0 002-.79l.9 2.15a5.1 5.1 0 01-3.27 1.35c-2.63 0-4.66-2.32-4.66-6.29zm5.94-1.32c0-1.32-.44-2.27-1.53-2.27-.87 0-1.61.76-1.8 2.27zM135.12 194.45c0-2.53 1.55-3.9 5.19-4.4-.06-1.05-.46-1.74-1.46-1.74a4.39 4.39 0 00-2.44 1.09l-1-2.34a6.39 6.39 0 013.94-1.58c2.35 0 3.66 1.76 3.66 5.43v6.87h-2.23l-.2-1.23h-.06a3.68 3.68 0 01-2.68 1.52c-1.65 0-2.72-1.6-2.72-3.62zm5.19-.16v-2.1c-1.94.34-2.58 1.07-2.58 2s.41 1.16 1.06 1.16 1.03-.43 1.52-1.06zM145.37 193.41v-4.85h-1.26v-2.65l1.41-.14.32-3.19h2.26v3.19h2.21v2.79h-2.21v4.81c0 1.36.47 1.91 1.19 1.91a2.24 2.24 0 00.88-.23l.43 2.58a5.17 5.17 0 01-2 .44c-2.32 0-3.23-1.87-3.23-4.66zM151.24 191.78c0-3.9 2.13-6.3 4.34-6.3 2.63 0 3.93 2.49 3.93 5.76a11 11 0 01-.11 1.58h-5.52c.25 1.74 1.16 2.54 2.39 2.54a3.26 3.26 0 002-.79l.9 2.15a5.12 5.12 0 01-3.27 1.35c-2.63 0-4.66-2.32-4.66-6.29zm5.94-1.32c0-1.32-.44-2.27-1.53-2.27-.87 0-1.61.76-1.8 2.27zM164.68 194.45c0-2.53 1.54-3.9 5.19-4.4-.06-1.05-.46-1.74-1.46-1.74a4.36 4.36 0 00-2.41 1.09l-1-2.34a6.39 6.39 0 013.94-1.58c2.35 0 3.65 1.76 3.65 5.43v6.87h-2.22l-.2-1.23h-.07a3.65 3.65 0 01-2.68 1.52c-1.68 0-2.74-1.6-2.74-3.62zm5.19-.16v-2.1c-2 .34-2.58 1.07-2.58 2s.41 1.16 1.06 1.16 1.03-.43 1.52-1.06zM174.89 185.77h2.23l.2 1.54h.06c.76-1 1.58-1.83 2.79-1.83a2.59 2.59 0 012.55 2c.81-1.1 1.67-2 2.89-2 2 0 2.88 1.84 2.88 4.84v7.46h-2.73v-7c0-1.73-.36-2.27-1.13-2.27-.47 0-1 .38-1.57 1.17v8.1h-2.73v-7c0-1.73-.37-2.27-1.14-2.27-.46 0-1 .38-1.57 1.17v8.1h-2.73zM190.39 194.45c0-2.53 1.54-3.9 5.18-4.4 0-1.05-.45-1.74-1.45-1.74a4.33 4.33 0 00-2.44 1.09l-1-2.34a6.39 6.39 0 013.93-1.58c2.36 0 3.66 1.76 3.66 5.43v6.87h-2.22l-.2-1.23h-.07a3.65 3.65 0 01-2.68 1.52c-1.65 0-2.71-1.6-2.71-3.62zm5.18-.16v-2.1c-1.94.34-2.57 1.07-2.57 2s.41 1.16 1.06 1.16 1.03-.43 1.51-1.06zM200.1 195.88l3.86-7.32h-3.42v-2.79h6.83v1.9L203.5 195h4v2.79h-7.4zM208.94 182.16a1.6 1.6 0 111.58 1.86 1.67 1.67 0 01-1.58-1.86zm.21 3.61h2.73v12h-2.73zM214.28 185.77h2.23l.2 1.52h.06a3.94 3.94 0 013-1.81c2 0 2.86 1.84 2.86 4.84v7.46h-2.73v-7c0-1.73-.36-2.27-1.14-2.27s-1.11.42-1.71 1.17v8.1h-2.73zM224.34 199.84a2.89 2.89 0 011.31-2.42v-.1a2.51 2.51 0 01-.84-2 3.18 3.18 0 011-2.25v-.1a4.25 4.25 0 01-1.23-3.11c0-2.89 1.82-4.35 3.81-4.35a3.6 3.6 0 011.42.29h3.37v2.59h-1.48a4 4 0 01.3 1.61c0 2.76-1.61 4-3.62 4a3.12 3.12 0 01-1.13-.23 1.17 1.17 0 00-.32.89c0 .59.37.88 1.38.88h1.49c2.26 0 3.52.9 3.52 3 0 2.5-2 4.31-5.16 4.31-2.11.03-3.82-.85-3.82-3.01zm6.4-.66c0-.76-.5-.93-1.41-.93h-1a3.73 3.73 0 01-1.3-.16 1.69 1.69 0 00-.49 1.18c0 .91.81 1.38 2 1.38s2.2-.65 2.2-1.47zm-1.08-9.35c0-1.28-.53-2-1.25-2s-1.26.67-1.26 2 .54 2 1.26 2 1.25-.69 1.25-2zM238.46 193.23v-7.46h2.73v7c0 1.73.35 2.27 1.14 2.27s1.11-.38 1.64-1.32v-7.95h2.73v12h-2.23l-.19-1.67h-.07a3.45 3.45 0 01-2.89 2c-2.01-.03-2.86-1.87-2.86-4.87zM248.29 196.39l1.23-2.21a3.53 3.53 0 002.37 1.26c.82 0 1.17-.41 1.17-1 0-.79-.92-1.15-1.86-1.63a3.85 3.85 0 01-2.44-3.53 3.44 3.44 0 013.52-3.76 4.56 4.56 0 013.24 1.52l-1.22 2.14a3 3 0 00-1.94-1c-.7 0-1.05.36-1.05 1 0 .77.86 1.06 1.82 1.51a3.73 3.73 0 012.48 3.62 3.59 3.59 0 01-3.78 3.87 5.21 5.21 0 01-3.54-1.79zM256.79 191.78c0-3.9 2.13-6.3 4.35-6.3 2.62 0 3.92 2.49 3.92 5.76a11 11 0 01-.11 1.58h-5.51c.24 1.74 1.16 2.54 2.39 2.54a3.25 3.25 0 002-.79l.9 2.15a5.1 5.1 0 01-3.27 1.35c-2.63 0-4.67-2.32-4.67-6.29zm5.94-1.32c0-1.32-.44-2.27-1.53-2.27-.86 0-1.61.76-1.79 2.27zM266.94 185.77h2.23l.19 2.1h.07c.67-1.6 1.68-2.39 2.62-2.39a2.09 2.09 0 011.1.24l-.46 3.07a3.06 3.06 0 00-1-.19c-.7 0-1.54.58-2 2.22v7h-2.73z"
            />
          </g>
          <g>
            <path
              className="LinuxTerminalSVG__cls-1"
              d="M76.58 221.79c0-3.89 2.13-6.29 4.34-6.29 2.63 0 3.93 2.48 3.93 5.76a9.31 9.31 0 01-.12 1.57h-5.51c.25 1.74 1.16 2.54 2.39 2.54a3.22 3.22 0 002-.78l.9 2.14a5.08 5.08 0 01-3.26 1.35c-2.64 0-4.67-2.31-4.67-6.29zm5.93-1.31c0-1.32-.44-2.27-1.53-2.27-.86 0-1.6.75-1.79 2.27zM88.32 221.54l-2.67-5.75h2.93l.82 1.94c.25.67.52 1.38.78 2h.07c.2-.66.44-1.37.63-2l.63-1.94h2.83L91.68 222l2.83 5.84h-2.93l-.9-2c-.29-.69-.57-1.41-.87-2.09h-.07c-.24.68-.48 1.38-.71 2.09l-.72 2h-2.83zM96 215.79h2.2l.19 1.18h.07a3.73 3.73 0 012.63-1.47c2.23 0 3.59 2.4 3.59 6.1 0 4.12-1.88 6.48-3.87 6.48a2.92 2.92 0 01-2.2-1.25l.09 1.9v3.52H96zm5.91 5.85c0-2.15-.51-3.23-1.6-3.23-.56 0-1 .32-1.58 1.07v4.93a1.93 1.93 0 001.47.76c.92 0 1.68-1.05 1.68-3.53zM106.08 221.79c0-3.89 2.13-6.29 4.34-6.29 2.63 0 3.93 2.48 3.93 5.76a9.31 9.31 0 01-.12 1.57h-5.51c.25 1.74 1.16 2.54 2.39 2.54a3.22 3.22 0 002-.78l.9 2.14a5.08 5.08 0 01-3.26 1.35c-2.64 0-4.67-2.31-4.67-6.29zm5.93-1.31c0-1.32-.44-2.27-1.53-2.27-.86 0-1.6.75-1.79 2.27zM116.22 215.79h2.23l.2 2.09h.06c.68-1.6 1.68-2.38 2.62-2.38a2 2 0 011.1.24l-.45 3.07a2.87 2.87 0 00-1-.2c-.69 0-1.53.59-2 2.22v7h-2.73zM123.41 212.17A1.6 1.6 0 11125 214a1.67 1.67 0 01-1.59-1.83zm.21 3.62h2.73v12h-2.73zM128.22 221.79c0-3.89 2.13-6.29 4.34-6.29 2.63 0 3.93 2.48 3.93 5.76a9.31 9.31 0 01-.12 1.57h-5.51c.25 1.74 1.16 2.54 2.39 2.54a3.2 3.2 0 002-.78l.91 2.14a5.12 5.12 0 01-3.27 1.35c-2.64 0-4.67-2.31-4.67-6.29zm5.94-1.31c0-1.32-.45-2.27-1.53-2.27-.87 0-1.61.75-1.8 2.27zM138.37 215.79h2.22l.2 1.52h.07a3.91 3.91 0 013-1.81c2 0 2.85 1.84 2.85 4.84v7.45H144v-7c0-1.72-.36-2.26-1.15-2.26s-1.1.41-1.71 1.16v8.1h-2.72zM148.46 221.79c0-4 2.25-6.29 4.8-6.29a3.52 3.52 0 012.69 1.29l-1.29 2.29a1.67 1.67 0 00-1.25-.71c-1.31 0-2.16 1.35-2.16 3.42s.88 3.42 2.07 3.42a2.49 2.49 0 001.66-.88l1.07 2.32a4 4 0 01-3 1.43c-2.61 0-4.59-2.3-4.59-6.29zM156.62 221.79c0-3.89 2.13-6.29 4.34-6.29 2.63 0 3.93 2.48 3.93 5.76a9.31 9.31 0 01-.12 1.57h-5.51c.25 1.74 1.16 2.54 2.39 2.54a3.22 3.22 0 002-.78l.9 2.14a5.08 5.08 0 01-3.26 1.35c-2.64 0-4.67-2.31-4.67-6.29zm5.93-1.31c0-1.32-.44-2.27-1.53-2.27-.86 0-1.6.75-1.79 2.27zM166 226.41l1.23-2.22a3.53 3.53 0 002.37 1.26c.82 0 1.17-.4 1.17-1 0-.79-.92-1.15-1.86-1.64a3.82 3.82 0 01-2.44-3.53 3.44 3.44 0 013.52-3.75 4.56 4.56 0 013.24 1.52l-1.23 2.1a3 3 0 00-1.94-1c-.7 0-1.05.36-1.05 1 0 .76.86 1.06 1.82 1.51a3.72 3.72 0 012.48 3.61 3.59 3.59 0 01-3.78 3.87 5.2 5.2 0 01-3.53-1.73zM178.28 224.46c0-2.53 1.54-3.9 5.19-4.4-.06-1.05-.46-1.73-1.46-1.73a4.36 4.36 0 00-2.44 1.08l-1-2.33a6.39 6.39 0 013.94-1.58c2.35 0 3.66 1.75 3.66 5.43v6.86H184l-.2-1.23h-.06a3.69 3.69 0 01-2.69 1.52c-1.71 0-2.77-1.59-2.77-3.62zm5.19-.16v-2.09c-1.94.34-2.58 1.06-2.58 2s.41 1.15 1.06 1.15 1.05-.43 1.52-1.06zM188.49 215.79h2.23l.2 1.52h.08a3.94 3.94 0 013-1.81c2 0 2.85 1.84 2.85 4.84v7.45h-2.73v-7c0-1.72-.35-2.26-1.14-2.26s-1.11.41-1.71 1.16v8.1h-2.73zM198.64 221.79c0-3.92 1.89-6.29 3.82-6.29a2.75 2.75 0 012.26 1.25l-.09-1.82v-4.09h2.73v16.95h-2.23l-.2-1.19h-.07a3.36 3.36 0 01-2.45 1.48c-2.29 0-3.77-2.37-3.77-6.29zm6 2.31v-4.93a2 2 0 00-1.53-.76c-.88 0-1.66 1.06-1.66 3.34s.63 3.42 1.68 3.42c.57 0 1.04-.29 1.5-1.07zM213.47 215.79h2.23l.2 1.54h.1a3.67 3.67 0 012.8-1.83 2.58 2.58 0 012.54 2c.81-1.1 1.68-2 2.89-2 2 0 2.88 1.84 2.88 4.84v7.45h-2.73v-7c0-1.72-.36-2.26-1.13-2.26-.47 0-1 .37-1.57 1.16v8.1h-2.73v-7c0-1.72-.36-2.26-1.14-2.26-.45 0-1 .37-1.57 1.16v8.1h-2.73zM229.3 223.24v-7.45h2.7v7c0 1.73.36 2.27 1.15 2.27s1.1-.37 1.64-1.32v-7.94h2.72v12h-2.22l-.2-1.66h-.07a3.44 3.44 0 01-2.89 2c-1.97-.06-2.83-1.9-2.83-4.9zM239.41 221.79c0-4 2.26-6.29 4.8-6.29a3.52 3.52 0 012.7 1.29l-1.29 2.29a1.67 1.67 0 00-1.25-.71c-1.32 0-2.16 1.35-2.16 3.42s.88 3.42 2.07 3.42a2.49 2.49 0 001.66-.88l1.07 2.32a4 4 0 01-3 1.43c-2.61 0-4.6-2.3-4.6-6.29zM248.63 210.84h2.73V215l-.12 2.17a3.85 3.85 0 012.84-1.65c2 0 2.86 1.84 2.86 4.84v7.45h-2.73v-7c0-1.72-.36-2.26-1.14-2.26s-1.11.41-1.71 1.16v8.1h-2.73zM263 215.79h2.22l.2 1.54h.07a3.63 3.63 0 012.79-1.83 2.57 2.57 0 012.54 2c.81-1.1 1.68-2 2.89-2 2 0 2.89 1.84 2.89 4.84v7.45h-2.73v-7c0-1.72-.37-2.26-1.14-2.26-.46 0-1 .37-1.57 1.16v8.1h-2.73v-7c0-1.72-.36-2.26-1.14-2.26-.45 0-1 .37-1.56 1.16v8.1H263zM278.34 221.79c0-4 2.16-6.29 4.49-6.29s4.48 2.3 4.48 6.29-2.15 6.29-4.48 6.29-4.49-2.3-4.49-6.29zm6.18 0c0-2.07-.56-3.42-1.69-3.42s-1.69 1.35-1.69 3.42.56 3.42 1.69 3.42 1.69-1.34 1.69-3.42zM289.18 215.79h2.23l.2 2.09h.06c.67-1.6 1.68-2.38 2.62-2.38a2 2 0 011.1.24l-.45 3.07a2.87 2.87 0 00-1-.2c-.69 0-1.54.59-2 2.22v7h-2.73zM295.86 221.79c0-3.89 2.13-6.29 4.34-6.29 2.63 0 3.93 2.48 3.93 5.76a9.31 9.31 0 01-.12 1.57h-5.51c.25 1.74 1.16 2.54 2.39 2.54a3.2 3.2 0 002-.78l.91 2.14a5.12 5.12 0 01-3.27 1.35c-2.64 0-4.67-2.31-4.67-6.29zm5.94-1.31c0-1.32-.44-2.27-1.53-2.27-.87 0-1.61.75-1.8 2.27z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
